CREATE DATABASE  IF NOT EXISTS `careerstackdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `careerstackdb`;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: careerstackdb
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MySQL

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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `FullName` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `PasswordHash` varchar(255) DEFAULT NULL,
  `Role` enum('Employer','JobSeeker','Admin') DEFAULT NULL,
  `Created_At` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=93488 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Ali Khan','ali@example.com','$2b$10$mfLRlGNkB8sX.8OP33QWz.MTjfPS.pfiL8Sqo0/h5WPmaOBehkFV.','JobSeeker','2026-04-09 11:58:39'),(59348,'Lisa Wong','lisa@test.com','hash6','JobSeeker','2026-04-13 12:36:41'),(65128,'Elizabeth Hamilton','elizabeth@test.com','hash10','JobSeeker','2026-04-13 12:36:41'),(67452,'Sara Lee','sara@test.com','hash2','Employer','2026-04-13 12:36:41'),(72635,'David Kim','david@test.com','hash7','Employer','2026-04-13 12:36:41'),(76219,'Emma Davis','emma@test.com','hash4','Employer','2026-04-13 12:36:41'),(84567,'Mike Brown','mike@test.com','hash5','Admin','2026-04-13 12:36:41'),(88921,'Sophia Patel','sophia@test.com','hash8','JobSeeker','2026-04-13 12:36:41'),(91834,'John Smith','john@test.com','hash3','JobSeeker','2026-04-13 12:36:41'),(93476,'Chris Evans','chris@test.com','hash9','Employer','2026-04-13 12:36:41'),(93478,'The Admin','admin@test.com','$2b$10$qyv/2z4MdwDBkC7vZmk6..BVwt1a3OXCEIanAuWw1BM0mmqARqETq','Admin','2026-04-24 11:16:10'),(93479,'Employer Test','emp@test.com','$2b$10$nzSalaVM0pg8moOC0s/x0uNziQc2Vzcho6dl/qYSmfGeILmIQ4W4m','Employer','2026-04-24 11:54:58'),(93480,'Test Seeker','seeker@test.com','$2b$10$HspGWnLcPhopYu9nih6UueqioMNcFEJWGC3jcqcAMZgX6WOM7JiU.','JobSeeker','2026-04-24 12:15:21'),(93481,'New Employer','newemployer@test.com','$2b$10$wZZudXyErkT.CfpTLdRUw.0ZcNn7m9.J6JQkmuW3UVLUn8mR5S2nK','Employer','2026-04-24 13:29:41'),(93482,'New Seeker','newseeker@test.com','$2b$10$WqqXLjdWksbBUZXp2upCp.31UWfaqq2xK1M14KK50eaSLLjnDLJ/i','JobSeeker','2026-04-24 13:36:43'),(93483,'Matt Murdock','matt@test.com','$2b$10$YGx7M9UZG66l7gdXNt0Mwuj1wnKetG6JMxvlZrtOzsXadMPtaLQ8K','Employer','2026-04-24 17:01:06'),(93484,'Frank Castle','frank@test.com','$2b$10$NQ2qEC709K.K8.9I2z5S2O1tVJdJpEpmADyRsYsP88cW4IuMvsp8.','JobSeeker','2026-04-24 18:13:48'),(93485,'Wilson Fisk','Fisk@test.com','$2b$10$n3GluPx7U7fNbpM9KoFeE.SGs/IlEsqfnVxKa5RfV4YBTVSZamGT.','Employer','2026-04-26 07:59:45'),(93486,'Barry Allen','barry@uhcl.edu','$2b$10$e7bf6JsSd7dQhRvr9AYbs.hhXyNDz9CnklXvNCpjQnr7e3X/94su2','JobSeeker','2026-04-26 23:37:39'),(93487,'Harry Wells','harry@uhcl.edu','$2b$10$YYhqCUHPTRxINop2JUoifuV9aZgXwoqYKJbN6YzTPEKdQEgttMIQC','Employer','2026-04-26 23:39:12');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-26 23:55:19
