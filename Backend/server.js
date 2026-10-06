import express from 'express';
import 'dotenv/config'
import connectDb from './Database/db.js';
import dns from "dns"
dns.setServers(["1.1.1.1","8.8.8.8"])
import userRoute from './routes/userRoutes.js';

const app=express()

app.use(express.json())
app.use('/user',userRoute)
// htttp://localhost:8000/user/resister


//create server
const port=process.env.port ||3000
app.listen(port,()=>{
    connectDb()
    
    console.log(`server is listening on a port ${port}`)
})


