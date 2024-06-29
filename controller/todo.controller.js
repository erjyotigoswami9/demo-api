const TodoModel = require("../model/todo.model");
const UserModel = require("../model/user.model");

const createTodo = async(req,res)=>{   //  only writer can create the todo
    try {
        let {title, description, dueDate, status} = req.body ;
        let dataUser = await UserModel.findOne({email:req.user.email}) ;
        let userId = dataUser._id ;
        let username = req.user.username ;
        let dataTodo = new TodoModel({title,description,status, dueDate,userId,username}) ;
        dataTodo.save() ;
        res.status(200).send(dataTodo) ;
    } catch (error) {
        console.log(error) ;
        res.status(400).send({error}) ;
    }
} ;

const deleteTodo =  async(req,res)=>{  // only writer can delete the todo
    try {
        const todoId = req.params.id ;
        console.log(todoId) ;
        let todoDetails = await TodoModel.findOne({_id:todoId}) ;
        let userId = req.user.userId ;
        if(todoDetails){
        if(todoDetails.userId==userId){
        let data = await TodoModel.findByIdAndDelete({_id:todoId}) ;
        res.status(200).send(data) ;
        }else{
            res.status(200).send({msg:"user not matched with the todo creator id"}) ;
        }
        }else{
            res.status(200).send({msg:"data not found"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(400).send({error}) ;
    }
} ;

const updateTodo = async(req,res)=>{
    try {
        const todoId = req.params.id ;
        console.log(todoId) ;
        let updatedData = req.body ;
        let userId = req.user.userId ;
        console.log("userId",userId) ;
        let todoDetails = await TodoModel.findOne({_id:todoId}) ;
        console.log(todoDetails) ;
        if(todoDetails){
        if(userId==todoDetails.userId){
        let data = await TodoModel.findByIdAndUpdate({_id:todoId},{...updatedData}) ;
        res.status(200).send(data) ;
        }else{
            res.status(200).send({msg:"userId not matched with todo creator id"}) ;
        }
        }else{
            res.status(200).send({msg:"todo not exist in db"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(400).send({error}) ;
    }
} ;

const allTodo = async(req,res)=>{  // reader and writer both can read the data 
    try {
        let no = req.query.limit ;
        console.log("limit",no) ;
        let pageno = req.query.page ;
        console.log("page",pageno) ;
        let data = [] ;
        if(no && pageno){
          data = await TodoModel.find().skip(pageno-1).limit(no) ;
        }else{
            if(no){
                data = await TodoModel.find().limit(no) ;
            }else{
                if(pageno){
                    no = 3 ; // i take default as 3 documents per page 
                    data = await TodoModel.find().skip(pageno-1).limit(5) ;
                }else{
                    data = await TodoModel.find();
                }
            }
        }
      console.log(data) ;
          res.status(200).send(data) ;
      
    } catch (error) {
      console.log(error) ;
      res.status(400).send({error}) ;
    }
} ;

const singleTodo = async(req,res)=>{
    try {
        let todoId = req.params.id ;
        let userId = req.user.userId ;
        let todoDetails = await TodoModel.findOne({userId}) ;
        if(todoDetails){
        if(userId==todoDetails.userId){
            res.status(200).send(todoDetails) ;
        }
        else{
            res.status(200).send({msg:"userId not matched with todo's creator userId"}) ;
        }
        }else{
            res.status(200).send({msg:"no data available for this user's todo"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(400).send({error}) ;
    }
} ;

module.exports = {createTodo, deleteTodo, updateTodo, allTodo, singleTodo }