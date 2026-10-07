import express, { Router } from "express";


import { resisterUser, verification } from './../controllers/userController.js';

const router=express.Router();

router.post('/resister',resisterUser)
router.post('/verify',verification)

export default router