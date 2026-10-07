//User Stored In DataBase;
import e from "express";
import { verifyMail } from "../emailVerify/verifyMail.js";
import { Session } from "../Models/sessionModel.js";
import { User } from "../Models/userModel.js";
import bcrypt, { truncates } from "bcryptjs" //to hashed password
import jwt from 'jsonwebtoken'  //to creaate a token
import { sendOtpMail } from "../emailVerify/sendOtpMail.js";

//create resisterUser
export const resisterUser=async(req,res)=>{
    try {
//req.body ->detailed information by user input;
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
        //Secure Password: "password": "$2b$10$/ILtmZbjRcuXVM62SoagDOff8o5sE67qo9GMVjKYN1gOPdo45l3GW",
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=await User.create({
            username,
            email,
            password:hashedPassword
        })
        //create token using JWT
        const token=jwt.sign({id:newUser._id},process.env.SECRET_KEY,{expiresIn:"10m"})

        verifyMail(token,email)
        newUser.token=token
        await newUser.save()

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

// connect email Verivication through email
export const verification=async(req,res)=>{
    try {
        //Get Authorization header from the request
        const authHeader=req.headers.authorization;
         //Check whether Authorization header exists
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success:false,
                message:"Authorization token is missing or invalid"
            })
        }
        //Extract JWT token from "Bearer <token>"
        const token=authHeader.split(" ")[1]
        let decoded;
        // Verify JWT token
        try {
            decoded=jwt.verify(token,process.env.SECRET_KEY)
        } catch (error) {
            if(error.name=="TokenExpiredError"){
                return res.status(400).json({
                    success:false,
                    message:"The registration token had been expired"

                })
            }
            //Handle any other invalid JWT error
            return res.status(400).json({
                success:false,
                message:"Token Verifiacation token is failed"
            })
        }
        // Find user using ID from decoded JWT
        const user=await User.findById(decoded.id)
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        user.token=null
        user.isverified=true
        await user.save()
        return res.status(200).json({
            success:true,
            message:"Email is Verified Successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
//loginUser
export const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All field are required"
            })
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Unorthorised access"
            })

        }
        const passwordCheck=await bcrypt.compare(password,user.password)
        if(!passwordCheck){
            return res.status(402).json({
                success:false,
                message:"Incorrect Password"
            })
        }

        if(user.isverified!==true){
            return res.status(403).json({
                success:false,
                message:'verify Your account than login'
            })
        }
        //check for existing session and delete it
        const existingSession=await Session.findOne({userId:user._id})
        if(existingSession){
            await Session.deleteOne({userId:user._id})
        }
        //create a new session
        await Session.create({userId:user._id})
        //genrates token
        const accessToken=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"10m"})
        const refressToken=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"10d"})
        user.isLoggedIn=true;
        await user.save()
        return res.status(200).json({
            success:true,
            message:`Welcome back ${user.username}`,
            accessToken,
            refressToken,
            user

        })
    } catch (error) {
        return res.status(500).json({
            success:"false",
            message:"error.message"
        })
        
    }
}

//Logout User
export const logoutUser=async(req,res)=>{
   try {
    const userId=req.userId;
    await Session.deleteMany({userId});
    await User.findByIdAndUpdate(userId,{isLoggedIn:false})
    return res.status(200).json({
        success:true,
        message:"LogOut Successsfull"
    })
    
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:"error.messaage"
    })
    
   } 
}

//Forgate password
export const forgotpassword=async(req,res)=>{
    try {
        const {email}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({
               success:false,
               message:"User does not found"

            })
        }
        const otp=Math.floor(100000 +Math.random()* 900000).toString();
        const exipry=new Date(Data.now()+10*60*1000)
        user.otp=otp;
        user.expiry=expiry;
        await user.save();
        await sendOtpMail(email,otp);
        return res.status(200).json({
            success:true,
            message:"Otp sent Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            sucess:false,
            message:error.message

        })
        
    }
}

//verify otp
export const verifyOtp=async(req,res)=>{
    const {otp}=req.body;
    const email=req.params.email
    if(!otp){
        return res.status(400).json({
            success:false,
            message:"Otp is required"
        })
    }
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        if(!user.oto || !user.otpExpiry){
            return res.status(400).json({
                success:false,
                message:"Otp not generated or already verified"
            })
        }
        if(user.otpExpiry<new Date()){
            return res.status(400).json({
                success:false,
                message:"Otp has Expired.Please request a new one "
            })
        }
        if(otp!==user.otp){
            return res.status(400).json({
                success:false,
                message:"Invalid Otp"
            })
        }
        user.otp=null
        user.otpExpiry=null
        await user.save()
        return res.status(200).json({
            success:true,
            message:"Otp verified successfully "
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Inetrnal server error"
        })
        
    }
}

// Change Password
export const changePassword=async(req,res)=>{
    const {newPassword, confirmPassword}=req.body;
    const email=req.params.email
    if(!newPassword || !confirmPassword){
        return res.status(400).json({
            success:false,
            message:"All field are required"
        })
    }
    if(newPassword!==confirmPassword){
        return res.status(404).json({
            success:false,
            message:"Password doen not matched"
        })
    }
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User does not matched"
            })
        }
        const hashedPassword=await bcrypt.hash(newPassword,10)
        user.password=hashedPassword
        await user.save();
        return res.status(200).json({
            success:true,
            message:"Password Changed Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Error"
        })
        
    }

}