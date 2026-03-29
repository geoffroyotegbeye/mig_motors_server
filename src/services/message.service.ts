import prisma from '../lib/prisma';
import { NotFoundError } from '../lib/errors';

export const findAllMessages = () =>
  prisma.message.findMany({ orderBy: { createdAt: 'desc' } });

export const createMessage = (data: {
  name: string; email: string; phone?: string;
  subject: string; brand?: string; agence?: string; message: string;
}) => prisma.message.create({ data });

export const markMessageRead = async (id: number) => {
  const exists = await prisma.message.findUnique({ where: { id } });
  if (!exists) throw new NotFoundError('Message');
  return prisma.message.update({ where: { id }, data: { read: true } });
};

export const deleteMessage = async (id: number) => {
  const exists = await prisma.message.findUnique({ where: { id } });
  if (!exists) throw new NotFoundError('Message');
  return prisma.message.delete({ where: { id } });
};
