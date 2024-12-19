-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('COURSE', 'LESSON');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('APPSHEET', 'POWERAPPS');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('FREE', 'PAID');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('VIDEO', 'DOCUMENT', 'LINK', 'OTHER');

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "functionalities" TEXT[],
    "language" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "toolsAndPlatforms" TEXT[],
    "contentType" "ContentType" NOT NULL,
    "courseType" "CourseType" NOT NULL,
    "level" TEXT NOT NULL,
    "contentPillar" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'COURSE',
    "learningOutcomes" TEXT[],
    "prerequisites" TEXT[],
    "detailedDescription" TEXT NOT NULL,
    "approved" BOOLEAN DEFAULT false,
    "available" BOOLEAN DEFAULT true,
    "creator_id" TEXT NOT NULL,
    "platform" "Platform"[],
    "relatedTags" TEXT[],

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "resources" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "resourceLink" TEXT[],

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
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
