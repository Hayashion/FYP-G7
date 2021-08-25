-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: login
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `vulntable`
--

DROP TABLE IF EXISTS `vulntable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vulntable` (
  `vulnId` varchar(20) NOT NULL,
  `flagValue` varchar(50) NOT NULL,
  `pointValue` int(11) NOT NULL,
  PRIMARY KEY (`vulnId`),
  UNIQUE KEY `vulnId_UNIQUE` (`vulnId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vulntable`
--

LOCK TABLES `vulntable` WRITE;
/*!40000 ALTER TABLE `vulntable` DISABLE KEYS */;
INSERT INTO `vulntable` VALUES ('EX1','easter',1),('FS01','chicken',15),('FS02','hideandseek',5),('FS03','pickle',5),('FS04','1mag3',15),('FS05','fork',15),('FS06','roses',5),('FS07','fluorescent',5),('FS08','candy',5),('FS09','lolinsecurelogin',5),('FS10','secret',10),('FS11','yeast',10),('FS12','nandos',5),('FS13','dynasty',5),('FS14','bubblegum',5),('FS15','tears',15),('FS16','y_s0_m3an',10),('FS17','x55ishard',15),('FS18','bR0K3n_1mG',5),('FS19','Giv3_SauC3_Pl3a5e',5),('FS20','Ra_1n3_oW',10),('FS21','supreme',5),('FS22','emp0w3r',5),('FS23','n1k3',5),('FS24','gr3atn3ss',5),('FS25','milli0n',5),('FS26','Cr!$pS',5),('FS27','s3rvi3e',10),('FS28','d0ntbm3an',10),('FS29','x55isFun',15),('FS30','uR1_eNc0D3d',15),('FS31','straw',15),('FS32','am1aJok3',15);
/*!40000 ALTER TABLE `vulntable` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-19  2:47:56
