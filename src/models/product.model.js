import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    productName:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String
    },
    stock:{
        type:Number,
        required:true
    }
})

const Product = mongoose.model("Product", productSchema)

export default Product