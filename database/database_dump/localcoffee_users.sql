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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` char(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2a$10$MHJNX1hpsrlFya9pJuZ0ROoagtQwOMOEerevJpMAfOw4tb9FNgpbi'),(2,'manager1','$2a$10$Mmc2UcsZTtDbWIovEh89d.Klo04iNJ63mbL4cqlu7gb9hzQGXHbBW'),(3,'manager2','$2a$10$FCY.QKbmsLPWr/iyI9jMjeQ7SHxpablehzy/9.oXBNOHHgFq0wfOq'),(4,'manager3','$2a$10$zFsJuGtOvgjgA3rgk6/odOI3q0R048nHHS4o91uqg1d6MiS4DSEza'),(5,'deliv1','$2a$10$CD2zqYrxCyB7geDpUNEwV.M3SZgrX383AB1hASTSWaGrwRbN.IDwq'),(6,'deliv2','$2a$10$lMg6prjfVhwI/86HOUXvueUguGR0EpGBOkVlRjV4pahew8iu6FnMO'),(7,'deliv3','$2a$10$vswvpBqWkinJuWE4jE9heO37rOAuglWp/ZDqtq1PscJVMEaE1w6Dm'),(8,'chri_bour@gmail.com','$2a$10$36TekQyagXyPabyq7tNNTu9ooziIPiDtDk4201pUad5Y9jtc6YNsO'),(9,'kbouradas@gmail.com','$2a$10$BsxvC7i9MxN.4CUnYZU9K.dzsngnGarzBu2BxOrWBqp5LJan3XzsW');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
