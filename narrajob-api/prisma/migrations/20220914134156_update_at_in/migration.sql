/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `assignedAt` on the `tag_article` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `tag_article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "articles" DROP COLUMN "assignedAt",
ADD COLUMN     "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT NOT NULL DEFAULT 'author',
ADD COLUMN     "updateAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "tag_article" DROP COLUMN "assignedAt",
DROP COLUMN "assignedBy";
