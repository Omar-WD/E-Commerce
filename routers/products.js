const express = require('express');
const {createProduct, getProducts, getProductByID,deleteproductByID,createCategory1,getCategory1,createCategory2,getCategory2,createCategory3,getCategory3,updateProduct,decrementProductSizeQty,updateProductSizesQty} = require('../controllers/products');
const upload = require('../middlewares/multer_image_upload');
const {cloudinaryUpload}= require('../middlewares/cloudinary');
const {verifyToken} = require('../middlewares/verifyToken');
const {authorize} = require('../middlewares/authorize');


const productRouter = express.Router();

productRouter.post('/category1',verifyToken,authorize("admin"), createCategory1);
productRouter.get('/category1', getCategory1);
productRouter.post('/category2',verifyToken,authorize("admin"), createCategory2);
productRouter.get('/category2', getCategory2);
productRouter.post('/category3',verifyToken,authorize("admin"), createCategory3);
productRouter.get('/category3', getCategory3);
productRouter.post('/',verifyToken,authorize("admin"),upload.single('image'),cloudinaryUpload, createProduct);
productRouter.get('/', getProducts);
productRouter.get('/:id', getProductByID);
productRouter.delete('/:id',verifyToken,authorize("admin"),deleteproductByID);
productRouter.put('/decrement-product-size-qty',decrementProductSizeQty);
productRouter.put('/update-quantities',updateProductSizesQty);
productRouter.put('/:id',verifyToken,authorize("admin"),upload.single('image'),cloudinaryUpload,updateProduct);


module.exports = productRouter;