import { Request, Response, NextFunction } from 'express';
import * as AuthService from '../services/auth.service';
import { ValidationError } from '../lib/errors';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new ValidationError('username et password sont requis');
    const token = await AuthService.loginAdmin(username, password);
    res.json({ token });
  } catch (e) { next(e); }
};
