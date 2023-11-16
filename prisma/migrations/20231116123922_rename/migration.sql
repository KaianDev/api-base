/*
  Warnings:

  - You are about to drop the column `admiminstrator` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "admiminstrator",
ADD COLUMN     "adminstrator" BOOLEAN NOT NULL DEFAULT false;
