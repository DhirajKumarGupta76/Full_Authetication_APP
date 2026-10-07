import express, { Router } from "express";


import { changePassword, forgotpassword, loginUser, logoutUser, resisterUser, verification, verifyOtp } from './../controllers/userController.js';
import { isAuthenticated } from "../middleware/isAuthenticated .js";
import { userSchema, validateUser } from "../validators/userValidate.js";

const router = express.Router();

router.post('/resister',validateUser(userSchema), resisterUser)
router.post('/verify', verification)
router.post('/login', loginUser)
router.post('/logout', isAuthenticated, logoutUser)

router.post('/forgot-password', forgotpassword)
router.post('/verify-otp/:email', verifyOtp)
router.post('/change-password/:email', changePassword)

export default router