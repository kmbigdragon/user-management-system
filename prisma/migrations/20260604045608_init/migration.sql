-- CreateEnum
CREATE TYPE "Role" AS ENUM ('member', 'admin', 'root');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'inactive', 'pending', 'rejected', 'banned', 'deleted');

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "uid" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'member',
    "status" "Status" NOT NULL DEFAULT 'pending',
    "dob" DATE NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_uid_key" ON "users"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
