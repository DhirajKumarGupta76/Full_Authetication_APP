//User Stored In DataBase;
import { verifyMail } from "../emailVerify/verifyMail.js";
import { User } from "../Models/userModel.js";
import bcrypt from "bcryptjs" //to hashed password
import jwt from 'jsonwebtoken'  //to creaate a token
// import sign from './../node_modules/nodemailer/dist/esm/dkim/sign';


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


