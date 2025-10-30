-- CreateTable
CREATE TABLE `configuracions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numeros` JSON NULL,
    `correos` JSON NULL,
    `direccion1` TEXT NOT NULL,
    `direccion2` TEXT NOT NULL,
    `direccion3` TEXT NOT NULL,
    `horario` TEXT NOT NULL,
    `facebook` TEXT NULL,
    `instagram` TEXT NULL,
    `twiter` TEXT NULL,
    `tiktok` TEXT NULL,
    `linkedin` TEXT NULL,
    `youtube` TEXT NULL,
    `whatsapp` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `galeria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagen1` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
