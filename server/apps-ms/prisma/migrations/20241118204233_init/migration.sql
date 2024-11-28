/*
  Warnings:

  - Added the required column `photo_url` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "App" ADD COLUMN     "photo_url" TEXT NOT NULL;
