/*
  Warnings:

  - You are about to drop the column `img_A` on the `associacoes` table. All the data in the column will be lost.
  - You are about to drop the column `doc` on the `documentos` table. All the data in the column will be lost.
  - You are about to drop the column `img_E` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `img_E` on the `galeria` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "associacoes" DROP COLUMN "img_A";

-- AlterTable
ALTER TABLE "documentos" DROP COLUMN "doc";

-- AlterTable
ALTER TABLE "eventos" DROP COLUMN "img_E";

-- AlterTable
ALTER TABLE "galeria" DROP COLUMN "img_E";

-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "file" VARCHAR(255) NOT NULL,
    "eventoId" INTEGER,
    "associacaoId" INTEGER,
    "galeriaId" INTEGER,
    "documentoId" INTEGER,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "eventos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_associacaoId_fkey" FOREIGN KEY ("associacaoId") REFERENCES "associacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_galeriaId_fkey" FOREIGN KEY ("galeriaId") REFERENCES "galeria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "documentos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
