/*
  Warnings:

  - You are about to drop the column `mediaId` on the `associacoes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[associacaoId]` on the table `media` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "associacoes" DROP CONSTRAINT "associacoes_mediaId_fkey";

-- DropIndex
DROP INDEX "associacoes_mediaId_key";

-- AlterTable
ALTER TABLE "associacoes" DROP COLUMN "mediaId";

-- AlterTable
ALTER TABLE "media" ADD COLUMN     "associacaoId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "media_associacaoId_key" ON "media"("associacaoId");

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_associacaoId_fkey" FOREIGN KEY ("associacaoId") REFERENCES "associacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
