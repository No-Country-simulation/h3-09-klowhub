/*
  Warnings:

  - The `contentPillar` column on the `App` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sector` column on the `App` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `plataform` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Plataform" AS ENUM ('APPSHEET', 'POWERAPPS');

-- AlterTable
ALTER TABLE "App" ADD COLUMN     "plataform" TEXT NOT NULL,
DROP COLUMN "contentPillar",
ADD COLUMN     "contentPillar" TEXT[],
DROP COLUMN "sector",
ADD COLUMN     "sector" TEXT[];
