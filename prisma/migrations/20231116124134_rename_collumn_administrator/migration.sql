/*
  Warnings:

  - You are about to drop the column `adminstrator` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "adminstrator",
ADD COLUMN     "administrator" BOOLEAN NOT NULL DEFAULT false;
