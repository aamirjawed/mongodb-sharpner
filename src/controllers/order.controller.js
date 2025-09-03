import Cart from "../models/cart.model";
import Order from "../models/order.model";

export const orderPlaced = async(req, res) => {
    try {
        const {userId} = req.params;


        if(!userId){
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        const cartItem = await Cart.find({userId}).populate("productId");


        if(cartItem.length === 0){
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        let totalAmount = 0;
        const items = cartItem.map(item => {
            totalAmount += item.productId.price*item.quantity;
            return {
                productId:item.productId._id,
                quantity:item.quantity
            }
            
        })

        const order = new Order({
            userId,
            items,
            totalAmount
        })

        await order.save()

        await Cart.deleteMany({userId})

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        console.log("Error in place order controller", error);
        res.status(500).json({
            success: false,
            message: "Error placing order",
            error: error.message
        });
    }
}


export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId }).populate("items.productId");

        res.json({
            success: true,
            orders
        });
    } catch (error) {
        console.log("Error in getUserOrders", error);
        res.status(500).json({
            success: false,
            message: "Error fetching user orders",
        });
    }
};