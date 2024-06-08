const {createOrder,getOrders,getOrderByID,patchOrderStatus} = require('../controllers/orders');

const express = require('express');

const orderRouter=express.Router();

orderRouter.post('/',createOrder);
orderRouter.get('/',getOrders);
orderRouter.patch('/',patchOrderStatus);
orderRouter.get('/:id',getOrderByID);



module.exports=orderRouter;