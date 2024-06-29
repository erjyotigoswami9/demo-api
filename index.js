
const express = require("express") ;
const dotenv = require("dotenv").config() ;
const connection = require("./config/db") ;

const server = express()  ;
const userRouter = require("./routes/user.route") ;

server.use(express.json())  ;
server.use("/user",userRouter) ;

server.get('/', (req,res)=>{
    try {
        res.send("health checkup is fine") ;
    } catch (error) {
        console.log(error) ;
        res.send({error}) ;
    }
})

const PORT = process.env.PORT || 3000 ;

server.listen(PORT, async()=>{
    try {
        await connection ;
        console.log(`server is running at port no ${PORT} and db is also connected`) ;
    } catch (error) {
        console.log(error) ;
    }
})