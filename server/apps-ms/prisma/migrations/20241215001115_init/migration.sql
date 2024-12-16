-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('FREE', 'PAID');

-- CreateEnum
CREATE TYPE "Plataform" AS ENUM ('APPSHEET', 'POWERAPPS');

-- CreateTable
CREATE TABLE "App" (
    "id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "photo_url" TEXT[],
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "deploy_desktop_url" TEXT,
    "download_desktop_url" TEXT,
    "deploy_movil_url" TEXT,
    "download_movil_url" TEXT,
    "language" TEXT NOT NULL,
    "plataform" "Plataform" NOT NULL,
    "functionalities" TEXT[],
    "sector" TEXT[],
    "toolsAndPlatforms" TEXT[],
    "level" TEXT NOT NULL,
    "contentType" "ContentType" NOT NULL,
    "productType" TEXT NOT NULL DEFAULT 'APPLICATION',
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);
