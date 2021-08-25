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
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `adminNo` int(10) unsigned NOT NULL,
  `studentName` varchar(45) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(100) NOT NULL,
  `studentClass` varchar(45) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `vulnStr` varchar(5000) DEFAULT '' COMMENT 'csv',
  `points` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`adminNo`),
  UNIQUE KEY `adminNo_UNIQUE` (`adminNo`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Students DB, Stores user info & tracking of completed qns and points';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1901232,'Cai Xu Kun','xukun','$2a$10$Z20MHvxANspfuCt3zoDANOn5AoMrLWO.knXu2.edCyOOdjmA8xvSu','3A02','2021-08-09 07:03:02',',EX1,FS14,FS15,FS13,FS08,FS06',36),(1904316,'Jerry Kok Yu Xuan','jerrykok','$2a$10$Z20MHvxANspfuCt3zoDANOn5AoMrLWO.knXu2.edCyOOdjmA8xvSu','3A02','2021-08-09 07:15:44',',FS15,EX1,FS17,FS02',36),(1904358,'Tan Jia Wei','jiawei','$2a$10$Z20MHvxANspfuCt3zoDANOn5AoMrLWO.knXu2.edCyOOdjmA8xvSu','3A02','2021-07-21 07:56:35',',FS13,FS10,FS04,FS17,FS08',50),(1912345,'Kim Yo Han','yohan','$2a$10$Z20MHvxANspfuCt3zoDANOn5AoMrLWO.knXu2.edCyOOdjmA8xvSu','3A02','2021-07-16 06:40:29',',EX1,EX3,EX2,FS13',30),(1912346,'Lee Dae Hoon','daehoon','$2a$10$Z20MHvxANspfuCt3zoDANOn5AoMrLWO.knXu2.edCyOOdjmA8xvSu','3A02','2021-07-16 06:40:59',',EX3,EX1,EX6,EX2,EX5',50),(1928848,'Tan Yi Kang','yikang','$2a$10$Z20MHvxANspfuCt3zoDANOn5AoMrLWO.knXu2.edCyOOdjmA8xvSu','3A02','2021-08-09 06:55:00',',EX1,FS02',6),(1940123,'Jerry Tan Wei Jun','jerry','$2a$10$Z20MHvxANspfuCt3zoDANOn5AoMrLWO.knXu2.edCyOOdjmA8xvSu','3A02','2021-07-01 09:52:20',',FS02',5),(1942705,'Lucas Huang Xi Xun','lucas','$2a$10$Z20MHvxANspfuCt3zoDANOn5AoMrLWO.knXu2.edCyOOdjmA8xvSu','3A02','2021-07-01 10:27:36',',EX1,FS12,FS10',16),(1942750,'Koh Yung Kang','yungkang','$2a$10$Z20MHvxANspfuCt3zoDANOn5AoMrLWO.knXu2.edCyOOdjmA8xvSu','3A02','2021-07-15 08:33:15',',EX1,FS15,FS12,FS17',36),(1950023,'Ang Yuran','yuran','$2a$10$Z20MHvxANspfuCt3zoDANOn5AoMrLWO.knXu2.edCyOOdjmA8xvSu','3A02','2021-08-09 06:55:54',',EX1,FS15',16);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
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
