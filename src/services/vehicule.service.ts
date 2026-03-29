import prisma from '../lib/prisma';
import { NotFoundError } from '../lib/errors';

const include = { marque: { select: { id: true, nom: true, logo: true } } };

export const findAllVehicules = (filters: { marqueId?: number; carburant?: string; statut?: string }) =>
  prisma.vehicule.findMany({
    where: {
      ...(filters.marqueId ? { marqueId: filters.marqueId } : {}),
      ...(filters.carburant ? { carburant: filters.carburant } : {}),
      ...(filters.statut ? { statut: filters.statut as any } : {}),
    },
    include,
    orderBy: { createdAt: 'desc' },
  });

export const createVehicule = (data: {
  marqueId: number; nom: string; prix: string; annee: string;
  carburant: string; transmission: string; couleur?: string;
  description?: string; image?: string; statut?: string;
}) => prisma.vehicule.create({ data: { ...data, statut: data.statut as any }, include });

export const updateVehicule = async (id: number, data: Partial<{
  marqueId: number; nom: string; prix: string; annee: string;
  carburant: string; transmission: string; couleur: string;
  description: string; image: string; statut: string;
}>) => {
  const exists = await prisma.vehicule.findUnique({ where: { id } });
  if (!exists) throw new NotFoundError('Véhicule');
  return prisma.vehicule.update({ where: { id }, data: { ...data, statut: data.statut as any }, include });
};

export const deleteVehicule = async (id: number) => {
  const exists = await prisma.vehicule.findUnique({ where: { id } });
  if (!exists) throw new NotFoundError('Véhicule');
  return prisma.vehicule.delete({ where: { id } });
};
