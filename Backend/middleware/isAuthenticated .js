
import jwt, { decode } from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { User } from "../Models/userModel.js";

export const isAuthenticated =async(req,res,next)=>{
    try {
        // Get Authorization header
        // Example: "Bearer eyJhbGciOiJIUzI1Ni..."
        const authHeader=req.headers.authorization;
         // Check if Authorization header exists
        // and starts with "Bearer"

        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({
                success:false,
                message:"Acess token is missing or invalid"
            })
        }

        const token=authHeader.split(" ")[1]
        jwt.verify(token,process.env.SECRET_KEY,async(err,decoded)=>{
            if(err){
               if(err.name==="TokenExpiredError"){
                return res.status(400).json({
                    suceess:false,
                    message:"Access Token has Expired,Use refress token to genrate again"
                })
               } 
               return res.status(400).json({
                suceess:false,
                message:"Acess token is misssing or invalid"
               })
            }
            const {id}=decoded;
            const user =await User.findById(id)
            if(!user){
                return res.status(404).json({
                    success:false,
                    message:"user not found"
                })
            }
             // Store authenticated user's ID
            // so controllers can use req.userId
            req.userId=user._id
              // Continue to next controller
            next()

        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
            
        })
    }

}