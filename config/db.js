const dotenv = require("dotenv").config() ;
const mongoose = require("mongoose") ;

const MONGO_URL = process.env.MONGO_URL ;
const connection = mongoose.connect(`${MONGO_URL}/kanbanDB`) ;

module.exports = connection ;


//  https://demobackendapi.onrender.com