/*
  Warnings:

  - You are about to drop the column `dateSchedule` on the `time_schedule` table. All the data in the column will be lost.
  - You are about to drop the column `timeSchedule` on the `time_schedule` table. All the data in the column will be lost.
  - Added the required column `date_schedule` to the `time_schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_schedule` to the `time_schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "time_schedule" DROP COLUMN "dateSchedule",
DROP COLUMN "timeSchedule",
ADD COLUMN     "date_schedule" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "time_schedule" INTEGER NOT NULL;
