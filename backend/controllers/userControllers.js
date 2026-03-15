// import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import * as argon2 from "argon2";
import poolQuery from '../db/connection.js';

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '2d' })
}

const hashPassword = async (password) => {
  try {
    // https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#argon2id
    const hash = await argon2.hash(password, { memoryCost: 19, timeCost: 2, parallelism: 1});
    return hash;
  } catch (err) {
    console.error('Error hashingpassword: ', err);
  }
}

const verifyPassword = async (storedHash, inputPassword) => {
  try {
    const isValid = await argon2.verify(storedHash, inputPassword);
    return isValid;
  } catch (err) {
    console.error('Error during password verify: ', err);
  }
}

// signup
export const userSignup = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // const user = await User.signup(email, password); // old, mongo
    const userExists = await poolQuery({
      text: 'SELECT 0 FROM account WHERE email = $1',
      values: [email]
    });

    console.log(userExists);

    if(userExists.data.rows.length > 0) {
      return res.status(409).json({ error: `User with email ${email} already exists`});
    }

    const hashword = await hashPassword(password);

    const newUser = await poolQuery({
      text: 'INSERT INTO account (email, password) VALUES ($1, $2) RETURNING account_id',
      values: [email, hashword]
    })

    console.log(newUser);
    console.log(newUser.data.rows[0].account_id);

    const token = createToken(newUser.data.rows[0].account_id);

    res.status(200).json({email, token});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
}


// login
export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({email, token});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
}