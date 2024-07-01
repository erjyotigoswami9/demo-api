const mongoose = require("mongoose") ;
const UserModel = require("../model/user.model") ;
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken") ;
const dotenv = require("dotenv").config() ;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY ;
const blacklistArr = require("../blacklist/blacklist") ;

const login =  async(req,res)=>{
    try {
        let {email,password} = req.body ;
        let data = await UserModel.findOne({email}) ;
        if(data!=null){
        bcrypt.compare(password,data.password, (error,result)=>{
            if(error){
                console.log(error) ;
                res.status(400).send({error}) ;
            }else{
                if(result){
                    const token = jwt.sign({email:data.email, username:data.username, role:data.role}, JWT_SECRET_KEY,{expiresIn:'1hr'}) ;
                    const refresh_token = jwt.sign({email:data.email, username:data.username, role:data.role}, JWT_REFRESH_SECRET_KEY, {expiresIn:'1hr'}) ;
                    res.status(200).send({token,refresh_token}) ;
                }else{
                    res.status(200).send({"msg":"password not matched!"})
                }
            }
        })
        }else{
            res.status(200).send({"msg":"email not matched!"})
        }
    } catch (error) {
        console.log(error) ;
        res.status(400).send({error}) ;
    }
};

const register = async(req,res)=>{
    try {
        let userData = req.body ;
        console.log(userData) ;
        let checkData = await UserModel.findOne({email:userData.email}) ;
        if(checkData!=null && checkData.email){
            console.log(checkData) ;
            res.status(200).send({"msg":"user already exist in db"})
        }
        else{
        const pswrd = await bcrypt.hash(userData.password,3) ;  // pswrd , salt rounds
        let data = new UserModel({email: userData.email, username: userData.username , password : pswrd, role:userData.role}) ;
        data.save() ;
        res.status(200).send({"msg":"you have registered successfully"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(400).send({error}) ;
    }
};

const token = (req,res)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]  ;
        jwt.verify(token, JWT_REFRESH_SECRET_KEY, (error,decoded)=>{
            if(error){
                console.log(error) ;
                res.status(400).send({error}) ;
            }else{
                console.log(decoded) ;
                let access_token = jwt.sign({email:decoded.email, username: decoded.username, role:decoded.role}, JWT_SECRET_KEY, {expiresIn:'1hr'}) ;
                res.status(200).send({token:access_token}) ;
            }
        })
    } catch (error) {
        console.log(error) ;
        res.status(400).send({error}) ;
    }
};

const logout = (req,res)=>{
    let token = req.headers.authorization.split(" ")[1] ; // bearer token
    blacklistArr.push(token) ;
    res.status(200).send({"msg":"you have logged out"}) ;
} ;

const data = async(req,res)=>{
    try {
        let usersData = await UserModel.findOne({email:req.user.email}) ;
        res.status(200).send(usersData) ;
    } catch (error) {
        console.log(error) ;
        res.status(400).send({error}) ;
    }
};

const writing = async(req,res)=>{
    try {
        let usersData = await UserModel.find() ;
        res.status(200).send(usersData) ;
    } catch (error) {
        console.log(error) ;
        res.status(400).send({error}) ;
    }
};

module.exports = { login, register, data, logout, token, writing } ;