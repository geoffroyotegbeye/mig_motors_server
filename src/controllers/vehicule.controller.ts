import { Request, Response, NextFunction } from 'express';
import * as VehiculeService from '../services/vehicule.service';
import { ValidationError } from '../lib/errors';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { marqueId, carburant, statut } = req.query;
    res.json(await VehiculeService.findAllVehicules({
      marqueId: marqueId ? parseInt(marqueId as string) : undefined,
      carburant: carburant as string,
      statut: statut as string,
    }));
  } catch (e) { next(e); }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { marqueId, nom, prix, annee, carburant, transmission, couleur, description, image, statut } = req.body;
    if (!marqueId || !nom || !prix || !annee) throw new ValidationError('marqueId, nom, prix et annee sont requis');
    res.status(201).json(await VehiculeService.createVehicule({
      marqueId: parseInt(marqueId), nom, prix, annee, carburant, transmission, couleur, description, image, statut,
    }));
  } catch (e) { next(e); }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) throw new ValidationError('ID invalide');
    const { marqueId, ...rest } = req.body;
    res.json(await VehiculeService.updateVehicule(id, {
      ...rest,
      ...(marqueId ? { marqueId: parseInt(marqueId) } : {}),
    }));
  } catch (e) { next(e); }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) throw new ValidationError('ID invalide');
    await VehiculeService.deleteVehicule(id);
    res.json({ message: 'Véhicule supprimé' });
  } catch (e) { next(e); }
};
