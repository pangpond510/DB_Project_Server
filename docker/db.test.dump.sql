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
  `tId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `sId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `year` year(4) DEFAULT NULL,
  PRIMARY KEY (`tId`,`sId`),
  KEY `advise_ibfk_2` (`sId`),
  CONSTRAINT `advise_ibfk_1` FOREIGN KEY (`tId`) REFERENCES `Teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `advise_ibfk_2` FOREIGN KEY (`sId`) REFERENCES `Student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Advise`
--

LOCK TABLES `Advise` WRITE;
/*!40000 ALTER TABLE `Advise` DISABLE KEYS */;
INSERT INTO `Advise` VALUES ('teacher','5831063821',2017);
/*!40000 ALTER TABLE `Advise` ENABLE KEYS */;
UNLOCK TABLES;

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
  CONSTRAINT `class_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `Course` (`courseId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Class`
--

LOCK TABLES `Class` WRITE;
/*!40000 ALTER TABLE `Class` DISABLE KEYS */;
INSERT INTO `Class` VALUES ('2110200','1',2016,1,40),('2110200','2',2016,1,40),('2110200','3',2016,1,40),('2110200','33',2016,1,40),('2110201','1',2016,1,40),('2110201','2',2016,1,40),('2110201','3',2016,1,40),('2110201','33',2016,1,40),('2110211','1',2016,1,40),('2110211','2',2016,1,40),('2110211','3',2016,1,40),('2110211','33',2016,1,40),('2110215','1',2016,2,30),('2110215','2',2016,2,30),('2110215','3',2016,2,40),('2110215','33',2016,2,40),('2110251','1',2016,2,30),('2110251','2',2016,2,30),('2110251','3',2016,2,40),('2110251','33',2016,2,40),('2110254','1',2016,2,30),('2110254','2',2016,2,30),('2110254','3',2016,2,40),('2110254','33',2016,2,40),('2110313','1',2017,1,35),('2110313','2',2017,1,35),('2110313','3',2017,1,40),('2110313','33',2017,1,40),('2110316','1',2017,1,35),('2110316','2',2017,1,35),('2110316','3',2017,1,40),('2110316','33',2017,1,40),('2110318','1',2017,1,35),('2110318','2',2017,1,35),('2110318','3',2017,1,40),('2110318','33',2017,1,40),('2110327','1',2017,2,30),('2110327','2',2017,2,30),('2110327','3',2017,2,40),('2110327','33',2017,2,40),('2110332','1',2017,2,30),('2110332','2',2017,2,30),('2110332','3',2017,2,40),('2110332','33',2017,2,40),('2110422','1',2017,2,30),('2110422','2',2017,2,30),('2110422','3',2017,2,40),('2110422','33',2017,2,40);
/*!40000 ALTER TABLE `Class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClassSchedule`
--

DROP TABLE IF EXISTS `ClassSchedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ClassSchedule` (
  `courseId` char(7) COLLATE utf8_unicode_ci NOT NULL,
  `sectionNumber` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `year` year(4) NOT NULL,
  `semester` int(11) NOT NULL,
  `day` enum('Sun','Mon','Tue','Wed','Thur','Fri','Sat') COLLATE utf8_unicode_ci NOT NULL,
  `startTime` time DEFAULT NULL,
  `period` float DEFAULT NULL,
  PRIMARY KEY (`courseId`,`sectionNumber`,`year`,`semester`),
  CONSTRAINT `FK_ClassSchedule` FOREIGN KEY (`courseId`, `sectionNumber`, `year`, `semester`) REFERENCES `Class` (`courseId`, `sectionNumber`, `year`, `semester`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `courseId` char(7) COLLATE utf8_unicode_ci NOT NULL,
  `courseName` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shortName` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `credit` int(11) DEFAULT NULL,
  PRIMARY KEY (`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Course`
--

LOCK TABLES `Course` WRITE;
/*!40000 ALTER TABLE `Course` DISABLE KEYS */;
INSERT INTO `Course` VALUES ('2110200','Discrete Structures','DISCRETE STRUC',3),('2110201','Computer Engineering Math','COM ENG MAT',3),('2110211','Data Structure','DATA STRUC',3),('2110215','Programming Methodology','PROG MET',3),('2110251','Digital Computer Logic','DIG COM LOG',3),('2110254','Digital Design ','DIG DESIGN',3),('2110313','Operating System','OS',3),('2110316','Programming Language','PROG LANG',3),('2110318','Distributed System','DIS SYS',3),('2110327','Algorithm Design','ALGO',3),('2110332','System Analysis','SYS ANA',3),('2110422','Database Management System ','DB MGT',3);
/*!40000 ALTER TABLE `Course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Document`
--

DROP TABLE IF EXISTS `Document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Document` (
  `documentId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `documentName` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `documentDescription` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`documentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Document`
--

LOCK TABLES `Document` WRITE;
/*!40000 ALTER TABLE `Document` DISABLE KEYS */;
INSERT INTO `Document` VALUES ('CR23','หนังสือรับรองความเป็นนิสิต',NULL),('CR24','หนังสือรับรองความประพฤติ',NULL),('CR25','Transcript','ใบประมวลผลการศึกษา');
/*!40000 ALTER TABLE `Document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Enroll`
--

DROP TABLE IF EXISTS `Enroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Enroll` (
  `sId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `courseId` char(7) COLLATE utf8_unicode_ci NOT NULL,
  `sectionNumber` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `year` year(4) NOT NULL,
  `semester` int(11) NOT NULL,
  `grade` float DEFAULT NULL,
  `status` enum('Accept','Reject','Waiting') COLLATE utf8_unicode_ci DEFAULT NULL,
  `enrollDate` date DEFAULT NULL,
  PRIMARY KEY (`courseId`,`sId`,`sectionNumber`,`year`,`semester`),
  KEY `FK_Student_idx` (`sId`),
  KEY `FK_Class` (`courseId`,`sectionNumber`,`year`,`semester`),
  CONSTRAINT `FK_Class` FOREIGN KEY (`courseId`, `sectionNumber`, `year`, `semester`) REFERENCES `Class` (`courseId`, `sectionNumber`, `year`, `semester`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_Student` FOREIGN KEY (`sId`) REFERENCES `Student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Enroll`
--

LOCK TABLES `Enroll` WRITE;
/*!40000 ALTER TABLE `Enroll` DISABLE KEYS */;
INSERT INTO `Enroll` VALUES ('5831063821','2110200','1',2016,1,2,NULL,NULL),('student','2110200','1',2016,1,2,NULL,NULL),('5831063821','2110201','1',2016,1,3,NULL,NULL),('5831063821','2110313','1',2017,1,4,NULL,NULL),('5831063821','2110327','1',2017,2,4,NULL,NULL),('5831063821','2110332','1',2017,2,4,NULL,NULL),('5831063821','2110422','1',2017,2,4,NULL,NULL),('student','2110422','1',2017,2,3,NULL,NULL);
/*!40000 ALTER TABLE `Enroll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Faculty`
--

DROP TABLE IF EXISTS `Faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Faculty` (
  `facultyId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `facultyName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tuitionFeeNormal` int(11) DEFAULT NULL,
  `tuitionFeeSummer` int(11) DEFAULT NULL,
  `gradeRequirment` float DEFAULT NULL,
  `creditRequirment` int(11) DEFAULT NULL,
  PRIMARY KEY (`facultyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Faculty`
--

LOCK TABLES `Faculty` WRITE;
/*!40000 ALTER TABLE `Faculty` DISABLE KEYS */;
INSERT INTO `Faculty` VALUES ('21','วิศวกรรมศาสตร์',21000,7000,2,144),('22','อักษรศาสตร์',18000,60000,2,140),('23','วิทยาศาสตร์',21000,7000,2,135);
/*!40000 ALTER TABLE `Faculty` ENABLE KEYS */;
UNLOCK TABLES;

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
  `department` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `officer_ibfk_1` FOREIGN KEY (`id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Officer`
--

LOCK TABLES `Officer` WRITE;
/*!40000 ALTER TABLE `Officer` DISABLE KEYS */;
INSERT INTO `Officer` VALUES ('officer',NULL,'Defualt',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Officer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Request`
--

DROP TABLE IF EXISTS `Request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Request` (
  `sId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `oId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `documentId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `barcode` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `requestDate` date DEFAULT NULL,
  `status` enum('Pending','Processing','Complete') COLLATE utf8_unicode_ci DEFAULT 'Pending',
  PRIMARY KEY (`sId`,`oId`,`documentId`),
  UNIQUE KEY `Barcode_UNIQUE` (`barcode`),
  KEY `request_ibfk_2` (`oId`),
  KEY `request_ibfk_3` (`documentId`),
  CONSTRAINT `request_ibfk_1` FOREIGN KEY (`sId`) REFERENCES `Student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `request_ibfk_2` FOREIGN KEY (`oId`) REFERENCES `Officer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `request_ibfk_3` FOREIGN KEY (`documentId`) REFERENCES `Document` (`documentId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Request`
--

LOCK TABLES `Request` WRITE;
/*!40000 ALTER TABLE `Request` DISABLE KEYS */;
INSERT INTO `Request` VALUES ('5831063821','officer','CR25','0000000001','2017-08-31','Pending'),('student','officer','CR24','0000000002','2017-08-31','Pending');
/*!40000 ALTER TABLE `Request` ENABLE KEYS */;
UNLOCK TABLES;

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
  `facultyId` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_ibfk_2` (`facultyId`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_ibfk_2` FOREIGN KEY (`facultyId`) REFERENCES `Faculty` (`facultyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student`
--

LOCK TABLES `Student` WRITE;
/*!40000 ALTER TABLE `Student` DISABLE KEYS */;
INSERT INTO `Student` VALUES ('5831063821','1619900273993','สมชาย','ศรีสุข',NULL,NULL,NULL,'0634362323','somchai@gmail.com','323','พญาไท','ปทุมวัน','วังใหม่','อุทัยธานี','61140','21'),('student','1590300012563','สมหญิง','บุญมี',NULL,NULL,NULL,'0934563222','somying@hotmail.com','23','สุขขี','ลาดพร้าว','ธารา','กรุงเทพ','10310','22');
/*!40000 ALTER TABLE `Student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StudentPayment`
--

DROP TABLE IF EXISTS `StudentPayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `StudentPayment` (
  `sId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `semester` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `year` year(4) DEFAULT NULL,
  `paymentStatus` enum('Unpaid','Paid') COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`sId`),
  CONSTRAINT `studentpayment_ibfk_1` FOREIGN KEY (`sId`) REFERENCES `Student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `tId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `courseId` char(7) COLLATE utf8_unicode_ci NOT NULL,
  `sectionNumber` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `year` year(4) NOT NULL,
  `semester` int(11) NOT NULL,
  PRIMARY KEY (`tId`,`courseId`,`sectionNumber`,`year`,`semester`),
  KEY `FK_Teach` (`courseId`,`sectionNumber`,`year`,`semester`),
  CONSTRAINT `teach_ibfk_1` FOREIGN KEY (`tId`) REFERENCES `Teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_ibfk_2` FOREIGN KEY (`courseId`, `sectionNumber`, `year`, `semester`) REFERENCES `Class` (`courseId`, `sectionNumber`, `year`, `semester`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `roomId` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `courseId` char(7) COLLATE utf8_unicode_ci NOT NULL,
  `sectionNumber` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `year` year(4) NOT NULL,
  `semester` int(11) NOT NULL,
  PRIMARY KEY (`roomId`,`courseId`,`sectionNumber`,`year`,`semester`),
  KEY `teachat_ibfk_2` (`courseId`,`sectionNumber`,`year`,`semester`),
  CONSTRAINT `teachat_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `Room` (`roomId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teachat_ibfk_2` FOREIGN KEY (`courseId`, `sectionNumber`, `year`, `semester`) REFERENCES `Class` (`courseId`, `sectionNumber`, `year`, `semester`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `facultyId` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `teacher_ibfk_2` (`facultyId`),
  CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teacher_ibfk_2` FOREIGN KEY (`facultyId`) REFERENCES `Faculty` (`facultyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teacher`
--

LOCK TABLES `Teacher` WRITE;
/*!40000 ALTER TABLE `Teacher` DISABLE KEYS */;
INSERT INTO `Teacher` VALUES ('teacher','1234567890111','นนทวี','สายปัญญา','M','0900000000','pond@gmail.com','123','fern','eer','kbtg','bkk',NULL,'NWS','21');
/*!40000 ALTER TABLE `Teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `userType` enum('Teacher','Student','Officer') COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('5831060921','1111111','Student'),('5831063821','12345678','Student'),('officer','officer','Officer'),('student','student','Student'),('teacher','teacher','Teacher');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-19 18:37:45
