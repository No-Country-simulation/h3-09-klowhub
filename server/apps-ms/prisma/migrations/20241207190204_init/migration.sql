/*
  Warnings:

  - You are about to drop the column `category` on the `App` table. All the data in the column will be lost.
  - You are about to drop the column `deploy_url` on the `App` table. All the data in the column will be lost.
  - You are about to drop the column `download_url` on the `App` table. All the data in the column will be lost.
  - You are about to drop the column `lenguage` on the `App` table. All the data in the column will be lost.
  - You are about to drop the column `seller_id` on the `App` table. All the data in the column will be lost.
  - You are about to drop the column `technologies` on the `App` table. All the data in the column will be lost.
  - The `photo_url` column on the `App` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `contentPillar` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentType` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creator_id` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('FREE', 'PAID');

-- AlterTable
ALTER TABLE "App" DROP COLUMN "category",
DROP COLUMN "deploy_url",
DROP COLUMN "download_url",
DROP COLUMN "lenguage",
DROP COLUMN "seller_id",
DROP COLUMN "technologies",
ADD COLUMN     "contentPillar" TEXT NOT NULL,
ADD COLUMN     "contentType" "ContentType" NOT NULL,
ADD COLUMN     "creator_id" TEXT NOT NULL,
ADD COLUMN     "deploy_desktop_url" TEXT,
ADD COLUMN     "deploy_movil_url" TEXT,
ADD COLUMN     "download_desktop_url" TEXT,
ADD COLUMN     "download_movil_url" TEXT,
ADD COLUMN     "functionalities" TEXT[],
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "level" TEXT NOT NULL,
ADD COLUMN     "productType" TEXT NOT NULL DEFAULT 'APPLICATION',
ADD COLUMN     "sector" TEXT NOT NULL,
ADD COLUMN     "toolsAndPlatforms" TEXT[],
DROP COLUMN "photo_url",
ADD COLUMN     "photo_url" TEXT[];

-- DropEnum
DROP TYPE "AppLenguage";
