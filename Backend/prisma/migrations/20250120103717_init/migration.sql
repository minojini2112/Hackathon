/*
  Warnings:

  - The `registeredNumber` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `registrationLimit` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "registrationLimit",
ADD COLUMN     "registrationLimit" INTEGER NOT NULL,
DROP COLUMN "registeredNumber",
ADD COLUMN     "registeredNumber" INTEGER NOT NULL DEFAULT 0;
