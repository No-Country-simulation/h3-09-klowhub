/*
  Warnings:

  - You are about to drop the column `extra` on the `resources` table. All the data in the column will be lost.
  - You are about to drop the column `sectionId` on the `resources` table. All the data in the column will be lost.
  - You are about to drop the `sections` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `moduleId` on table `courses` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `lessonId` to the `resources` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaId` to the `resources` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `resources` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "resources" DROP CONSTRAINT "resources_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "sections" DROP CONSTRAINT "sections_moduleId_fkey";

-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "moduleId" SET NOT NULL;

-- AlterTable
ALTER TABLE "resources" DROP COLUMN "extra",
DROP COLUMN "sectionId",
ADD COLUMN     "lessonId" TEXT NOT NULL,
ADD COLUMN     "mediaId" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "sections";

-- CreateTable
CREATE TABLE "lessons" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
