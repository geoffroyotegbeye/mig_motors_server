import { Router } from 'express';
import * as MessageController from '../controllers/message.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', MessageController.create);
router.get('/', authMiddleware, MessageController.getAll);
router.patch('/:id/read', authMiddleware, MessageController.markRead);
router.delete('/:id', authMiddleware, MessageController.remove);

export default router;
