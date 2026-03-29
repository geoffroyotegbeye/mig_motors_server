import { Request, Response, NextFunction } from 'express';
import * as MarqueService from '../services/marque.service';
import { ValidationError } from '../lib/errors';

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await MarqueService.findAllMarques());
  } catch (e) { next(e); }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nom, logo, type, description } = req.body;
    if (!nom || !type) throw new ValidationError('nom et type sont requis');
    res.status(201).json(await MarqueService.createMarque({ nom, logo, type, description }));
  } catch (e) { next(e); }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) throw new ValidationError('ID invalide');
    res.json(await MarqueService.updateMarque(id, req.body));
  } catch (e) { next(e); }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) throw new ValidationError('ID invalide');
    await MarqueService.deleteMarque(id);
    res.json({ message: 'Marque supprimée' });
  } catch (e) { next(e); }
};
