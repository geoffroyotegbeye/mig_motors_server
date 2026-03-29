import { Request, Response, NextFunction } from 'express';
import * as MessageService from '../services/message.service';
import { ValidationError } from '../lib/errors';

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await MessageService.findAllMessages());
  } catch (e) { next(e); }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone, subject, brand, agence, message } = req.body;
    if (!name || !email || !subject || !message) {
      throw new ValidationError('name, email, subject et message sont requis');
    }
    res.status(201).json(await MessageService.createMessage({ name, email, phone, subject, brand, agence, message }));
  } catch (e) { next(e); }
};

export const markRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) throw new ValidationError('ID invalide');
    res.json(await MessageService.markMessageRead(id));
  } catch (e) { next(e); }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) throw new ValidationError('ID invalide');
    await MessageService.deleteMessage(id);
    res.json({ message: 'Message supprimé' });
  } catch (e) { next(e); }
};
