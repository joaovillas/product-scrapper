/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ProductPrice` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProductPrice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "ProductPrice" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
