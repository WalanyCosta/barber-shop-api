/*
  Warnings:

  - You are about to drop the column `avatar` on the `account` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL
);
INSERT INTO "new_account" ("accessToken", "email", "id", "name", "password", "phone") SELECT "accessToken", "email", "id", "name", "password", "phone" FROM "account";
DROP TABLE "account";
ALTER TABLE "new_account" RENAME TO "account";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
