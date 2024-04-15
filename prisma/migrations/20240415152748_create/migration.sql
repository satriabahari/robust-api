/*
  Warnings:

  - You are about to drop the `merchendises` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `merchendises`;

-- CreateTable
CREATE TABLE `merchandises` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `description` VARCHAR(100) NULL,
    `price` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
