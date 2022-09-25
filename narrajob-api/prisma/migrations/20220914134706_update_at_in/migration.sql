-- AlterTable
ALTER TABLE "articles" ALTER COLUMN "createdAt" SET DEFAULT NOW(),
ALTER COLUMN "updateAt" SET DEFAULT NOW();
