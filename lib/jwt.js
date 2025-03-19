
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';  // Use a secure secret key

// Generate JWT token
export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role, email: user.email },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
