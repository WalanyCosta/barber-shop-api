/*
  Warnings:

  - You are about to drop the column `scheduleId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `barberId` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleId` on the `time_schedule` table. All the data in the column will be lost.
  - Added the required column `schedule_id` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barber_id` to the `schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule_id` to the `time_schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_accountId_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_barberId_fkey";

-- DropForeignKey
ALTER TABLE "time_schedule" DROP CONSTRAINT "time_schedule_scheduleId_fkey";

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "scheduleId",
ADD COLUMN     "schedule_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "accountId",
DROP COLUMN "barberId",
ADD COLUMN     "account_id" TEXT,
ADD COLUMN     "barber_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "time_schedule" DROP COLUMN "scheduleId",
ADD COLUMN     "schedule_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_barber_id_fkey" FOREIGN KEY ("barber_id") REFERENCES "barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_schedule" ADD CONSTRAINT "time_schedule_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
