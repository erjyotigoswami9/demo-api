const express = require("express") ;
const mongoose = require("mongoose") ;
const UserModel = require("../model/user.model") ;

const userRouter = express.Router() ;

userRouter.get('/data', async(req,res)=>{
    try {
        let usersData = await UserModel.find() ;
        res.status(200).send(usersData) ;
    } catch (error) {
        console.log(error) ;
        res.status(400).send({error}) ;
    }
})

userRouter.post('/register', async(req,res)=>{
    try {
        let userData = req.body ;
        console.log(userData) ;
        let data = new UserModel(userData) ;
        data.save() ;
        res.status(200).send(data) ;
    } catch (error) {
        console.log(error) ;
        res.status(400).send({error}) ;
    }
})

module.exports = userRouter ;