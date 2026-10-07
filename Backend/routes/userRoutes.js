import express, { Router } from "express";


import { loginUser, logoutUser, resisterUser, verification } from './../controllers/userController.js';
import { isAuthenticated  } from "../middleware/isAuthenticated .js";

const router=express.Router();

router.post('/resister',resisterUser)
router.post('/verify',verification)
router.post('/login',loginUser)
router.post('/logout',isAuthenticated,logoutUser)

export default router