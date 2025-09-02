import Cart from "../models/cart.model";

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "userId and productId are required"
            });
        }

        const cartItem = new Cart({
            userId,
            productId,
            quantity
        });
        await cartItem.save();

        res.status(201).json({
            success: true,
            message: "Product added to cart",
            cartItem
        });
    } catch (error) {
        console.log("Error in add to cart in cart controller", error)
        res.status(500).json({
            success: false,
            message: "Error adding to cart",
            error: error.message
        });

    }
}


export const deleteFromCart = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteItem = await Cart.findByIdAndDelete(id)

        if (!deleteItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });

        }

        res.json({
            success: true,
            message: "Product removed from cart"
        });

    } catch (error) {
        console.log("Error in delete from cart in cart controller", error)
        res.status(500).json({
            success: false,
            message: "Error deleting from cart",
        });

    }
}