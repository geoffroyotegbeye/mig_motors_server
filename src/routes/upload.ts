import { Router, Request, Response } from 'express';
import { upload } from '../lib/cloudinary';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// POST /api/upload — admin uniquement
router.post('/', authMiddleware, upload.single('file'), (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: 'Aucun fichier reçu' });
    return;
  }
  const file = req.file as any;
  const url = file.secure_url || file.path;
  res.json({ url });
});

export default router;
