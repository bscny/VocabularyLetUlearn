create database vocab_let_u_learn;
use vocab_let_u_learn;

-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: vocab_let_u_learn
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `current_room`
--

DROP TABLE IF EXISTS `current_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `current_room` (
  `ROOM_ID` int NOT NULL,
  `Pass_word` int NOT NULL,
  PRIMARY KEY (`ROOM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `current_room`
--

LOCK TABLES `current_room` WRITE;
/*!40000 ALTER TABLE `current_room` DISABLE KEYS */;
/*!40000 ALTER TABLE `current_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `folders`
--

DROP TABLE IF EXISTS `folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `folders` (
  `FOLDER_ID` int NOT NULL AUTO_INCREMENT,
  `Folder_name` varchar(50) NOT NULL,
  `Owner_id` int NOT NULL,
  PRIMARY KEY (`FOLDER_ID`),
  KEY `fk_OwnerId_UserId_Folders` (`Owner_id`),
  CONSTRAINT `fk_OwnerId_UserId_Folders` FOREIGN KEY (`Owner_id`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `folders`
--

LOCK TABLES `folders` WRITE;
/*!40000 ALTER TABLE `folders` DISABLE KEYS */;
/*!40000 ALTER TABLE `folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend` (
  `USER_ID` int NOT NULL,
  `FRIEND_ID` int NOT NULL,
  PRIMARY KEY (`USER_ID`,`FRIEND_ID`),
  KEY `fk_FriendId_UsrId_Friend` (`FRIEND_ID`),
  CONSTRAINT `fk_FriendId_UsrId_Friend` FOREIGN KEY (`FRIEND_ID`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE,
  CONSTRAINT `fk_UsrId_UsrId_Friend` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history_answer`
--

DROP TABLE IF EXISTS `history_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history_answer` (
  `USER_ID` int NOT NULL,
  `QUESTION_ID` int NOT NULL,
  `Is_correct` tinyint(1) NOT NULL,
  PRIMARY KEY (`USER_ID`,`QUESTION_ID`),
  KEY `fk_QId_QId_HistoryAnswer` (`QUESTION_ID`),
  CONSTRAINT `fk_QId_QId_HistoryAnswer` FOREIGN KEY (`QUESTION_ID`) REFERENCES `question` (`QUESTION_ID`) ON DELETE CASCADE,
  CONSTRAINT `fk_UsrId_UsrId_HistoryAnswer` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history_answer`
--

LOCK TABLES `history_answer` WRITE;
/*!40000 ALTER TABLE `history_answer` DISABLE KEYS */;
/*!40000 ALTER TABLE `history_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `QUESTION_ID` int NOT NULL AUTO_INCREMENT,
  `Correct_ans` varchar(50) NOT NULL,
  `OptionA` varchar(50) NOT NULL,
  `OptionB` varchar(50) NOT NULL,
  `OptionC` varchar(50) NOT NULL,
  `Ans_definition` varchar(100) NOT NULL,
  `Sentence` varchar(100) NOT NULL,
  PRIMARY KEY (`QUESTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_in_exam`
--

DROP TABLE IF EXISTS `question_in_exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_in_exam` (
  `EXAM_ID` int NOT NULL,
  `QUESTION_ID` int NOT NULL,
  PRIMARY KEY (`EXAM_ID`,`QUESTION_ID`),
  KEY `fk_QId_QId_QuestionInExam` (`QUESTION_ID`),
  CONSTRAINT `fk_ExamId_ExamId_QuestionInExam` FOREIGN KEY (`EXAM_ID`) REFERENCES `ranking_exam` (`EXAM_ID`) ON DELETE CASCADE,
  CONSTRAINT `fk_QId_QId_QuestionInExam` FOREIGN KEY (`QUESTION_ID`) REFERENCES `question` (`QUESTION_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_in_exam`
--

LOCK TABLES `question_in_exam` WRITE;
/*!40000 ALTER TABLE `question_in_exam` DISABLE KEYS */;
/*!40000 ALTER TABLE `question_in_exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ranking_exam`
--

DROP TABLE IF EXISTS `ranking_exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranking_exam` (
  `EXAM_ID` int NOT NULL AUTO_INCREMENT,
  `Create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`EXAM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranking_exam`
--

LOCK TABLES `ranking_exam` WRITE;
/*!40000 ALTER TABLE `ranking_exam` DISABLE KEYS */;
/*!40000 ALTER TABLE `ranking_exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sets`
--

DROP TABLE IF EXISTS `sets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sets` (
  `SET_ID` int NOT NULL AUTO_INCREMENT,
  `SET_name` varchar(50) NOT NULL,
  `Is_public` tinyint(1) NOT NULL DEFAULT '1',
  `In_folder_id` int NOT NULL,
  PRIMARY KEY (`SET_ID`),
  KEY `fk_InFolder_FolderId_Sets` (`In_folder_id`),
  CONSTRAINT `fk_InFolder_FolderId_Sets` FOREIGN KEY (`In_folder_id`) REFERENCES `folders` (`FOLDER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sets`
--

LOCK TABLES `sets` WRITE;
/*!40000 ALTER TABLE `sets` DISABLE KEYS */;
/*!40000 ALTER TABLE `sets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `take_exam`
--

DROP TABLE IF EXISTS `take_exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `take_exam` (
  `USER_ID` int NOT NULL,
  `EXAM_ID` int NOT NULL,
  `Plus_points` int NOT NULL,
  PRIMARY KEY (`USER_ID`,`EXAM_ID`),
  KEY `fk_ExamId_ExamId_TakeExam` (`EXAM_ID`),
  CONSTRAINT `fk_ExamId_ExamId_TakeExam` FOREIGN KEY (`EXAM_ID`) REFERENCES `ranking_exam` (`EXAM_ID`) ON DELETE CASCADE,
  CONSTRAINT `fk_UsrId_UsrId_TakeExam` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `take_exam`
--

LOCK TABLES `take_exam` WRITE;
/*!40000 ALTER TABLE `take_exam` DISABLE KEYS */;
/*!40000 ALTER TABLE `take_exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `use_set_in_room`
--

DROP TABLE IF EXISTS `use_set_in_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `use_set_in_room` (
  `SET_ID` int NOT NULL,
  `ROOM_ID` int NOT NULL,
  PRIMARY KEY (`SET_ID`,`ROOM_ID`),
  KEY `fk_RoomId_RoomId_UseSetInRoom` (`ROOM_ID`),
  CONSTRAINT `fk_RoomId_RoomId_UseSetInRoom` FOREIGN KEY (`ROOM_ID`) REFERENCES `current_room` (`ROOM_ID`) ON DELETE CASCADE,
  CONSTRAINT `fk_SetId_SetId_UseSetInRoom` FOREIGN KEY (`SET_ID`) REFERENCES `sets` (`SET_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `use_set_in_room`
--

LOCK TABLES `use_set_in_room` WRITE;
/*!40000 ALTER TABLE `use_set_in_room` DISABLE KEYS */;
/*!40000 ALTER TABLE `use_set_in_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `USER_ID` int NOT NULL AUTO_INCREMENT,
  `User_name` varchar(30) NOT NULL,
  `Email` char(50) NOT NULL,
  `Pass_word` char(30) NOT NULL,
  `Ranking_points` int NOT NULL DEFAULT '0',
  `Last_login` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Current_room_id` int DEFAULT NULL,
  PRIMARY KEY (`USER_ID`),
  KEY `fk_CurrentRoom_RoomId_Users` (`Current_room_id`),
  CONSTRAINT `fk_CurrentRoom_RoomId_Users` FOREIGN KEY (`Current_room_id`) REFERENCES `current_room` (`ROOM_ID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vocabulary`
--

DROP TABLE IF EXISTS `vocabulary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vocabulary` (
  `SET_ID` int NOT NULL,
  `WORD` varchar(50) NOT NULL,
  `Definitions` varchar(100) NOT NULL,
  `Sentence` varchar(100) DEFAULT NULL,
  `Create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Is_marked` tinyint(1) NOT NULL DEFAULT '0',
  `Num_test` int NOT NULL DEFAULT '0',
  `Num_wrong` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`SET_ID`,`WORD`),
  CONSTRAINT `fk_SetId_SetId_Vocabulary` FOREIGN KEY (`SET_ID`) REFERENCES `sets` (`SET_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vocabulary`
--

LOCK TABLES `vocabulary` WRITE;
/*!40000 ALTER TABLE `vocabulary` DISABLE KEYS */;
/*!40000 ALTER TABLE `vocabulary` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-30 20:02:33
