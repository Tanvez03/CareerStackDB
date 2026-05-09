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
-- Table structure for table `joblisting`
--

DROP TABLE IF EXISTS `joblisting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `joblisting` (
  `Job_ID` int(11) NOT NULL AUTO_INCREMENT,
  `EmployerID` int(11) NOT NULL,
  `Title` varchar(100) DEFAULT NULL,
  `Job_Description` text DEFAULT NULL,
  `Location` varchar(100) DEFAULT NULL,
  `Salary_Min` decimal(10,2) DEFAULT NULL,
  `Salary_Max` decimal(10,2) DEFAULT NULL,
  `Employment_Type` enum('Full-Time','Part-Time','Contract') DEFAULT NULL,
  `Status` enum('Open','Closed') DEFAULT NULL,
  `Deadline` date DEFAULT NULL,
  `Posted_Date` date DEFAULT NULL,
  PRIMARY KEY (`Job_ID`),
  KEY `fk_joblisting_employer` (`EmployerID`),
  CONSTRAINT `fk_joblisting_employer` FOREIGN KEY (`EmployerID`) REFERENCES `employer` (`EmployerID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=97608 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joblisting`
--

LOCK TABLES `joblisting` WRITE;
/*!40000 ALTER TABLE `joblisting` DISABLE KEYS */;
INSERT INTO `joblisting` VALUES (30125,20451,'Software Engineer','Develop backend APIs and services','Houston',80000.00,100000.00,'Full-Time','Open','2026-12-31','2026-04-13'),(30246,31874,'Civil Engineer','Support structural and site planning work','Dallas',70000.00,90000.00,'Full-Time','Open','2026-11-30','2026-04-13'),(30357,42763,'AI Engineer','Build machine learning models and pipelines','Austin',100000.00,130000.00,'Full-Time','Open','2026-10-31','2026-04-13'),(30468,50982,'Nurse Assistant','Provide patient support and care coordination','Houston',50000.00,65000.00,'Full-Time','Open','2026-09-30','2026-04-13'),(30579,20451,'Frontend Developer','Build user interfaces with JavaScript','Houston',75000.00,95000.00,'Full-Time','Open','2026-12-15','2026-04-13'),(30681,31874,'Project Manager','Manage schedules, resources, and teams','Dallas',90000.00,110000.00,'Full-Time','Open','2026-08-31','2026-04-13'),(30792,42763,'Data Analyst','Analyze business and operational data','Austin',70000.00,85000.00,'Full-Time','Open','2026-07-31','2026-04-13'),(30813,50982,'HR Specialist','Handle recruitment and employee relations','Houston',60000.00,75000.00,'Full-Time','Open','2026-06-30','2026-04-13'),(30924,20451,'Backend Developer','Build and maintain REST APIs','Houston',85000.00,105000.00,'Full-Time','Open','2026-05-31','2026-04-13'),(31035,31874,'QA Tester','Test software systems and report bugs','Dallas',65000.00,80000.00,'Full-Time','Open','2026-04-30','2026-04-13'),(61610,50984,'Junior Web Developer','Develop and maintain web pages using HTML, CSS, JavaScript, Node.js, and MySQL.','Houston',55000.00,75000.00,'Full-Time','Open','2026-12-31','2026-04-24'),(64302,50986,'Infrastructure Engineer','Description....','Miami, FL',130000.00,140000.00,'Full-Time','Open','2026-06-10','2026-04-26'),(87170,50985,'Software Intern','...','Houston TX',100000.00,120000.00,'Full-Time','Open','2026-05-10','2026-04-25');
/*!40000 ALTER TABLE `joblisting` ENABLE KEYS */;
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
