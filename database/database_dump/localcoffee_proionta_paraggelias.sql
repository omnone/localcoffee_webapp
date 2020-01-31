-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: localcoffee
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `proionta_paraggelias`
--

DROP TABLE IF EXISTS `proionta_paraggelias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proionta_paraggelias` (
  `parag_id` int(10) NOT NULL,
  `parag_proion` varchar(25) NOT NULL,
  `posotita` int(2) DEFAULT NULL,
  PRIMARY KEY (`parag_id`,`parag_proion`),
  KEY `PROIONNAME` (`parag_proion`),
  CONSTRAINT `IDORDER` FOREIGN KEY (`parag_id`) REFERENCES `paraggelia` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `PROIONNAME` FOREIGN KEY (`parag_proion`) REFERENCES `items` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proionta_paraggelias`
--

LOCK TABLES `proionta_paraggelias` WRITE;
/*!40000 ALTER TABLE `proionta_paraggelias` DISABLE KEYS */;
INSERT INTO `proionta_paraggelias` VALUES (1,'Espresso',1),(1,'Frape',1),(1,'Φίλτρου',1),(2,'Espresso',1),(2,'Frape',1),(3,'Frape',1),(3,'Freddo Espresso',1),(3,'Ελληνικός',1),(4,'Freddo Espresso',1);
/*!40000 ALTER TABLE `proionta_paraggelias` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-18 23:25:29
