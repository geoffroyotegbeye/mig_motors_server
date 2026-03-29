import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Admin
  const hash = await bcrypt.hash('mig2024', 10);
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: { username: 'admin', password: hash },
  });

  // Marques
  const marques = [
    { nom: 'KIA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/KIA_logo2.svg/800px-KIA_logo2.svg.png', type: 'Berlines & SUV', description: "Leader mondial de l'innovation automobile." },
    { nom: 'MERCEDES', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/800px-Mercedes-Logo.svg.png', type: 'Luxe & Premium', description: "L'incarnation du luxe automobile allemand." },
    { nom: 'FIAT', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Fiat_Automobiles_logo.svg/800px-Fiat_Automobiles_logo.svg.png', type: 'Citadines', description: "Le charme et l'ingéniosité italienne." },
    { nom: 'FUSO', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Mitsubishi_Fuso_Logo.svg/800px-Mitsubishi_Fuso_Logo.svg.png', type: 'Camions & Utilitaires', description: 'Camions robustes pour conditions exigeantes.' },
    { nom: 'PIAGGIO', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Piaggio_logo.svg/800px-Piaggio_logo.svg.png', type: 'Deux-roues', description: "Mobilité urbaine élégante à l'italienne." },
    { nom: 'KAIYI', logo: 'https://www.kaiyiauto.com/img/logo.png', type: 'Berlines & SUV', description: "L'avenir de l'automobile chinoise." },
    { nom: 'ASHOK LEYLAND', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Ashok_Leyland_logo.svg/800px-Ashok_Leyland_logo.svg.png', type: 'Poids lourds & Bus', description: 'Solutions de transport fiables.' },
    { nom: 'JEEP', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Jeep_logo.svg/800px-Jeep_logo.svg.png', type: 'SUV', description: 'Transport confortable tout-terrain.' },
  ];

  for (const m of marques) {
    await prisma.marque.upsert({ where: { nom: m.nom }, update: {}, create: m });
  }

  // Véhicules
  const kia = await prisma.marque.findUnique({ where: { nom: 'KIA' } });
  const mercedes = await prisma.marque.findUnique({ where: { nom: 'MERCEDES' } });
  const fiat = await prisma.marque.findUnique({ where: { nom: 'FIAT' } });

  if (kia && mercedes && fiat) {
    const vehicules = [
      { marqueId: kia.id, nom: 'KIA Sportage', prix: '18 500 000', annee: '2024', carburant: 'Essence', transmission: 'Automatique', couleur: 'Blanc', description: 'SUV compact moderne avec technologie avancée.', image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80', statut: 'disponible' as const },
      { marqueId: kia.id, nom: 'KIA Picanto', prix: '9 200 000', annee: '2024', carburant: 'Essence', transmission: 'Manuelle', couleur: 'Rouge', description: 'Citadine économique et agile.', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80', statut: 'disponible' as const },
      { marqueId: mercedes.id, nom: 'Mercedes Classe C', prix: '45 000 000', annee: '2023', carburant: 'Diesel', transmission: 'Automatique', couleur: 'Noir', description: 'Berline de luxe par excellence.', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80', statut: 'disponible' as const },
      { marqueId: fiat.id, nom: 'Fiat 500', prix: '8 900 000', annee: '2023', carburant: 'Essence', transmission: 'Automatique', couleur: 'Bleu', description: "Icône du style italien.", image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80', statut: 'reserve' as const },
    ];
    for (const v of vehicules) {
      await prisma.vehicule.create({ data: v });
    }
  }

  console.log('✅ Seed terminé');
}

main().catch(console.error).finally(() => prisma.$disconnect());
