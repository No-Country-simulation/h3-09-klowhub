-- CreateEnum
CREATE TYPE "Category" AS ENUM ('COURSE', 'APPLICATION');

-- CreateTable
CREATE TABLE "courses" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "photo" TEXT,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "catergory" "Category" NOT NULL,
    "technologies" TEXT[],
    "approved" BOOLEAN NOT NULL,
    "lenguaje" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL,
    "productId" INTEGER NOT NULL,
    "nivel" TEXT NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_sections" (
    "id" SERIAL NOT NULL,
    "titleSection" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "resourceId" INTEGER,
    "order" INTEGER NOT NULL,

    CONSTRAINT "course_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "mediaId" TEXT NOT NULL,

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "course_sections" ADD CONSTRAINT "course_sections_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "course_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
