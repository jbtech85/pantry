import { Schema } from "mongoose";
import * as argon2 from "argon2";

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

// le static signup method
userSchema.statics.signup = async function(email, password) {
  const exists = await this.findOne({ email });

  if(exists) {
    throw Error('Email already in use');
  }

  const hash = await hashPassword(password);

  const user = await this.create({ email, password: hash });

  return user;
}

export default mongoose.model('Item', itemSchema);