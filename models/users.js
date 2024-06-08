const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    username:{type:String, unique:true, required:true}, 
    name:{type:String, required:true, default:'user'},
    password:{type:String, required:true, select:false},
    role:{type:String, default:'admin',enum:['user','admin']}
})

const User=mongoose.model('User',userSchema)

module.exports=User