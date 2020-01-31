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
-- Table structure for table `apothema`
--

DROP TABLE IF EXISTS `apothema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apothema` (
  `apoth_kat` varchar(30) NOT NULL,
  `apoth_proion` varchar(25) NOT NULL,
  `apoth_posot` int(10) DEFAULT NULL,
  PRIMARY KEY (`apoth_kat`,`apoth_proion`),
  KEY `PROAPOTH` (`apoth_proion`),
  CONSTRAINT `KATAPOTHS` FOREIGN KEY (`apoth_kat`) REFERENCES `katastima` (`kat_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `PROAPOTH` FOREIGN KEY (`apoth_proion`) REFERENCES `items` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apothema`
--

LOCK TABLES `apothema` WRITE;
/*!40000 ALTER TABLE `apothema` DISABLE KEYS */;
INSERT INTO `apothema` VALUES ('Κατάστημα Αγίας Σοφίας','Κεικ',0),('Κατάστημα Αγίας Σοφίας','Κουλούρι',0),('Κατάστημα Αγίας Σοφίας','Τοστ',0),('Κατάστημα Αγίας Σοφίας','Τυρόπιτα',0),('Κατάστημα Αγίας Σοφίας','Χορτόπιτα',0),('Κατάστημα Αγίου Νικολάου','Κεικ',2),('Κατάστημα Αγίου Νικολάου','Κουλούρι',5),('Κατάστημα Αγίου Νικολάου','Τοστ',0),('Κατάστημα Αγίου Νικολάου','Τυρόπιτα',10),('Κατάστημα Αγίου Νικολάου','Χορτόπιτα',0),('Κατάστημα Ψηλών Αλωνίων','Κεικ',5),('Κατάστημα Ψηλών Αλωνίων','Κουλούρι',4),('Κατάστημα Ψηλών Αλωνίων','Τοστ',0),('Κατάστημα Ψηλών Αλωνίων','Τυρόπιτα',2),('Κατάστημα Ψηλών Αλωνίων','Χορτόπιτα',0);
/*!40000 ALTER TABLE `apothema` ENABLE KEYS */;
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
