// This file is used to register a new user
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, fullname,email, password, role } = req.body;

    if (!username || !fullname || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Check if the username already exists
      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUsername) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Check if the email already exists
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Create a new user
      await prisma.user.create({
        data: {
          fullname,
          email,
          username,
          password: hashedPassword,
          role,
        },
      });

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
