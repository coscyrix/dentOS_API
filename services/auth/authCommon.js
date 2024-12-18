import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

///////////////////////////////////////////////////////
export async function hashPassword(password) {
  const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
  if (isNaN(saltRounds)) {
    throw new Error('SALT_ROUNDS must be a number');
  }
  return await bcrypt.hash(password, saltRounds);
}

///////////////////////////////////////////////////////

export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

///////////////////////////////////////////////////////

export async function generatePassword() {
  const length = 12;

  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let retVal = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
