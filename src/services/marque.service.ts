import prisma from '../lib/prisma';
import { NotFoundError } from '../lib/errors';

export const findAllMarques = () =>
  prisma.marque.findMany({ orderBy: { createdAt: 'asc' } });

export const createMarque = (data: { nom: string; logo?: string; type: string; description?: string }) =>
  prisma.marque.create({ data });

export const updateMarque = async (id: number, data: Partial<{ nom: string; logo: string; type: string; description: string }>) => {
  const exists = await prisma.marque.findUnique({ where: { id } });
  if (!exists) throw new NotFoundError('Marque');
  return prisma.marque.update({ where: { id }, data });
};

export const deleteMarque = async (id: number) => {
  const exists = await prisma.marque.findUnique({ where: { id } });
  if (!exists) throw new NotFoundError('Marque');
  return prisma.marque.delete({ where: { id } });
};
