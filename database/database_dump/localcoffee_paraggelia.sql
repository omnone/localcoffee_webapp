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
-- Table structure for table `paraggelia`
--

DROP TABLE IF EXISTS `paraggelia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paraggelia` (
  `order_id` int(10) NOT NULL AUTO_INCREMENT,
  `order_addr` varchar(50) NOT NULL DEFAULT 'unknown',
  `order_kat` varchar(30) DEFAULT NULL,
  `order_katastasi` enum('delivered','undelivered') DEFAULT 'undelivered',
  `order_date` datetime DEFAULT NULL,
  `order_deliv` int(10) unsigned DEFAULT NULL,
  `order_apostasi` double(20,10) DEFAULT '0.0000000000',
  PRIMARY KEY (`order_id`),
  KEY `KATPARAG` (`order_kat`),
  KEY `DELPARAG` (`order_deliv`),
  CONSTRAINT `DELPARAG` FOREIGN KEY (`order_deliv`) REFERENCES `delivery` (`deliv_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `KATPARAG` FOREIGN KEY (`order_kat`) REFERENCES `katastima` (`kat_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paraggelia`
--

LOCK TABLES `paraggelia` WRITE;
/*!40000 ALTER TABLE `paraggelia` DISABLE KEYS */;
INSERT INTO `paraggelia` VALUES (1,'Gerokostopoulou 6-16, Patra 262 21, Greece','Κατάστημα Αγίου Νικολάου','delivered','2018-02-18 19:01:36',5,0.6310000000),(2,'Maizonos 119, Patra 262 21, Greece','Κατάστημα Αγίου Νικολάου','delivered','2018-02-18 19:09:00',6,1.3080000000),(3,'Ρήγα Φεραίου 101, Πάτρα 262 21, Ελλάδα','Κατάστημα Αγίου Νικολάου','delivered','2018-02-18 19:14:20',6,0.6810000000),(4,'Maizonos 119, Patra 262 21, Greece','Κατάστημα Αγίου Νικολάου','delivered','2018-02-18 19:15:59',5,1.3080000000);
/*!40000 ALTER TABLE `paraggelia` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-18 23:25:28
