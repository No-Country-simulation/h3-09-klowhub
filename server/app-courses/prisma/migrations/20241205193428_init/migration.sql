/*
  Warnings:

  - You are about to drop the column `moduleId` on the `courses` table. All the data in the column will be lost.
  - Changed the type of `type` on the `resources` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('VIDEO', 'DOCUMENT', 'LINK', 'OTHER');

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "moduleId";

-- AlterTable
ALTER TABLE "resources" DROP COLUMN "type",
ADD COLUMN     "type" "ResourceType" NOT NULL;

-- CreateIndex
CREATE INDEX "lessons_moduleId_order_idx" ON "lessons"("moduleId", "order");

-- CreateIndex
CREATE INDEX "modules_courseId_order_idx" ON "modules"("courseId", "order");
