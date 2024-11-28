/*
  Warnings:

  - You are about to drop the `Apps` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Apps";

-- CreateTable
CREATE TABLE "App" (
    "id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "deploy_url" TEXT NOT NULL,
    "dowload_url" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'APPLICATION',
    "technologies" TEXT[],
    "lenguage" "AppLenguage" NOT NULL DEFAULT 'SPANISH',
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "aviable" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);
