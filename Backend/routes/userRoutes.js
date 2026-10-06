import express, { Router } from "express";


import { resisterUser } from './../controllers/userController.js';

const router=express.Router();

router.post('/resister',resisterUser)

export default router