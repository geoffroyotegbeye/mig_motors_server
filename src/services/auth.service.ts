import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../lib/errors';

export const loginAdmin = async (username: string, password: string): Promise<string> => {
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) throw new AppError(401, 'Identifiants incorrects');

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) throw new AppError(401, 'Identifiants incorrects');

  return jwt.sign({ id: admin.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
};
