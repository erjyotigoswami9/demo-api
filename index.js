
const express = require("express") ;
const dotenv = require("dotenv").config() ;
const connection = require("./config/db") ;
const cors = require("cors") ;

const server = express()  ;
const userRouter = require("./routes/user.route") ;
const todoRouter = require("./routes/todo.route") ;

server.use(express.json())  ;
server.use(cors({
    origin : "http://127.0.0.1:5173/"
})) ;
server.use("/user",userRouter) ;
server.use("/todo",todoRouter) ;

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