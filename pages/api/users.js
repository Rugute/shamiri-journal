// pages/api/users.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password, role } = req.body;

    // Add your password hashing logic here, using bcrypt or any other library
    // For example: bcrypt.hashSync(password, 10)

    try {
      const user = await prisma.user.create({
        data: {
          username,
          password,  // Make sure to store a hashed password
          role,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
