import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
    try {
        const { productName, price, description, stock } = req.body

        if (!productName || !price) {
            return res.status(400).json({
                success: false,
                message: "Product name and price are required"
            });
        }

        const product = new Product({
            productName,
            price, description,
            stock
        });
        await product.save();

        res.status(201).json({ 
            success: true, 
            message: "Product added successfully", 
            product 
        });
    } catch (error) {
        console.log("Error in add product in product controller")
         res.status(500).json({ 
            success: false, 
            message: "Error adding product", 
            error: error.message 
        });
    }
}