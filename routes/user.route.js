const express = require("express") ;
const auth = require("../middleware/auth") ;
const {login, register, data, logout, token , writing } = require("../controller/user.controller") ;
const userRouter = express.Router() ;
const {roleMiddleWare_reader, roleMiddleWare_writer} = require("../middleware/role.middleware") ;

userRouter.get('/data', [auth,roleMiddleWare_reader] , data) ;

userRouter.get('/writer', [auth,roleMiddleWare_writer], writing) ;

userRouter.post('/register', register)

userRouter.post("/login",login)

userRouter.get('/logout', logout)

userRouter.get("/token", token)

module.exports = userRouter ;