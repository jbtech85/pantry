// import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import * as argon2 from "argon2";
import poolQuery, { pgPool } from '../db/connection.js';

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
  const { email, password, createHousehold } = req.body;
  
  // transaction
  const client = await pgPool.connect();

  try {
    // const user = await User.signup(email, password); // old, mongo
    const userExists = await client.query({
      text: 'SELECT 0 FROM account WHERE email = $1',
      values: [email]
    });

    if(userExists.rows.length > 0) {
      return res.status(409).json({ error: `User with email ${email} already exists`});
    }

    const hashword = await hashPassword(password);

    // begin transaction
    await client.query('BEGIN');

    // create account
    const newUser = await client.query({
      text: 'INSERT INTO account (email, password) VALUES ($1, $2) RETURNING account_id',
      values: [email, hashword]
    });
    const userID = newUser.rows[0].account_id;
    

    if(createHousehold) {
      // create household
      const newHousehold = await client.query({
        text: 'INSERT INTO household (name, description) VALUES ($1, $2) RETURNING household_id',
        // TODO: add specific directions once Settings is built
        values: [`${email}'s household`, "This default household was created when you signed up.  You can change the name and description in Settings"]
      });
      const householdID = newHousehold.rows[0].household_id;

      // create account_household link
      await client.query({
        text: 'INSERT INTO account_household (account_fk, household_fk) VALUES ($1, $2)',
        values: [userID, householdID]
      });

      // update user with default
      await client.query({
        text: 'UPDATE account SET default_household_fk = $1 WHERE account_id = $2',
        values: [householdID, userID]
      });
    }

    // commit transaction
    await client.query('COMMIT');

    // signs in the user
    const token = createToken(userID);
    
    res.status(200).json({userID, email, token});
  } catch (err) {
    // if any errors, roll back all changes
    await client.query('ROLLBACK');
    res.status(400).json({error: err.message});
  } finally {
    client.release();
  }
}


// login
export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if(!email || !password) {
      throw Error('All fields must be completed');
    }

    const userInfo = await poolQuery({
      text: 'SELECT account_id, password, default_household_fk FROM account WHERE email = $1',
      values: [email]
    });

    const incorrectEmailPassword = "Email or password is incorrect";

    if(userInfo.data.rows.length > 0) {
      const verified = await verifyPassword(userInfo.data.rows[0].password, password);
      if(!verified) {
        throw Error(incorrectEmailPassword);
      }
    } else {
      throw Error (incorrectEmailPassword);
    }

    const token = createToken(userInfo.data.rows[0].account_id);
    const userID = userInfo.data.rows[0].account_id;
    const default_household_fk = userInfo.data.rows[0].default_household_fk;
    if(!default_household_fk) {
      default_household_fk = 1;
    }

    res.status(200).json({userID, email, default_household_fk, token});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
}