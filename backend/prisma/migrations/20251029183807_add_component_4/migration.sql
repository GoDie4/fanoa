/*
  Warnings:

  - Added the required column `componente4` to the `servicio_editable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `servicio_editable` ADD COLUMN `componente4` VARCHAR(191) NOT NULL;
