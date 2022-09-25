/*
  Warnings:

  - Added the required column `assignedAt` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignedAt` to the `tag_article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "tag_article" ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL;
