import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

async function uploadFromUrl(url: string, publicId: string): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(url, {
      folder: 'mig-motors/marques',
      public_id: publicId,
      overwrite: true,
    });
    return result.secure_url;
  } catch (e) {
    console.warn(`⚠️  Échec upload ${publicId}:`, (e as Error).message);
    return url; // garde l'URL originale si échec
  }
}

async function main() {
  const marques = await prisma.marque.findMany();

  for (const marque of marques) {
    if (!marque.logo) continue;
    // Skip si déjà sur Cloudinary
    if (marque.logo.includes('cloudinary.com')) {
      console.log(`✅ ${marque.nom} déjà sur Cloudinary`);
      continue;
    }
    console.log(`⬆️  Upload logo ${marque.nom}...`);
    const newUrl = await uploadFromUrl(marque.logo, marque.nom.toLowerCase().replace(/\s+/g, '-'));
    await prisma.marque.update({ where: { id: marque.id }, data: { logo: newUrl } });
    console.log(`✅ ${marque.nom} → ${newUrl}`);
  }

  console.log('\n✅ Migration logos terminée');
}

main().catch(console.error).finally(() => prisma.$disconnect());
