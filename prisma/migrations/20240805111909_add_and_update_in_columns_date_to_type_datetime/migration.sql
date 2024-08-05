/*
  Warnings:

  - Added the required column `updatedAt` to the `account` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `birthday` on the `barber` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `date` on the `notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dateSchedule` on the `time_schedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `timeSchedule` on the `time_schedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "account" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "barber" DROP COLUMN "birthday",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "time_schedule" DROP COLUMN "dateSchedule",
ADD COLUMN     "dateSchedule" TIMESTAMP(3) NOT NULL,
DROP COLUMN "timeSchedule",
ADD COLUMN     "timeSchedule" INTEGER NOT NULL;
