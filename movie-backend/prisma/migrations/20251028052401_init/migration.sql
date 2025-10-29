/*
  Warnings:

  - Added the required column `imgUrl` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Movie` ADD COLUMN `imgUrl` VARCHAR(191) NOT NULL;
