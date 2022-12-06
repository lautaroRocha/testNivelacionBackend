const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },  
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    picture : {
        type : String,
        required : true
    },
    premium : {
        type : Boolean,
        required : false,
        default : false
    }
})

const User = mongoose.model('users', userSchema);

module.exports =  User;