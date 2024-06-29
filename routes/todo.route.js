const express = require("express") ;
const auth = require("../middleware/auth");
const { roleMiddleWare_reader, roleMiddleWare_writer } = require("../middleware/role.middleware");
const {createTodo, deleteTodo, updateTodo, allTodo, singleTodo} = require("../controller/todo.controller") ;


const todoRouter = express.Router() ;

todoRouter.get('/data', [auth,roleMiddleWare_reader] , allTodo)

todoRouter.get("/singleData/", [auth,roleMiddleWare_writer], singleTodo) ;

todoRouter.post("/create",[auth, roleMiddleWare_writer], createTodo) ;

todoRouter.delete("/delete/:id",[auth,roleMiddleWare_writer], deleteTodo) ;

todoRouter.patch("/update/:id",[auth,roleMiddleWare_writer], updateTodo) ;

module.exports = todoRouter