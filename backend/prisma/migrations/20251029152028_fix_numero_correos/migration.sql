/*
  Warnings:

  - You are about to alter the column `numeros` on the `configuracions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.
  - You are about to alter the column `correos` on the `configuracions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.

*/
-- AlterTable
ALTER TABLE `configuracions` MODIFY `numeros` JSON NULL,
    MODIFY `correos` JSON NULL;
