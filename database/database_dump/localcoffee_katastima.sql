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
-- Table structure for table `katastima`
--

DROP TABLE IF EXISTS `katastima`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `katastima` (
  `kat_name` varchar(30) NOT NULL DEFAULT 'unknown',
  `kat_lat` double(20,10) NOT NULL DEFAULT '0.0000000000',
  `kat_lng` double(20,10) NOT NULL DEFAULT '0.0000000000',
  `kat_phone` varchar(20) NOT NULL DEFAULT 'unknown',
  `kat_tziros` double(10,2) DEFAULT '0.00',
  `kat_manager` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`kat_name`),
  KEY `KATMANAGEMENT` (`kat_manager`),
  CONSTRAINT `KATMANAGEMENT` FOREIGN KEY (`kat_manager`) REFERENCES `manager` (`man_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `katastima`
--

LOCK TABLES `katastima` WRITE;
/*!40000 ALTER TABLE `katastima` DISABLE KEYS */;
INSERT INTO `katastima` VALUES ('Κατάστημα Αγίας Σοφίας',38.2567930000,21.7460250000,'2610421011',0.00,2),('Κατάστημα Αγίου Νικολάου',38.2483870000,21.7355020000,'2610421010',10.80,4),('Κατάστημα Ψηλών Αλωνίων',38.2415050000,21.7367450000,'2610421012',0.00,3);
/*!40000 ALTER TABLE `katastima` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-18 23:25:27
