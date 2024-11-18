/*
  Warnings:

  - The `lenguage` column on the `Apps` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AppLenguage" AS ENUM ('SPANISH', 'ENGLISH');

-- AlterTable
ALTER TABLE "Apps" DROP COLUMN "lenguage",
ADD COLUMN     "lenguage" "AppLenguage" NOT NULL DEFAULT 'SPANISH';
