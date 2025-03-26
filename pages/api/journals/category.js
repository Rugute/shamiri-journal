import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'POST': {
            const { category, date } = req.body;

            try {
                const newCategory = await prisma.JournalCategory.create({
                    data: {
                        category,
        
                    },
                });
                res.status(201).json(newCategory);
            } catch (error) {
                console.error("Error creating journal category:", error);
                res.status(500).json({ error: "Error creating journal category" });
            } finally {
                await prisma.$disconnect();
            }
            break;
        }

        case 'GET': {
            try {
                const categories = await prisma.JournalCategory.findMany();
                res.status(200).json(categories);
            } catch (error) {
                console.error("Error fetching journal categories:", error);
                res.status(500).json({ error: "Error fetching journal categories" });
            } finally {
                await prisma.$disconnect();
            }
            break;
        }

        case 'PUT': {
            const { id, category } = req.body;

            try {
                const updatedCategory = await prisma.JournalCategory.update({
                    where: { id },
                    data: { category },
                });
                res.status(200).json(updatedCategory);
            } catch (error) {
                console.error("Error updating journal category:", error);
                res.status(500).json({ error: "Error updating journal category" });
            } finally {
                await prisma.$disconnect();
            }
            break;
        }

        case 'DELETE': {
            const { id } = req.body;

            try {
                await prisma.JournalCategory.delete({
                    where: { id },
                });
                res.status(204).end(); // No content
            } catch (error) {
                console.error("Error deleting journal category:", error);
                res.status(500).json({ error: "Error deleting journal category" });
            } finally {
                await prisma.$disconnect();
            }
            break;
        }

        default:
            res.status(405).json({ error: "Method Not Allowed" });
            break;
    }
}
