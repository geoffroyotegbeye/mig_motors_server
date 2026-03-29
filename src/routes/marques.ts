import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// GET /api/marques — public
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const marques = await prisma.marque.findMany({ orderBy: { createdAt: 'asc' } });
    res.json(marques);
  } catch (e) {
    console.error('GET /marques error:', e);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST /api/marques — admin
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const { nom, logo, type, description } = req.body;
  if (!nom || !type) {
    res.status(400).json({ message: 'Nom et type requis' });
    return;
  }
  try {
    const marque = await prisma.marque.create({ data: { nom, logo, type, description } });
    res.status(201).json(marque);
  } catch {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// PUT /api/marques/:id — admin
router.put('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id as string);
  const { nom, logo, type, description } = req.body;
  try {
    const marque = await prisma.marque.update({ where: { id }, data: { nom, logo, type, description } });
    res.json(marque);
  } catch {
    res.status(404).json({ message: 'Marque introuvable' });
  }
});

// DELETE /api/marques/:id — admin (cascade sur véhicules via Prisma schema)
router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id as string);
  try {
    await prisma.marque.delete({ where: { id } });
    res.json({ message: 'Marque supprimée' });
  } catch {
    res.status(404).json({ message: 'Marque introuvable' });
  }
});

export default router;
