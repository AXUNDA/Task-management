/*
  Warnings:

  - Made the column `tag` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `tag` ENUM('URGENT', 'BUG', 'FEATURE') NOT NULL DEFAULT 'BUG';
