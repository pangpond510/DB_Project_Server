-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: databaseProject
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
-- Table structure for table `AcademicPeriod`
--

DROP TABLE IF EXISTS `AcademicPeriod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AcademicPeriod` (
  `year` year(4) NOT NULL,
  `semester` int(11) NOT NULL,
  `registrationStatus` enum('register','add/drop','withdraw','none') NOT NULL,
  `status` enum('pass','now','incoming') NOT NULL,
  PRIMARY KEY (`year`,`semester`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Advise`
--

DROP TABLE IF EXISTS `Advise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Advise` (
  `tId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `sId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`tId`,`sId`),
  KEY `advise_ibfk_2` (`sId`),
  CONSTRAINT `advise_ibfk_1` FOREIGN KEY (`tId`) REFERENCES `Teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advise_ibfk_2` FOREIGN KEY (`sId`) REFERENCES `Student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Class`
--

DROP TABLE IF EXISTS `Class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Class` (
  `courseId` char(7) COLLATE utf8_unicode_ci NOT NULL,
  `sectionNumber` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `year` year(4) NOT NULL,
  `semester` int(11) NOT NULL,
  `maxEnrollment` int(11) DEFAULT NULL,
  PRIMARY KEY (`courseId`,`sectionNumber`,`year`,`semester`),
  KEY `class_ibfk_2_idx` (`year`,`semester`),
  CONSTRAINT `class_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `Course` (`courseId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `class_ibfk_2` FOREIGN KEY (`year`, `semester`) REFERENCES `AcademicPeriod` (`year`, `semester`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Course`
--

DROP TABLE IF EXISTS `Course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Course` (
  `courseId` char(7) COLLATE utf8_unicode_ci NOT NULL,
  `courseName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `shortName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `credit` int(11) NOT NULL,
  PRIMARY KEY (`courseId`),
  UNIQUE KEY `courseName_UNIQUE` (`courseName`),
  UNIQUE KEY `shortName_UNIQUE` (`shortName`),
  KEY `course_idx` (`courseName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Document`
--

DROP TABLE IF EXISTS `Document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Document` (
  `documentId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `documentName` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `documentDescription` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`documentId`),
  UNIQUE KEY `documentName_UNIQUE` (`documentName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Enrollment`
--

DROP TABLE IF EXISTS `Enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Enrollment` (
  `enrollmentId` int(11) NOT NULL AUTO_INCREMENT,
  `sId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `courseId` char(7) COLLATE utf8_unicode_ci NOT NULL,
  `sectionNumber` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `year` year(4) NOT NULL,
  `semester` int(11) NOT NULL,
  `enrollDate` date NOT NULL,
  `status` enum('Pending','Denied','Studying','Finish','Withdraw','Drop') COLLATE utf8_unicode_ci NOT NULL,
  `isRegisted` enum('Registered','Added') COLLATE utf8_unicode_ci DEFAULT NULL,
  `grade` float DEFAULT NULL,
  PRIMARY KEY (`enrollmentId`),
  KEY `FK_ibst1_idx` (`sId`),
  KEY `FK_ibclass1_idx` (`courseId`,`sectionNumber`,`year`,`semester`),
  CONSTRAINT `FK_ibclass1` FOREIGN KEY (`courseId`, `sectionNumber`, `year`, `semester`) REFERENCES `Class` (`courseId`, `sectionNumber`, `year`, `semester`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ibst1` FOREIGN KEY (`sId`) REFERENCES `Student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=760 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Faculty`
--

DROP TABLE IF EXISTS `Faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Faculty` (
  `facultyId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `facultyName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `tuitionFeeNormal` int(11) NOT NULL,
  `tuitionFeeSummer` int(11) NOT NULL,
  `gradeRequirment` float NOT NULL,
  `creditRequirment` int(11) NOT NULL,
  PRIMARY KEY (`facultyId`),
  UNIQUE KEY `facultyName_UNIQUE` (`facultyName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Officer`
--

DROP TABLE IF EXISTS `Officer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Officer` (
  `id` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `ssn` varchar(13) COLLATE utf8_unicode_ci DEFAULT NULL,
  `firstName` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastName` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` enum('F','M') COLLATE utf8_unicode_ci DEFAULT NULL,
  `tel` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `houseNumber` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `road` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `district` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `subDistrict` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `province` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `zipCode` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `department` varchar(30) COLLATE utf8_unicode_ci DEFAULT 'ฝ่ายทะเบียนและวัดผล',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ssn_UNIQUE` (`ssn`),
  UNIQUE KEY `tel_UNIQUE` (`tel`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  CONSTRAINT `officer_ibfk_1` FOREIGN KEY (`id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Request`
--

DROP TABLE IF EXISTS `Request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Request` (
  `barcode` int(11) NOT NULL AUTO_INCREMENT,
  `sId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `oId` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `documentId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `status` enum('Pending','Processing','Complete') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Pending',
  `requestDate` date DEFAULT NULL,
  `receiveDate` date DEFAULT NULL,
  PRIMARY KEY (`barcode`),
  KEY `request_ibfk_2` (`oId`),
  KEY `request_ibfk_3` (`documentId`),
  KEY `requestment_ibfk_1` (`sId`),
  CONSTRAINT `requestment_ibfk_1` FOREIGN KEY (`documentId`) REFERENCES `Document` (`documentId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `requestment_ibfk_2` FOREIGN KEY (`oId`) REFERENCES `Officer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `requestment_ibfk_3` FOREIGN KEY (`sId`) REFERENCES `Student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Room`
--

DROP TABLE IF EXISTS `Room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Room` (
  `roomId` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `buildingName` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `facultyId` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `floor` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `seat` int(11) DEFAULT NULL,
  PRIMARY KEY (`roomId`,`buildingName`),
  KEY `room_ibfk_1` (`facultyId`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`facultyId`) REFERENCES `Faculty` (`facultyId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RoomSchedule`
--

DROP TABLE IF EXISTS `RoomSchedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RoomSchedule` (
  `roomId` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `buildingName` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `courseId` char(7) COLLATE utf8_unicode_ci NOT NULL,
  `sectionNumber` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `year` year(4) NOT NULL,
  `semester` int(11) NOT NULL,
  `day` enum('Sun','Mon','Tue','Wed','Thur','Fri','Sat') COLLATE utf8_unicode_ci NOT NULL,
  `startTime` time NOT NULL,
  `period` float NOT NULL,
  PRIMARY KEY (`roomId`,`buildingName`,`day`,`startTime`,`courseId`,`sectionNumber`,`year`,`semester`),
  KEY `teachat_ibfk_2` (`courseId`,`sectionNumber`,`year`,`semester`),
  CONSTRAINT `teachat_bifk_2` FOREIGN KEY (`courseId`, `sectionNumber`, `year`, `semester`) REFERENCES `Class` (`courseId`, `sectionNumber`, `year`, `semester`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `teachat_ibfk_1` FOREIGN KEY (`roomId`, `buildingName`) REFERENCES `Room` (`roomId`, `buildingName`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Student`
--

DROP TABLE IF EXISTS `Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Student` (
  `id` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `ssn` varchar(13) COLLATE utf8_unicode_ci DEFAULT NULL,
  `firstName` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastName` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` enum('M','F') COLLATE utf8_unicode_ci DEFAULT NULL,
  `enrollYear` year(4) DEFAULT NULL,
  `status` enum('Studying','Graduated') COLLATE utf8_unicode_ci DEFAULT NULL,
  `tel` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `houseNumber` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `road` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `district` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `subDistrict` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `province` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `zipCode` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `facultyId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ssn_UNIQUE` (`ssn`),
  UNIQUE KEY `tel_UNIQUE` (`tel`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `student_ibfk_2` (`facultyId`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_ibfk_2` FOREIGN KEY (`facultyId`) REFERENCES `Faculty` (`facultyId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `StudentPayment`
--

DROP TABLE IF EXISTS `StudentPayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `StudentPayment` (
  `sId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `semester` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `year` year(4) NOT NULL,
  `paymentStatus` enum('Unpaid','Paid') COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`sId`,`semester`,`year`,`paymentStatus`),
  CONSTRAINT `studentpayment_ibfk_1` FOREIGN KEY (`sId`) REFERENCES `Student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Teach`
--

DROP TABLE IF EXISTS `Teach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Teach` (
  `tId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `courseId` char(7) COLLATE utf8_unicode_ci NOT NULL,
  `sectionNumber` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `year` year(4) NOT NULL,
  `semester` int(11) NOT NULL,
  PRIMARY KEY (`tId`,`courseId`,`sectionNumber`,`year`,`semester`),
  KEY `FK_Teach` (`courseId`,`sectionNumber`,`year`,`semester`),
  CONSTRAINT `teach_ibfk_1` FOREIGN KEY (`tId`) REFERENCES `Teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_ibfk_2` FOREIGN KEY (`courseId`, `sectionNumber`, `year`, `semester`) REFERENCES `Class` (`courseId`, `sectionNumber`, `year`, `semester`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Teacher`
--

DROP TABLE IF EXISTS `Teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Teacher` (
  `id` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `ssn` varchar(13) COLLATE utf8_unicode_ci DEFAULT NULL,
  `firstName` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastName` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` enum('F','M') COLLATE utf8_unicode_ci DEFAULT NULL,
  `tel` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `houseNumber` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `road` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `district` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `subDistrict` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `province` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `zipCode` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `code` char(3) COLLATE utf8_unicode_ci DEFAULT NULL,
  `facultyId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ssn_UNIQUE` (`ssn`),
  UNIQUE KEY `tel_UNIQUE` (`tel`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `teacher_ibfk_2` (`facultyId`),
  CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teacher_ibfk_2` FOREIGN KEY (`facultyId`) REFERENCES `Faculty` (`facultyId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `userType` enum('Teacher','Student','Officer') COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-28 11:34:53
