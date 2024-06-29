const mongoose = require("mongoose") ;

const userSchema = mongoose.Schema({
    username : {type:String, required: true},
    email : {type:String, required:true},
    password : {type:String, required:true}
},{
    versionKey: false
})

const UserModel = mongoose.model("users",userSchema);  // collection-name and then schema name

module.exports = UserModel ;