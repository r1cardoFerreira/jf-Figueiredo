/*
  Warnings:

  - You are about to drop the column `media` on the `associacoes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mediaId]` on the table `associacoes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "associacoes" DROP COLUMN "media",
ADD COLUMN     "mediaId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "associacoes_mediaId_key" ON "associacoes"("mediaId");

-- AddForeignKey
ALTER TABLE "associacoes" ADD CONSTRAINT "associacoes_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
