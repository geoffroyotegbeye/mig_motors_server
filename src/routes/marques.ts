import { Router } from 'express';
import * as MarqueController from '../controllers/marque.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', MarqueController.getAll);
router.post('/', authMiddleware, MarqueController.create);
router.put('/:id', authMiddleware, MarqueController.update);
router.delete('/:id', authMiddleware, MarqueController.remove);

export default router;
