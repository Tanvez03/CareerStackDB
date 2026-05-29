CREATE DATABASE  IF NOT EXISTS `careerstackdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `careerstackdb`;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: careerstackdb
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `application`
--

DROP TABLE IF EXISTS `application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application` (
  `ApplicationID` int(11) NOT NULL AUTO_INCREMENT,
  `SeekerID` int(11) NOT NULL,
  `Job_ID` int(11) NOT NULL,
  `Submitted_At` datetime DEFAULT current_timestamp(),
  `Status` enum('Pending','Reviewed','Accepted','Rejected') DEFAULT 'Pending',
  `Resume_File` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ApplicationID`),
  UNIQUE KEY `uq_application_seeker_job` (`SeekerID`,`Job_ID`),
  KEY `fk_application_job` (`Job_ID`),
  CONSTRAINT `fk_application_job` FOREIGN KEY (`Job_ID`) REFERENCES `joblisting` (`Job_ID`) ON DELETE CASCADE,
  CONSTRAINT `fk_application_seeker` FOREIGN KEY (`SeekerID`) REFERENCES `jobseeker` (`SeekerID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=99256 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application`
--

LOCK TABLES `application` WRITE;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
INSERT INTO `application` VALUES (40121,11234,30125,'2026-04-13 23:53:46','Pending',NULL),(40232,12876,30246,'2026-04-13 23:53:46','Reviewed',NULL),(40343,14592,30357,'2026-04-13 23:53:46','Accepted',NULL),(40454,16345,30468,'2026-04-13 23:53:46','Rejected',NULL),(40565,17854,30579,'2026-04-13 23:53:46','Pending',NULL),(40676,11234,30681,'2026-04-13 23:53:46','Reviewed',NULL),(40787,12876,30792,'2026-04-13 23:53:46','Pending',NULL),(40898,14592,30813,'2026-04-13 23:53:46','Accepted',NULL),(40919,16345,30924,'2026-04-13 23:53:46','Rejected',NULL),(41020,17854,31035,'2026-04-13 23:53:46','Pending',NULL),(50049,17858,64302,'2026-04-26 23:38:14','Pending','uploads\\resumes\\1777264694679-Mohammed Tanvez CSCI 5333 Assignment 5.pdf'),(52347,17856,61610,'2026-04-24 13:38:12','Reviewed',NULL),(60804,17857,30125,'2026-04-25 23:13:02','Pending',NULL),(70665,17855,30924,'2026-04-24 13:21:40','Pending',NULL),(77402,17857,87170,'2026-04-25 23:52:40','Pending','uploads\\resumes\\1777179160790-Mohammed Tanvez Resume.pdf'),(99255,17855,30125,'2026-04-24 12:22:24','Pending',NULL);
/*!40000 ALTER TABLE `application` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-26 23:55:20
