const mongoose = require("mongoose") ;

const todoSchema = mongoose.Schema({
    title : {type:String, required:true},
    description : {type:String, required:true},
    status : {type:String, required:true},
    dueDate : {type:String, required:true} ,
    userId : {type: String, required:true},
    username : {type:String, required:true}
},{
    versionKey: false 
})

const TodoModel = mongoose.model("todos",todoSchema) ;  // collection-name and schema-name

module.exports = TodoModel ;