/*
  Warnings:

  - The values [Atas,Plano_de_Atividades,Avisos,Editais,Regulamentos,Relatorios_de_contas] on the enum `tipo_D` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `associacaoId` on the `media` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "tipo_L" AS ENUM ('patrimonio', 'estabelecimento', 'outro');

-- AlterEnum
BEGIN;
CREATE TYPE "tipo_D_new" AS ENUM ('atas', 'plano_de_atividades', 'avisos', 'editais', 'regulamentos', 'relatorios_de_contas', 'outro');
ALTER TABLE "documentos" ALTER COLUMN "tipo_D" DROP DEFAULT;
ALTER TABLE "documentos" ALTER COLUMN "tipo_D" TYPE "tipo_D_new" USING ("tipo_D"::text::"tipo_D_new");
ALTER TYPE "tipo_D" RENAME TO "tipo_D_old";
ALTER TYPE "tipo_D_new" RENAME TO "tipo_D";
DROP TYPE "tipo_D_old";
ALTER TABLE "documentos" ALTER COLUMN "tipo_D" SET DEFAULT 'outro';
COMMIT;

-- DropForeignKey
ALTER TABLE "media" DROP CONSTRAINT "media_associacaoId_fkey";

-- AlterTable
ALTER TABLE "associacoes" ADD COLUMN     "media" VARCHAR(255);

-- AlterTable
ALTER TABLE "media" DROP COLUMN "associacaoId",
ADD COLUMN     "localId" INTEGER;

-- CreateTable
CREATE TABLE "locais" (
    "id" SERIAL NOT NULL,
    "nome_L" VARCHAR(255) NOT NULL,
    "texto_L" VARCHAR(255),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "tipo_L" "tipo_L" NOT NULL DEFAULT 'outro',
    "estado" "estado" NOT NULL DEFAULT 'ativo',

    CONSTRAINT "locais_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_localId_fkey" FOREIGN KEY ("localId") REFERENCES "locais"("id") ON DELETE SET NULL ON UPDATE CASCADE;
