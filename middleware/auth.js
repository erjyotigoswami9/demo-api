const jwt = require("jsonwebtoken") ;
const dotenv = require("dotenv").config() ;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ;
const blacklistArr = require("../blacklist/blacklist") ;
const UserModel = require("../model/user.model");

const auth = async (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]  ;
    if(blacklistArr.includes(token)){
        res.status(200).send({"msg":"pls login again"})
    }else
    jwt.verify(token,JWT_SECRET_KEY, async(err,decoded)=>{
        if(err){
            console.log(err) ;
            res.status(400).send({err}) ;
        }else{
            console.log(decoded) ;
            req.user = decoded ;
            const userData = await UserModel.findOne({email:decoded.email}) ;
            req.user.userId = userData._id ;
            console.log("userData",userData) ;
            next() ;
        }
    })
}

module.exports = auth ;