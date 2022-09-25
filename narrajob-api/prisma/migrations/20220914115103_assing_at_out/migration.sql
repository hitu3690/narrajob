/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `assignedAt` on the `tag_article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "articles" DROP COLUMN "assignedAt";

-- AlterTable
ALTER TABLE "tag_article" DROP COLUMN "assignedAt";
