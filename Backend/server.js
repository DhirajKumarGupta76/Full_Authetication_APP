import express from 'express';
import 'dotenv/config'
import passport from "passport";
import "./config/passport.js";
import connectDb from './Database/db.js';
import dns from "dns"
dns.setServers(["1.1.1.1","8.8.8.8"])
import userRoute from './routes/userRoutes.js';
import authRoutes from "./routes/authRoutes.js"
import cors from "cors"


const app=express()
app.use(cors({
    origin:`${process.env.FRONTEND_URL}`,
    Credential:true

}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// Initialize Passport
app.use(passport.initialize());
app.use("/auth",authRoutes)
app.use('/user',userRoute)

// htttp://localhost:8000/user/resister
// `${process.env.}`
// 


//create server
const port=process.env.port ||3000
app.listen(port,()=>{
    connectDb()
    
    console.log(`server is listening on a port ${port}`)
})


