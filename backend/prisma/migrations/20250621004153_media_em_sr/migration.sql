/*
  Warnings:

  - You are about to drop the column `data_CE` on the `documentos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "documentos" DROP COLUMN "data_CE",
ADD COLUMN     "data_CD" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "media" ADD COLUMN     "sugestoes_reclamacoesId" INTEGER;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_sugestoes_reclamacoesId_fkey" FOREIGN KEY ("sugestoes_reclamacoesId") REFERENCES "sugestoes_reclamacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
