/*
  Warnings:

  - You are about to drop the column `referralMessage` on the `Referral` table. All the data in the column will be lost.
  - Made the column `referralCode` on table `Referral` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Referral" DROP COLUMN "referralMessage",
ALTER COLUMN "referralCode" SET NOT NULL;
