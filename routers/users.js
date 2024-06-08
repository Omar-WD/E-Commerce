const {  signUp,signIn,signOut,profile} = require('../controllers/users');
const {verifyToken} = require('../middlewares/verifyToken');
const {authorize} = require('../middlewares/authorize');
const express = require('express');


const userRouter = express.Router();
userRouter.post('/signin', signIn);
userRouter.post('/signout', signOut);
userRouter.get('/profile',verifyToken,authorize("admin") , profile);
userRouter.post('/signup',verifyToken,authorize("admin") , signUp);



module.exports = userRouter;