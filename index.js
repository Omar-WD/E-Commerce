const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const orderRouter = require("./routers/orders");
const productRouter = require("./routers/products");
const userRouter = require("./routers/users");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;
const path = require("path");
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => console.log('DB Connected'))
.catch(err => console.error("Error connecting to MongoDB", err));

const app = express();

// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(__dirname, "client", "dist")));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://e-commerce-y3r0.onrender.com"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/payment/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "eur",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Serve your React or frontend application
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
