import express from "express";
import { userLogin, userSignup } from "../controllers/userControllers.js";

const router = express.Router();

// login
router.post('/login', userLogin);


// signup
router.post('/signup', userSignup);

console.log('user routes');

export default router;