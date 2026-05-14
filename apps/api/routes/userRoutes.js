import express from "express";
import { userLogin, userSignup } from "../controllers/userControllers.js";

const router = express.Router();

// signup
router.post('/signup', userSignup);

// login
router.post('/login', userLogin);


export default router;