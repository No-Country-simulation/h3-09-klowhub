/*
  Warnings:

  - Added the required column `available` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "available" BOOLEAN NOT NULL,
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL;
