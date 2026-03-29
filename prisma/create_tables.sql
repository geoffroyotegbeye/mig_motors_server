-- Tables MIG Motors
-- À exécuter dans phpMyAdmin sur la base mig_motors

CREATE TABLE `Admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Admin_username_key` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Marque` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(191) NOT NULL,
  `logo` TEXT,
  `type` VARCHAR(191) NOT NULL,
  `description` TEXT,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Marque_nom_key` (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Vehicule` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `marqueId` INT NOT NULL,
  `nom` VARCHAR(191) NOT NULL,
  `prix` VARCHAR(191) NOT NULL,
  `annee` VARCHAR(191) NOT NULL,
  `carburant` VARCHAR(191) NOT NULL,
  `transmission` VARCHAR(191) NOT NULL,
  `couleur` VARCHAR(191),
  `description` TEXT,
  `image` TEXT,
  `statut` ENUM('disponible','vendu','reserve') NOT NULL DEFAULT 'disponible',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Vehicule_marqueId_fkey` (`marqueId`),
  CONSTRAINT `Vehicule_marqueId_fkey` FOREIGN KEY (`marqueId`) REFERENCES `Marque` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(191),
  `subject` VARCHAR(191) NOT NULL,
  `brand` VARCHAR(191),
  `message` TEXT NOT NULL,
  `read` TINYINT(1) NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
