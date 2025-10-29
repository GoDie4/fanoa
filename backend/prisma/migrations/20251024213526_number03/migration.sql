/*
  Warnings:

  - You are about to drop the column `nombre` on the `servicio_adicional` table. All the data in the column will be lost.
  - Added the required column `titulo` to the `servicio_adicional` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `servicio_adicional` DROP COLUMN `nombre`,
    ADD COLUMN `titulo` VARCHAR(191) NOT NULL;
