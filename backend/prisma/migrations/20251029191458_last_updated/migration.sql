/*
  Warnings:

  - Added the required column `subtitulo` to the `servicio_adicional` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `servicio_adicional` ADD COLUMN `subtitulo` VARCHAR(191) NOT NULL;
