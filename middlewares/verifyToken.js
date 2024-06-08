require('dotenv').config();
const jwt = require('jsonwebtoken');


const verifyToken=async(req,res,next)=>{
    try {
        const token= req.cookies.accessToken
        if(token){
        const payload= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        req.user=payload
        return next()
        }
        res.status(401).send('Not authorized')
    } catch (error) {
        res.status(400).send('Invalid token')
        
    }
}

module.exports = {verifyToken};