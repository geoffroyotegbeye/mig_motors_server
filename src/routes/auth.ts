import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Identifiant et mot de passe requis' });
    return;
  }
  try {
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      res.status(401).json({ message: 'Identifiants incorrects' });
      return;
    }
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      res.status(401).json({ message: 'Identifiants incorrects' });
      return;
    }
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
