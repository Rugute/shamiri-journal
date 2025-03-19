// This file is used to register a new user
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          role,
        },
      });

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
