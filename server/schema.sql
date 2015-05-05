CREATE DATABASE pickUpLog;

USE pickUpLog;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'courts'
--
-- ---

DROP TABLE IF EXISTS `courts`;

CREATE TABLE `courts` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `longitude` DECIMAL NOT NULL,
  `lattitude` DECIMAL NOT NULL,
  `rating` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'rsvps'
--
-- ---

DROP TABLE IF EXISTS `rsvps`;

CREATE TABLE `rsvps` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `starttime` DATETIME NOT NULL,
  `endtime` DATETIME NOT NULL,
  `id_courts` INTEGER NULL DEFAULT NULL,
  `id_users` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `rsvps`
ADD FOREIGN KEY (id_courts)
REFERENCES `courts` (`id`);

ALTER TABLE `rsvps`
ADD FOREIGN KEY (id_users)
REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `courts` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `rsvps` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`email`,`password`,`username`) VALUES
-- ('','','','');
-- INSERT INTO `courts` (`id`,`name`,`address`,`longitude`,`lattitude`,`rating`) VALUES
-- ('','','','','','');
-- INSERT INTO `rsvps` (`id`,`starttime`,`endtime`,`id_courts`,`id_users`) VALUES
-- ('','','','','');
