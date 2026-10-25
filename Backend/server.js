

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
// used to connect frontend to backend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://full-authetication-app-frontend.onrender.com",
    ].filter(Boolean),
    credentials: true,
  })
);
// Middleware -> prepare your backend to read incoming request data and handle authentication.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport ->  login with google handle -> redirect to google page 
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
