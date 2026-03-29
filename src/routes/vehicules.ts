import { Router } from 'express';
import * as VehiculeController from '../controllers/vehicule.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', VehiculeController.getAll);
router.post('/', authMiddleware, VehiculeController.create);
router.put('/:id', authMiddleware, VehiculeController.update);
router.delete('/:id', authMiddleware, VehiculeController.remove);

export default router;
