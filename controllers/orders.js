const Order = require('../models/orders');
const { Product, Cat1, Cat2, Cat3 } = require('../models/products'); // Ensure you have required Product and Category models

const createOrder = async (req, res) => {
    try {
        const items = req.body.order.items;
        const user = req.body.order.user;
        const address = req.body.order.address;
        const phone = req.body.order.phone;
        const email = req.body.order.email;
        const order = new Order({ items, user, address, phone, email });
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate({
            path: 'items.product',
            populate: [
                { path: 'category1', model: 'Cat1' },
                { path: 'category2', model: 'Cat2' },
                { path: 'category3', model: 'Cat3' }
            ]
        });
        
        res.send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getOrderByID = async (req, res) => {
    try {
        const orderID = req.params.id;
        const order = await Order.findById(orderID)
            .populate({
                path: 'items.product',
                populate: [
                    { path: 'category1', model: 'Cat1' },
                    { path: 'category2', model: 'Cat2' },
                    { path: 'category3', model: 'Cat3' }
                ]
            });
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.send(order);
    } catch (error) {
        res.status(500).send(error);
    }
}

const patchOrderStatus = async (req, res) => {
    try {
        const { status,orderID } = req.body;
        const order = await Order.findByIdAndUpdate(orderID, { status }, { new: true });
        if (!order) {
            return res.status(404).send({ error: 'Order not found' });
        }
        res.send(order);
    } catch (error) {
        console.error('patchOrderStatus -> error', error);
        res.status(400).send({ error: 'Failed to update order status' });
    }
}


module.exports = { createOrder, getOrders, getOrderByID,patchOrderStatus };
