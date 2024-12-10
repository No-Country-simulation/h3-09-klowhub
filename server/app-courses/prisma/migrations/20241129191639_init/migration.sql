/*
  Warnings:

  - You are about to drop the column `category` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `technologies` on the `courses` table. All the data in the column will be lost.
  - The `photo` column on the `courses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `mediaId` on the `resources` table. All the data in the column will be lost.
  - You are about to drop the `course_sections` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contentPillar` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentType` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseType` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creator` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detailedDescription` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extra` to the `resources` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('COURSE', 'LESSON');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('APPSHEET', 'POWERAPPS');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('FREE', 'PAID');

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
ADD COLUMN     "moduleId" TEXT,
ADD COLUMN     "prerequisites" TEXT[],
ADD COLUMN     "sector" TEXT NOT NULL,
ADD COLUMN     "shortDescription" TEXT NOT NULL,
ADD COLUMN     "toolsAndPlatforms" TEXT[],
DROP COLUMN "photo",
ADD COLUMN     "photo" TEXT[],
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "approved" SET DEFAULT false,
ALTER COLUMN "available" SET DEFAULT true;

-- AlterTable
ALTER TABLE "resources" DROP COLUMN "mediaId",
ADD COLUMN     "extra" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "course_sections";

-- DropEnum
DROP TYPE "Category";

-- CreateTable
CREATE TABLE "sections" (
    "id" TEXT NOT NULL,
    "titleSection" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modules" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
