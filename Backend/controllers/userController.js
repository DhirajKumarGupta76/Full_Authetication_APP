//User Stored In DataBase;
import { User } from "../Models/userModel.js";
export const resisterUser=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                success:false,
                massage:"All field are required"
            })
        }
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                massage:"User already exist"
            })
        }
        const newUser=await User.create({
            username,
            email,
            password
        })
        return res.status(201).json({
            success:true,
            massage:"User registered successfully",
            data:newUser
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            massage:error.massage
        })
        
    }
}