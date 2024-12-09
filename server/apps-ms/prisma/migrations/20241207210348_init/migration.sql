/*
  Warnings:

  - You are about to drop the column `contentPillar` on the `App` table. All the data in the column will be lost.
  - Changed the type of `plataform` on the `App` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "App" DROP COLUMN "contentPillar",
DROP COLUMN "plataform",
ADD COLUMN     "plataform" "Plataform" NOT NULL;
