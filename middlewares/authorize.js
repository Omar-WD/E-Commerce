const authorize=(role)=>{
    return (req,res,next)=>{

        if(req.user.role == role){
            next()
        }else{
            res.status(401).send('Not authorized')
        }        
    }
}

module.exports={authorize}