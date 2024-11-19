/*
  Warnings:

  - You are about to drop the column `dowload_url` on the `App` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "App" DROP COLUMN "dowload_url",
ADD COLUMN     "download_url" TEXT,
ALTER COLUMN "deploy_url" DROP NOT NULL;
