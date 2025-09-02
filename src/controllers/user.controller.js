import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const {fullName, email, userName, password} =req.body

        if(!fullName || !email || !userName || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }

        const existedUser = await User.find({
            $or:[{userName}, {email}]
        })

        if(existedUser){
            return res.status(409).json({
                success: false,
                message: "Email or username already in use"
            });

        }

        const user = await User.create({
            fullName, 
            email, 
            password,
            userName:userName.toLowerCase()
        })

        const createdUser = await User.findById(user._id).select("-password")

        if(!createdUser){
            res.status(500).json({
                success:false,
                message:"Something went wrong while registering the user"
            })
        }

        return res.status(201).json({
            success:true,
            message:"User registered successfully",
            createdUser
        })
    } catch (error) {
        console.log("Error in register user in user controller ", error)
         res.status(500).json({
                success:false,
                message:"Something went wrong while registering the user"
            })
    }
}

export {
    registerUser
}