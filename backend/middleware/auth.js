import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../Config/config.js';

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers; 

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not Authorized, please log in again',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id; 
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(400).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

export default authMiddleware;
