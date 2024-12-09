/*
  Warnings:

  - You are about to drop the column `extra` on the `resources` table. All the data in the column will be lost.
  - Added the required column `contentLink` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "platform" "Platform"[],
ADD COLUMN     "relatedTags" TEXT[];

-- AlterTable
ALTER TABLE "lessons" ADD COLUMN     "contentLink" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "resources" DROP COLUMN "extra",
ADD COLUMN     "resourceLink" TEXT[];
