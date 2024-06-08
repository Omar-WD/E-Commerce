const express = require('express');
require('dotenv').config();
const cors=require('cors');
const cookieParser = require('cookie-parser');
const orderRouter=require('./routers/orders');
const productRouter=require('./routers/products');
const userRouter = require('./routers/users');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const port=process.env.PORT || 5000;
require('./db');

const app = express();


app.use(cors
    (
        {
            origin: 'http://localhost:5173',
            credentials: true,
        }
)
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/orders',orderRouter);
app.use('/api/products',productRouter);
app.use('/api/users',userRouter);


app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.post('/api/payment/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'eur',
        });
    res.send({
        clientSecret: paymentIntent.client_secret,
        });
    }
);


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    });