/*
  Warnings:

  - You are about to drop the column `document` on the `Post` table. All the data in the column will be lost.
  - Added the required column `pdf` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "document",
ADD COLUMN     "pdf" TEXT NOT NULL;
