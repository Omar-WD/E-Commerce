const { Product, Cat1, Cat2, Cat3 } = require("../models/products");
const fs = require("fs");

// Category and Product Handlers

const createCategory1 = async (req, res) => {
    console.log('req.body',req.body);
    try {
        const category1 = new Cat1(req.body);
        await category1.save();
        res.status(201).send(category1);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getCategory1 = async (req, res) => {
    try {
        const category1 = await Cat1.find();
        res.send(category1);
    } catch (error) {
        res.status(400).send(error);
    }
};

const createCategory2 = async (req, res) => {
    try {
        const category2 = new Cat2(req.body);
        await category2.save();
        res.status(201).send(category2);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getCategory2 = async (req, res) => {
    try {
        const category2 = await Cat2.find();
        res.send(category2);
    } catch (error) {
        res.status(400).send(error);
    }
};

const createCategory3 = async (req, res) => {
    try {
        const category3 = new Cat3(req.body);
        await category3.save();
        res.status(201).send(category3);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getCategory3 = async (req, res) => {
    try {
        const category3 = await Cat3.find();
        res.send(category3);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Product Handlers

const createProduct = async (req, res) => {
    const {
        category1,
        category2,
        category3,
        name,
        price,
        priceBeforeDisc,
        sizes,
        description,
    } = req.body;

    try {
        // Parse sizes if it's a JSON string
        let parsedSizes = sizes;
        if (typeof sizes === "string") {
            parsedSizes = JSON.parse(sizes);
        }

        // Create the product with parsed sizes and converted prices
        const product = new Product({
            category1,
            category2,
            category3,
            name,
            price: Number(price),
            priceBeforeDisc: Number(priceBeforeDisc),
            sizes: parsedSizes,
            img: req.file.secure_url,
            description,
        });

        await product.save();
        res.status(201).send(product);
        fs.unlinkSync(req.file.localPath);
    } catch (error) {
        res.status(400).send(error);
    }
};

const updateProduct = async (req, res) => {
    const {
        category1,
        category2,
        category3,
        name,
        price,
        priceBeforeDisc,
        sizes,
        description,
    } = req.body;
    console.log('req.body',req.body);

    try {
        // Parse sizes if it's a JSON string
        let parsedSizes = sizes;
        if (typeof sizes === "string") {
            parsedSizes = JSON.parse(sizes);
        }
        const updatedData = {
            category1: category1,
            category2: category2,
            category3: category3,
            name: name,
            price: Number(price),
            priceBeforeDisc: Number(priceBeforeDisc),
            sizes: parsedSizes,
            img: req.file.secure_url,
            description: description,
        };

        const productID = req.params.id;

        const product = await Product.findByIdAndUpdate(productID, updatedData, {
            new: true
        });

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.send(product);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category1")
            .populate("category2")
            .populate("category3");
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getProductByID = async (req, res) => {
    try {
        const productID = req.params.id;
        const product = await Product.findById(productID);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteproductByID = async (req, res) => {
    try {
        const productID = req.params.id;
        const product = await Product.findByIdAndUpdate(productID, { isDeleted: true });
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

const decrementProductSizeQty = async (req, res) => {
    console.log("Request Body:", req.body);
    const { items } = req.body;

    if (!Array.isArray(items)) {
        return res.status(400).send("Items must be an array");
    }

    try {
        for (const item of items) {
            if (!item.productId || !Array.isArray(item.sizes)) {
                return res.status(400).send("Invalid item structure");
            }

            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(400).send(`Product ${item.productId} not found`);
            }

            for (const sizeItem of item.sizes) {
                if (!sizeItem.size || typeof sizeItem.qty !== "number") {
                    return res.status(400).send("Invalid size item structure");
                }

                const size = product.sizes.find((s) => s.size === sizeItem.size);
                if (size) {
                    size.qty -= sizeItem.qty;
                } else {
                    return res.status(400).send(`Size ${sizeItem.size} not found in product ${item.productId}`);
                }
            }

            await product.save();
        }
        res.status(200).send("Product quantities decremented successfully");
    } catch (error) {
        console.error("Decrement Error:", error);
        res.status(500).send("Failed to decrement product quantities");
    }
};

const updateProductSizesQty = async (req, res) => {
    const { items } = req.body;
    console.log("Request Body:", req.body);

    if (!Array.isArray(items)) {
        return res.status(400).send("Items must be an array");
    }

    try {
        for (const item of items) {
            if (!item.productId || !Array.isArray(item.sizes)) {
                return res.status(400).send("Invalid item structure");
            }

            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(400).send(`Product ${item.productId} not found`);
            }

            for (const sizeItem of item.sizes) {
                if (!sizeItem.size || typeof sizeItem.qty !== "number") {
                    return res.status(400).send("Invalid size item structure");
                }

                const size = product.sizes.find((s) => s.size === sizeItem.size);
                if (size) {
                    size.qty += sizeItem.qty;
                } else {
                    product.sizes.push(sizeItem);
                }
            }

            await product.save();
        }
        res.status(200).send("Product quantities updated successfully");
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).send("Failed to update product quantities");
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductByID,
    deleteproductByID,
    createCategory3,
    getCategory3,
    createCategory2,
    getCategory2,
    createCategory1,
    getCategory1,
    updateProduct,
    decrementProductSizeQty,
    updateProductSizesQty
};
