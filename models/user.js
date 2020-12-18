const mongoose=require('mongoose');

//User Schema
 const userSchema= mongoose.Schema({
     name:{
         type: String,
         required: true
     },
     email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    displaypic:{
        type: String
    },
    aboutme:{
        type:  String
    },
    interest:{
        type: String
    },
    friendlist:[{type: String}]
 });

 const User = module.exports = mongoose.model('User', userSchema);