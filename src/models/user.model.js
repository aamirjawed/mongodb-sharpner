import mongoose, {mongo, Schema} from "mongoose";
import { use } from "react";

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    }
}, {timestamps:true})

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next;
    this.password =  bcrypt.hash(this.password, 5)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


export const User = mongoose.model("User", userSchema)