import mongoose from "mongoose";
import validator from 'validator';
import argon2 from 'argon2';


const Schema = mongoose.Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const hashPassword = async (password) => { 
  try {
    // https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#argon2id
    const hash = await argon2.hash(password, { memoryCost: 19, timeCost: 2, parallelism: 1 });
    return hash;
  } catch (err) {
    console.log('Error hashing password:', err);
  }
}

const verifyPassword = async (hashword, password) => {  
  try {
    const match = await argon2.verify(hashword, password);
    return match;
  } catch (err) {
    return false;
  }
}

// le static signup method
userSchema.statics.signup = async function(email, password) {
  // validation
  if(!email || !password) {
    throw Error('All fields must be completed');
  }
  if(!validator.isEmail(email)) {
    throw Error('Invalid email');
  }
  // if(!validator.isStrongPassword(password)) {
  //   throw Error('Your password is weak, try again');
  // }

  const exists = await this.findOne({ email });
  if(exists) {
    throw Error('Email already in use');
  }

  const hash = await hashPassword(password);

  const user = await this.create({ email, password: hash });
  return user;
}

// static login method
userSchema.statics.login = async function (email, password) {
  if(!email || !password) {
    throw Error('All fields must be completed');
  }

  const user = await this.findOne({ email });
  if(user) {
    const verified = await verifyPassword(user.password,password);
    if(!verified) {
      throw Error('Email or password is incorrect');
    }
  } else {
    throw Error('Email or password is incorrect');
  }

  return user;
}


export default mongoose.model('User', userSchema);