/*
  Warnings:

  - You are about to drop the column `contactos` on the `associacoes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "associacoes" DROP COLUMN "contactos",
ADD COLUMN     "email" VARCHAR(255),
ADD COLUMN     "telefone" VARCHAR(255);
