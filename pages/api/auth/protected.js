// Example: http://localhost:3000/api/auth/protected
import { verifyToken } from '../../../lib/jwt';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>"

    if (!token) {
      return res.status(403).json({ error: 'No token provided' });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    // If token is valid, return protected data
    return res.status(200).json({ message: 'This is protected data', user: decoded });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
