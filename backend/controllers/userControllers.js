import pantryDB from '../db/connection.js';
import User from '../models/userModel.js';

// login
export const userLogin = async (req, res) => {
  res.json({message: 'user loginsss'});
  console.log('userLogin controller');
}

// signup
export const userSignup = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.signup(email, password);
    res.status(200).json({email, user});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
}