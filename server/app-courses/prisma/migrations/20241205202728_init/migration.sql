/*
  Warnings:

  - You are about to drop the column `mediaId` on the `resources` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `resources` table. All the data in the column will be lost.
  - Added the required column `image` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lessons" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "video" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "resources" DROP COLUMN "mediaId",
DROP COLUMN "type",
ADD COLUMN     "pdf" TEXT[];
