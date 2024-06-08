const mongoose = require('mongoose');

const category1Schema = new mongoose.Schema({
    value: {
        type: String,
        unique: true,
        default: 'No category1'
    }
});
const category2Schema = new mongoose.Schema({
    value: {
        type: String,
        unique: true,
        default: 'No category2'
    }
});
const category3Schema = new mongoose.Schema({
    value: {
        type: String,
        unique: true,
        default: 'No category3'
    }
});

const productSchema = new mongoose.Schema({
    category1: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Cat1',
        required: true
    },
    category2:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cat2',
        required: true
    },
    category3:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cat3',
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,  
        required: true
    },
    priceBeforeDisc: {
        type: Number,  
        required: false
    },
    sizes:[
        {
            size: {
                type: Number,
                required: true
            },
            qty: {
                type: Number,
                required: true,
                default: 3
            }
        }
    ],
    img: {
        type: String,
        required: false,
        default: 'https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-003.jpg'
    },
    description: {
        type: String,
        required: true,
        default: 'No description available'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
const Cat1 = mongoose.model('Cat1', category1Schema);
const Cat2 = mongoose.model('Cat2', category2Schema);
const Cat3 = mongoose.model('Cat3', category3Schema);

module.exports = { Product,Cat1,Cat2,Cat3};
