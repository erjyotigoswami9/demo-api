const dotenv = require("dotenv").config() ;
const mongoose = require("mongoose") ;

const MONGO_URL = process.env.MONGO_URL ;
// let url = `mongodb+srv://erjyotigoswami9:jyoti123@kanbanapp2.a97rp4t.mongodb.net/?retryWrites=true&w=majority&appName=kanbanApp2`
const connection = mongoose.connect(`${MONGO_URL}/kanbanDB`) ;

module.exports = connection ;