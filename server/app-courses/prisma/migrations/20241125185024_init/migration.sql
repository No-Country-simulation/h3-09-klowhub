/*
  Warnings:

  - You are about to drop the column `catergory` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `lenguaje` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `nivel` on the `courses` table. All the data in the column will be lost.
  - Added the required column `category` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "catergory",
DROP COLUMN "lenguaje",
DROP COLUMN "nivel",
ADD COLUMN     "category" "Category" NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "level" TEXT NOT NULL;
