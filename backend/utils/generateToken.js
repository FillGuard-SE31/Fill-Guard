// backend/utils/generateToken.js
import jwt from 'jsonwebtoken';

/**
 * Generate and return a JWT token. You can optionally set it as a cookie if desired.
 * This function is typically used in userController to attach a token to a response.
 *
 * @param {string} userId - The MongoDB _id of the user
 * @returns {string} - The signed JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

export default generateToken;