import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export async function authenticate(req, res, next) {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(' ')[1];

    // Check if the token is a Google token
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      // Google token is valid
      req.decoded = payload;
      return next();
    } catch (googleError) {
      // If Google token verification fails, try verifying as JWT
      jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (error, decodedToken) => {
        if (error) {
          return res.status(403).json({
            status: 'Failed',
            msg_id: 'auth',
            message: 'Authentication failed!',
          });
        } else {
          req.decoded = decodedToken;
          next();
        }
      });
    }
  } else {
    return res.status(403).json('Please Provide a token!');
  }
}

export function generateAccessToken(user) {
  if (!user) throw new Error('Invalid user for token generation');

  console.log(user);

  const payload = {
    username: user.email,
    isAdmin: true, // Ensure isAdmin value is accurately sourced
  };
  const secret = process.env.JWT_ACCESS_TOKEN;
  const expiresIn = '1h';
  const token = jwt.sign(payload, secret, { expiresIn });

  return token;
}
