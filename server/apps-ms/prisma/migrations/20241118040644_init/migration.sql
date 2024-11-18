/*
  Warnings:

  - You are about to drop the column `aviable` on the `App` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "App" DROP COLUMN "aviable",
ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true;
