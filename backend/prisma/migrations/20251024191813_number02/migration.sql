/*
  Warnings:

  - Added the required column `miniDescripcion` to the `servicio_categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `miniTitulo` to the `servicio_categoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `servicio_categoria` ADD COLUMN `miniDescripcion` VARCHAR(191) NOT NULL,
    ADD COLUMN `miniTitulo` VARCHAR(191) NOT NULL;
