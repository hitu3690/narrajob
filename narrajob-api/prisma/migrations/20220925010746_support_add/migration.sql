/*
  Warnings:

  - You are about to drop the `support_product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "support_product" DROP CONSTRAINT "support_product_productId_fkey";

-- DropForeignKey
ALTER TABLE "support_product" DROP CONSTRAINT "support_product_userId_fkey";

-- DropTable
DROP TABLE "support_product";

-- CreateTable
CREATE TABLE "supports" (
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "supports_pkey" PRIMARY KEY ("productId","userId")
);

-- AddForeignKey
ALTER TABLE "supports" ADD CONSTRAINT "supports_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supports" ADD CONSTRAINT "supports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
