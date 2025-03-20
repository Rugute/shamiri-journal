// This file is responsible for authenticating a user
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../lib/jwt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      // Find user by username
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = generateToken(user);
      console.log(token);

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
