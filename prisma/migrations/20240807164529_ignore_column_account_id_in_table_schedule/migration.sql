-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_accountId_fkey";

-- AlterTable
ALTER TABLE "schedule" ALTER COLUMN "accountId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
