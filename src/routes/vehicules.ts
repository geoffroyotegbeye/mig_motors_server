import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// GET /api/vehicules — public (avec filtres optionnels)
router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { marqueId, carburant, statut } = req.query;
  try {
    const vehicules = await prisma.vehicule.findMany({
      where: {
        ...(marqueId ? { marqueId: parseInt(marqueId as string) } : {}),
        ...(carburant ? { carburant: carburant as string } : {}),
        ...(statut ? { statut: statut as any } : {}),
      },
      include: { marque: { select: { id: true, nom: true, logo: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(vehicules);
  } catch {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST /api/vehicules — admin
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const { marqueId, nom, prix, annee, carburant, transmission, couleur, description, image, statut } = req.body;
  if (!marqueId || !nom || !prix || !annee) {
    res.status(400).json({ message: 'marqueId, nom, prix et annee requis' });
    return;
  }
  try {
    const vehicule = await prisma.vehicule.create({
      data: { marqueId: parseInt(marqueId), nom, prix, annee, carburant, transmission, couleur, description, image, statut },
      include: { marque: { select: { id: true, nom: true, logo: true } } },
    });
    res.status(201).json(vehicule);
  } catch {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// PUT /api/vehicules/:id — admin
router.put('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id as string);
  const { marqueId, nom, prix, annee, carburant, transmission, couleur, description, image, statut } = req.body;
  try {
    const vehicule = await prisma.vehicule.update({
      where: { id },
      data: { marqueId: marqueId ? parseInt(marqueId) : undefined, nom, prix, annee, carburant, transmission, couleur, description, image, statut },
      include: { marque: { select: { id: true, nom: true, logo: true } } },
    });
    res.json(vehicule);
  } catch {
    res.status(404).json({ message: 'Véhicule introuvable' });
  }
});

// DELETE /api/vehicules/:id — admin
router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id as string);
  try {
    await prisma.vehicule.delete({ where: { id } });
    res.json({ message: 'Véhicule supprimé' });
  } catch {
    res.status(404).json({ message: 'Véhicule introuvable' });
  }
});

export default router;
