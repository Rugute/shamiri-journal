import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const journals = await prisma.journal.findMany();
        res.json(journals);
      } else if (req.method === 'POST') {
        const { title, content, category } = req.body;
        const journal = await prisma.journal.create({
          data: { title, content, category },
        });
        res.json(journal);
      } else if (req.method === 'PUT') {
        const { id, title, content, category } = req.body;
        const updatedJournal = await prisma.journal.update({
          where: { id },
          data: { title, content, category },
        });
        res.json(updatedJournal);
      } else if (req.method === 'DELETE') {
        const { id } = req.body;
        await prisma.journal.delete({ where: { id } });
        res.json({ message: 'Deleted successfully' });
      }
  }