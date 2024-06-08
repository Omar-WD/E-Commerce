// require('dotenv').config();
// const cloudinary = require('cloudinary');

// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET
//   });

// const cloudinaryUpload =async (req,res,next) => {
//   try {
//     const {file}=req
//     const result = await cloudinary.v2.uploader.unsigned_upload(file.path,'blnhmrka');
//     result.localPath= file.path;
//     req.file=result;
//     next()
//   } catch (error) {
//     res.status(500).send(error)
//   }
// }

// module.exports={cloudinaryUpload}

require('dotenv').config();
const cloudinary= require ('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET

})

const cloudinaryUpload=async (req,res,next)=>{
  try {
    const {file}=req
    const result= await cloudinary.v2.uploader.unsigned_upload(file.path,'blnhmrka')
    req.file={...result,localPath:file.path}
    next()
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports={cloudinaryUpload}