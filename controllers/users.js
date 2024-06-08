require('dotenv').config();
const User= require('../models/users')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const { ErrorResponse } = require('../utils/ErrorResponse');


const signUp=async (req,res)=>{
    try {
        const {username,name,password,role}=req.body
        const hashedPassword= await bcrypt.hash(password, 8)
        const user= await User.create({username,name:name?name:"user",password:hashedPassword,role:role?role:'user'})
        const payload ={username:user.username,name:user.name, id:user._id,role:user.role}
        const token= jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,  { expiresIn: "500m" })
        res.cookie('accessToken', token, { maxage: 500 * 6000,httpOnly: true }).json(payload)
        
    } catch (error) {
        res.status(400).send(error)  
    }
}

const signIn = async (req, res,next) => {
    try {
        const {username,password}=req.body
        const user= await User.findOne({username}).select('+password')
        if(!user){
            throw new ErrorResponse('Invalid username', 404)
        }
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            throw new ErrorResponse('Invalid password', 404)
        }
        const payload ={username:user.username, id:user._id,role:user.role, name:user.name}
        const token= jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '500m'})
            res.cookie('accessToken', token, { maxAge: 500 * 6000, httpOnly: true}).json(payload);
    } catch (error) {
        res .status(400 ).send(error )
        console.log('sign in error',error);
    }
};

const signOut=async (req,res)=>{
   try {
    res.clearCookie('accessToken')
    res.status(200).send('User signed out')
    console.log('User signed out');
   } catch (error) {
         res.status(400 ).send(error)
         console.log('sign out error',error)
    
   }
}

const profile=async (req,res)=>{

    try {
        const {id}=req.user
        const user= await User.findById(id)
        if(!user){
            res.status(404).send('User not found')
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(400).send(error)
        console.log('profile error',error);
    }
}







module.exports={signUp,signIn,signOut,profile};

