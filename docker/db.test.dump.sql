-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: DJAM
-- ------------------------------------------------------
-- Server version	5.7.21

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
-- Table structure for table `Advise`
--

DROP TABLE IF EXISTS `Advise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Advise` (
  `TId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `SId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `Year` year(4) DEFAULT NULL,
  PRIMARY KEY (`TId`,`SId`),
  KEY `advise_ibfk_2` (`SId`),
  CONSTRAINT `advise_ibfk_1` FOREIGN KEY (`TId`) REFERENCES `Teacher` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advise_ibfk_2` FOREIGN KEY (`SId`) REFERENCES `Student` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Advise`
--

LOCK TABLES `Advise` WRITE;
/*!40000 ALTER TABLE `Advise` DISABLE KEYS */;
/*!40000 ALTER TABLE `Advise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Class`
--

DROP TABLE IF EXISTS `Class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Class` (
  `CourseId` char(7) COLLATE utf8_unicode_ci NOT NULL,
  `SectionNumber` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `Year` year(4) NOT NULL,
  `Semester` enum('First','Second','Summer') COLLATE utf8_unicode_ci NOT NULL,
  `MaxEnrollment` int(11) DEFAULT NULL,
  PRIMARY KEY (`CourseId`,`SectionNumber`,`Year`,`Semester`),
  CONSTRAINT `class_ibfk_1` FOREIGN KEY (`CourseId`) REFERENCES `Course` (`CourseId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Class`
--

LOCK TABLES `Class` WRITE;
/*!40000 ALTER TABLE `Class` DISABLE KEYS */;
INSERT INTO `Class` VALUES ('2110200','1',2016,'First',40),('2110200','2',2016,'First',40),('2110201','1',2016,'First',40),('2110201','2',2016,'First',40),('2110211','1',2016,'First',40),('2110211','2',2016,'First',40),('2110215','1',2016,'Second',30),('2110215','2',2016,'Second',30),('2110251','1',2016,'Second',30),('2110251','2',2016,'Second',30),('2110254','1',2016,'Second',30),('2110254','33',2016,'Second',30),('2110313','1',2017,'First',35),('2110313','2',2017,'First',35),('2110316','1',2017,'First',35),('2110316','2',2017,'First',35),('2110318','1',2017,'First',35),('2110318','2',2017,'First',35),('2110327','1',2017,'Second',30),('2110327','2',2017,'Second',30),('2110332','1',2017,'Second',30),('2110332','2',2017,'Second',30),('2110422','1',2017,'Second',30),('2110422','2',2017,'Second',30);
/*!40000 ALTER TABLE `Class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClassSchedule`
--

DROP TABLE IF EXISTS `ClassSchedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ClassSchedule` (
  `CourseId` char(7) COLLATE utf8_unicode_ci NOT NULL,
  `SectionNumber` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `Year` year(4) NOT NULL,
  `Semester` enum('First','Second','Summer') COLLATE utf8_unicode_ci NOT NULL,
  `Day` enum('Sun','Mon','Tue','Wed','Thur','Fri','Sat') COLLATE utf8_unicode_ci NOT NULL,
  `StartTime` time DEFAULT NULL,
  `Period` float DEFAULT NULL,
  PRIMARY KEY (`CourseId`,`SectionNumber`,`Year`,`Semester`,`Day`),
  CONSTRAINT `classschedule_ibfk_1` FOREIGN KEY (`CourseId`, `SectionNumber`, `Year`, `Semester`) REFERENCES `Class` (`CourseId`, `SectionNumber`, `Year`, `Semester`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClassSchedule`
--

LOCK TABLES `ClassSchedule` WRITE;
/*!40000 ALTER TABLE `ClassSchedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `ClassSchedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Course`
--

DROP TABLE IF EXISTS `Course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Course` (
  `CourseId` char(7) COLLATE utf8_unicode_ci NOT NULL,
  `CourseName` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Credit` int(11) DEFAULT NULL,
  PRIMARY KEY (`CourseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Course`
--

LOCK TABLES `Course` WRITE;
/*!40000 ALTER TABLE `Course` DISABLE KEYS */;
INSERT INTO `Course` VALUES ('2110200','Discrete Struc',3),('2110201','Com eng met',3),('2110211','Data struc',3),('2110215','Pro meth',3),('2110251','Dig com logic',3),('2110254','Dig design',3),('2110313','Os',3),('2110316','Prong lang',3),('2110318','Dis sys',3),('2110327','Algorithm',3),('2110332','Sys ana',3),('2110422','DB',3);
/*!40000 ALTER TABLE `Course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Document`
--

DROP TABLE IF EXISTS `Document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Document` (
  `DocumentId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `DocumentName` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DocumentDescription` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`DocumentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Document`
--

LOCK TABLES `Document` WRITE;
/*!40000 ALTER TABLE `Document` DISABLE KEYS */;
/*!40000 ALTER TABLE `Document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Enroll`
--

DROP TABLE IF EXISTS `Enroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Enroll` (
  `SId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `CourseId` char(7) COLLATE utf8_unicode_ci NOT NULL,
  `SectionNumber` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `Year` year(4) NOT NULL,
  `Semester` enum('First','Second','Summer') COLLATE utf8_unicode_ci NOT NULL,
  `Grade` float DEFAULT NULL,
  `Status` enum('Accept','Reject','Waiting') COLLATE utf8_unicode_ci DEFAULT NULL,
  `EnrollDate` date DEFAULT NULL,
  PRIMARY KEY (`CourseId`,`SId`,`SectionNumber`,`Year`,`Semester`),
  KEY `FK_Student_idx` (`SId`),
  KEY `FK_Class` (`CourseId`,`SectionNumber`,`Year`,`Semester`),
  CONSTRAINT `FK_Class` FOREIGN KEY (`CourseId`, `SectionNumber`, `Year`, `Semester`) REFERENCES `Class` (`CourseId`, `SectionNumber`, `Year`, `Semester`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Student` FOREIGN KEY (`SId`) REFERENCES `Student` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Enroll`
--

LOCK TABLES `Enroll` WRITE;
/*!40000 ALTER TABLE `Enroll` DISABLE KEYS */;
INSERT INTO `Enroll` VALUES ('5831060921','2110200','1',2016,'First',2,NULL,NULL),('5831063821','2110200','1',2016,'First',2,NULL,NULL),('5831063821','2110201','1',2016,'First',3,NULL,NULL),('5831063821','2110313','1',2017,'First',4,NULL,NULL),('5831063821','2110327','1',2017,'Second',4,NULL,NULL),('5831063821','2110332','1',2017,'Second',4,NULL,NULL),('5831060921','2110422','1',2017,'Second',3,NULL,NULL),('5831063821','2110422','1',2017,'Second',4,NULL,NULL);
/*!40000 ALTER TABLE `Enroll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Faculty`
--

DROP TABLE IF EXISTS `Faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Faculty` (
  `FacultyId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `FacultyName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `TuitionFeeNormal` int(11) DEFAULT NULL,
  `TuitionFeeSummer` int(11) DEFAULT NULL,
  PRIMARY KEY (`FacultyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Faculty`
--

LOCK TABLES `Faculty` WRITE;
/*!40000 ALTER TABLE `Faculty` DISABLE KEYS */;
INSERT INTO `Faculty` VALUES ('21','Engineer',21000,7000),('22','Art',18000,60000);
/*!40000 ALTER TABLE `Faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Officer`
--

DROP TABLE IF EXISTS `Officer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Officer` (
  `Id` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `Ssn` varchar(13) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FirstName` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LastName` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Tel` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Email` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `HouseNumber` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Road` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `District` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SubDistrict` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Province` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ZipCode` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Department` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `officer_ibfk_1` FOREIGN KEY (`Id`) REFERENCES `User` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Officer`
--

LOCK TABLES `Officer` WRITE;
/*!40000 ALTER TABLE `Officer` DISABLE KEYS */;
/*!40000 ALTER TABLE `Officer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Request`
--

DROP TABLE IF EXISTS `Request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Request` (
  `SId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `OId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `DocumentId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `Barcode` varchar(13) COLLATE utf8_unicode_ci DEFAULT NULL,
  `RequestDate` date DEFAULT NULL,
  `Status` enum('pending','processing','complete') COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`SId`,`OId`,`DocumentId`),
  KEY `request_ibfk_2` (`OId`),
  KEY `request_ibfk_3` (`DocumentId`),
  CONSTRAINT `request_ibfk_1` FOREIGN KEY (`SId`) REFERENCES `Student` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `request_ibfk_2` FOREIGN KEY (`OId`) REFERENCES `Officer` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `request_ibfk_3` FOREIGN KEY (`DocumentId`) REFERENCES `Document` (`DocumentId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Request`
--

LOCK TABLES `Request` WRITE;
/*!40000 ALTER TABLE `Request` DISABLE KEYS */;
/*!40000 ALTER TABLE `Request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Room`
--

DROP TABLE IF EXISTS `Room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Room` (
  `RoomId` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `BuildingName` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `FacultyId` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Floor` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Seat` int(11) DEFAULT NULL,
  PRIMARY KEY (`RoomId`,`BuildingName`),
  KEY `room_ibfk_1` (`FacultyId`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`FacultyId`) REFERENCES `Faculty` (`FacultyId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Room`
--

LOCK TABLES `Room` WRITE;
/*!40000 ALTER TABLE `Room` DISABLE KEYS */;
/*!40000 ALTER TABLE `Room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student`
--

DROP TABLE IF EXISTS `Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Student` (
  `Id` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `Ssn` varchar(13) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FirstName` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LastName` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Tel` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Email` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `HouseNumber` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Road` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `District` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SubDistrict` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Province` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ZipCode` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FacultyId` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `GradeRequirment` float DEFAULT NULL,
  `CreditRequirment` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FacultyId` (`FacultyId`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`Id`) REFERENCES `User` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_ibfk_2` FOREIGN KEY (`FacultyId`) REFERENCES `Faculty` (`FacultyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student`
--

LOCK TABLES `Student` WRITE;
/*!40000 ALTER TABLE `Student` DISABLE KEYS */;
INSERT INTO `Student` VALUES ('5831060921','1590300012563','สมหญิง','บุญมี','0934563222','somying@hotmail.com','23','สุขขี','ลาดพร้าว','ธารา','กรุงเทพ','10310','22',2,NULL),('5831063821','1619900273993','สมชาย','ศรีสุข','0634362323','somchai@gmail.com','323','พญาไท','ปทุมวัน','วังใหม่','อุทัยธานี','61140','21',2,140);
/*!40000 ALTER TABLE `Student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StudentPayment`
--

DROP TABLE IF EXISTS `StudentPayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `StudentPayment` (
  `SId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `Semester` enum('First','Second','Summer') COLLATE utf8_unicode_ci DEFAULT NULL,
  `Year` year(4) DEFAULT NULL,
  `Payment_Status` enum('Unpaid','Paid') COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`SId`),
  CONSTRAINT `studentpayment_ibfk_1` FOREIGN KEY (`SId`) REFERENCES `Student` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StudentPayment`
--

LOCK TABLES `StudentPayment` WRITE;
/*!40000 ALTER TABLE `StudentPayment` DISABLE KEYS */;
/*!40000 ALTER TABLE `StudentPayment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Teach`
--

DROP TABLE IF EXISTS `Teach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Teach` (
  `TId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `CourseId` char(7) COLLATE utf8_unicode_ci NOT NULL,
  `SectionNumber` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `Year` year(4) NOT NULL,
  `Semester` enum('First','Second','Summer') COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`TId`,`CourseId`,`SectionNumber`,`Year`,`Semester`),
  KEY `FK_Teach` (`CourseId`,`SectionNumber`,`Year`,`Semester`),
  CONSTRAINT `FK_Teach` FOREIGN KEY (`CourseId`, `SectionNumber`, `Year`, `Semester`) REFERENCES `Class` (`CourseId`, `SectionNumber`, `Year`, `Semester`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_ibfk_1` FOREIGN KEY (`TId`) REFERENCES `Teacher` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teach`
--

LOCK TABLES `Teach` WRITE;
/*!40000 ALTER TABLE `Teach` DISABLE KEYS */;
/*!40000 ALTER TABLE `Teach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TeachAt`
--

DROP TABLE IF EXISTS `TeachAt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TeachAt` (
  `RoomId` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `CourseId` char(7) COLLATE utf8_unicode_ci NOT NULL,
  `SectionNumber` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `Year` year(4) NOT NULL,
  `Semester` enum('First','Second','Summer') COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`RoomId`,`CourseId`,`SectionNumber`,`Year`,`Semester`),
  KEY `FK_Room` (`CourseId`,`SectionNumber`,`Year`,`Semester`),
  CONSTRAINT `FK_Room` FOREIGN KEY (`CourseId`, `SectionNumber`, `Year`, `Semester`) REFERENCES `Class` (`CourseId`, `SectionNumber`, `Year`, `Semester`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teachat_ibfk_1` FOREIGN KEY (`RoomId`) REFERENCES `Room` (`RoomId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TeachAt`
--

LOCK TABLES `TeachAt` WRITE;
/*!40000 ALTER TABLE `TeachAt` DISABLE KEYS */;
/*!40000 ALTER TABLE `TeachAt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Teacher`
--

DROP TABLE IF EXISTS `Teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Teacher` (
  `Id` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `Ssn` varchar(13) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FirstName` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LastName` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Tel` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Email` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `HouseNumber` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Road` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `District` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SubDistrict` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Province` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ZipCode` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Code` char(3) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FacultyId` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FacultyId` (`FacultyId`),
  CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`Id`) REFERENCES `User` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teacher_ibfk_2` FOREIGN KEY (`FacultyId`) REFERENCES `Faculty` (`FacultyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teacher`
--

LOCK TABLES `Teacher` WRITE;
/*!40000 ALTER TABLE `Teacher` DISABLE KEYS */;
/*!40000 ALTER TABLE `Teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `Id` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UserType` enum('Teacher','Student','Officer') COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('5831060921','1111111','Student'),('5831063821','12345678','Student');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `gpax_student`
--

DROP TABLE IF EXISTS `gpax_student`;
/*!50001 DROP VIEW IF EXISTS `gpax_student`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `gpax_student` AS SELECT 
 1 AS `Sid`,
 1 AS `CAX`,
 1 AS `GPX`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `gpax_student`
--

/*!50001 DROP VIEW IF EXISTS `gpax_student`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `gpax_student` AS select `E`.`SId` AS `Sid`,sum(`C`.`Credit`) AS `CAX`,sum((`C`.`Credit` * `E`.`Grade`)) AS `GPX` from (`enroll` `E` join `course` `C`) where (`E`.`CourseId` = `C`.`CourseId`) group by `E`.`SId` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-18 22:03:49
