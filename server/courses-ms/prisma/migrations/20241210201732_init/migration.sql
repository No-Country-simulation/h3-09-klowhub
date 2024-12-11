/*
  Warnings:

  - You are about to drop the column `category` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `technologies` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `mediaId` on the `resources` table. All the data in the column will be lost.
  - You are about to drop the column `sectionId` on the `resources` table. All the data in the column will be lost.
  - You are about to drop the `course_sections` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contentPillar` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentType` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseType` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creator` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detailedDescription` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Made the column `photo` on table `courses` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `lessonId` to the `resources` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('COURSE', 'LESSON');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('APPSHEET', 'POWERAPPS');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('FREE', 'PAID');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('VIDEO', 'DOCUMENT', 'LINK', 'OTHER');

-- DropForeignKey
ALTER TABLE "course_sections" DROP CONSTRAINT "course_sections_courseId_fkey";

-- DropForeignKey
ALTER TABLE "resources" DROP CONSTRAINT "resources_sectionId_fkey";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "category",
DROP COLUMN "description",
DROP COLUMN "productId",
DROP COLUMN "sellerId",
DROP COLUMN "technologies",
ADD COLUMN     "contentPillar" TEXT NOT NULL,
ADD COLUMN     "contentType" "ContentType" NOT NULL,
ADD COLUMN     "courseType" "CourseType" NOT NULL,
ADD COLUMN     "creator" TEXT NOT NULL,
ADD COLUMN     "detailedDescription" TEXT NOT NULL,
ADD COLUMN     "functionalities" TEXT[],
ADD COLUMN     "learningOutcomes" TEXT[],
ADD COLUMN     "platform" "Platform"[],
ADD COLUMN     "prerequisites" TEXT[],
ADD COLUMN     "relatedTags" TEXT[],
ADD COLUMN     "sector" TEXT NOT NULL,
ADD COLUMN     "shortDescription" TEXT NOT NULL,
ADD COLUMN     "toolsAndPlatforms" TEXT[],
ALTER COLUMN "photo" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "approved" SET DEFAULT false,
ALTER COLUMN "available" SET DEFAULT true;

-- AlterTable
ALTER TABLE "resources" DROP COLUMN "mediaId",
DROP COLUMN "sectionId",
ADD COLUMN     "lessonId" TEXT NOT NULL,
ADD COLUMN     "resourceLink" TEXT[];

-- DropTable
DROP TABLE "course_sections";

-- DropEnum
DROP TYPE "Category";

-- CreateTable
CREATE TABLE "lessons" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "contentLink" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modules" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "lessons_moduleId_order_idx" ON "lessons"("moduleId", "order");

-- CreateIndex
CREATE INDEX "modules_courseId_order_idx" ON "modules"("courseId", "order");

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
