-- CreateTable
CREATE TABLE `Raca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `origem` VARCHAR(191) NOT NULL,
    `porte` VARCHAR(191) NOT NULL,
    `temperamento` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
