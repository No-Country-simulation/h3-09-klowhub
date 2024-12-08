/*
  Warnings:

  - You are about to drop the column `image` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `pdf` on the `resources` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "image",
DROP COLUMN "video";

-- AlterTable
ALTER TABLE "resources" DROP COLUMN "pdf",
ADD COLUMN     "extra" BOOLEAN NOT NULL DEFAULT false;
