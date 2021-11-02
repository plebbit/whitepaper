CREATE DATABASE IF NOT EXISTS plebbit;

USE plebbit;

CREATE TABLE IF NOT EXISTS `posts`
(
 `id`          integer NOT NULL AUTO_INCREMENT ,
 `CID`         varchar(255) NOT NULL ,
 `record`      varchar(255) NOT NULL ,
 `key_title`   varchar(255) NOT NULL ,
 PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `comments`
(
 `id`          integer NOT NULL AUTO_INCREMENT ,
 `CID`         varchar(255) NOT NULL ,
 `record`      varchar(255) NOT NULL ,
 `key_title`   varchar(255) NOT NULL ,
 PRIMARY KEY (`id`)
) ENGINE = InnoDB;