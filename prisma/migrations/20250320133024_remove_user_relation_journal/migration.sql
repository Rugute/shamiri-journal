-- DropForeignKey
ALTER TABLE `Journal` DROP FOREIGN KEY `Journal_userId_fkey`;

-- DropIndex
DROP INDEX `Journal_userId_fkey` ON `Journal`;
