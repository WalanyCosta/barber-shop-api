-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);
