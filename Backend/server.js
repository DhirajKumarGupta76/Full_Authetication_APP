// import express from 'express';
// import 'dotenv/config'
// import passport from "passport";
// import "./config/passport.js";
// import connectDb from './Database/db.js';
// import dns from "dns"
// dns.setServers(["1.1.1.1","8.8.8.8"])
// import userRoute from './routes/userRoutes.js';
// import authRoutes from "./routes/authRoutes.js"
// import cors from "cors"


// const app=express()
// app.use(cors({
//     origin:`${process.env.FRONTEND_URL}`,
//     Credential:true

// }))

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));
// // Initialize Passport
// app.use(passport.initialize());
// app.use("/auth",authRoutes)
// app.use('/user',userRoute)

// // htttp://localhost:8000/user/resister
// // `${process.env.}`
// // 


// //create server
// const port=process.env.port ||3000
// app.listen(port,()=>{
//     connectDb()
    
//     console.log(`server is listening on a port ${port}`)
// })



import express from "express";
import "dotenv/config";
import passport from "passport";
import "./config/passport.js";
import connectDb from "./Database/db.js";
import dns from "node:dns";
import userRoute from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

// DNS configuration
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

// Frontend URL configured in Render backend Environment Variables
const frontendUrl = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://full-authetication-app-frontend.onrender.com",
    ].filter(Boolean),
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport
app.use(passport.initialize());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoute);

// Health-check route
app.get("/", (req, res) => {
  res.status(200).send("Authentication Backend is running!");
});

// Start server after database connection
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
