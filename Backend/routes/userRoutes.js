import express, { Router } from "express";


import { loginUser, resisterUser, verification } from './../controllers/userController.js';

const router=express.Router();

router.post('/resister',resisterUser)
router.post('/verify',verification)
router.post('/login',loginUser)

export default router