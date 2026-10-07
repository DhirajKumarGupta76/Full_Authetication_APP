import express, { Router } from "express";


import { forgotpassword, loginUser, logoutUser, resisterUser, verification, verifyOtp } from './../controllers/userController.js';
import { isAuthenticated  } from "../middleware/isAuthenticated .js";

const router=express.Router();

router.post('/resister',resisterUser)
router.post('/verify',verification)
router.post('/login',loginUser)
router.post('/logout',isAuthenticated,logoutUser)

router.post('/forgot-password',forgotpassword)
router.post('/verify-otp/:email',verifyOtp)

export default router