import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// POST /api/messages — public (formulaire de contact)
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { name, email, phone, subject, brand, message } = req.body;
  if (!name || !email || !subject || !message) {
    res.status(400).json({ message: 'name, email, subject et message requis' });
    return;
  }
  try {
    const msg = await prisma.message.create({ data: { name, email, phone, subject, brand, message } });
    res.status(201).json(msg);
  } catch {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// GET /api/messages — admin
router.get('/', authMiddleware, async (_req: Request, res: Response): Promise<void> => {
  try {
    const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(messages);
  } catch {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// PATCH /api/messages/:id/read — admin
router.patch('/:id/read', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id as string);
  try {
    const msg = await prisma.message.update({ where: { id }, data: { read: true } });
    res.json(msg);
  } catch {
    res.status(404).json({ message: 'Message introuvable' });
  }
});

// DELETE /api/messages/:id — admin
router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id as string);
  try {
    await prisma.message.delete({ where: { id } });
    res.json({ message: 'Message supprimé' });
  } catch {
    res.status(404).json({ message: 'Message introuvable' });
  }
});

export default router;
