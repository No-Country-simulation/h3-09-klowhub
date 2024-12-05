-- AlterTable
ALTER TABLE "User" ADD COLUMN     "google_id" TEXT,
ALTER COLUMN "available" DROP NOT NULL;
