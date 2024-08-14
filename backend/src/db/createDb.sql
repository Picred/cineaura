-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: cineaura
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `films`
--

DROP TABLE IF EXISTS `films`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `films` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `release_year` year NOT NULL,
  `duration` int NOT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `description` text,
  `cast` varchar(255) DEFAULT NULL,
  `rating` decimal(3,1) DEFAULT NULL,
  `img` varchar(255) DEFAULT 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*AC9frN1qFnn-I2JCycN8fw.png',
  `coverImg` varchar(255) DEFAULT 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*AC9frN1qFnn-I2JCycN8fw.png',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `films`
--

LOCK TABLES `films` WRITE;
/*!40000 ALTER TABLE `films` DISABLE KEYS */;
INSERT INTO `films` VALUES (53,'Twisters',2024,123,'Action, Adventure, Drama','As storm season intensifies, the paths of former storm chaser Kate Carter and reckless social-media superstar Tyler Owens collide when terrifying phenomena never seen before are unleashed. The pair and their competing teams find themselves squarely in the paths of multiple storm systems converging over central Oklahoma in the fight of their lives.','Michael Crichton, Lee Isaac Chung, Anne-Marie Martin',7.1,'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg','https://image.tmdb.org/t/p/original/58D6ZAvOKxlHjyX9S8qNKSBE9Y.jpg','2024-08-14 16:24:14'),(54,'Fly Me to the Moon - Le due facce della Luna',2024,132,'Romance, Commedy','Sparks fly in all directions as marketing maven Kelly Jones, brought in to fix NASA\'s public image, wreaks havoc on Apollo 11 launch director Cole Davis\' already difficult task of putting a man on the moon. When the White House deems the mission too important to fail, Jones is directed to stage a fake moon landing as backup, and the countdown truly begins.','Greg Berlanti,  Rose Gilroy, Bill Kirstein',7.0,'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lb0XDH6LbkYwzbHTqjsUNZTLXMS.jpg','https://image.tmdb.org/t/p/original/8xMR5w9qfpwhTJzjjvfj2ywvIF3.jpg','2024-08-14 16:26:29'),(55,'Alien: Romulus',2024,119,'Science Fiction, Horror, Thriller','While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.','Fede Álvarez, Dan O\'Bannon, Ronald Shusett',7.8,'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg','https://image.tmdb.org/t/p/original/iYqSQaWDttQIQzsxg9xHyg0bttG.jpg','2024-08-14 16:28:06'),(56,'The Instigators ',2024,101,'Action, Comedy, Crime','Rory and Cobby are unlikely partners thrown together for a heist. But when it goes awry, they team up to outrun police, backward bureaucrats, and a vengeful crime boss.','Doug Liman, Casey Affleck, Chuck MacLean',6.5,'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pIz9csYn1yjrzQi0BuBZNJrTMi0.jpg','https://image.tmdb.org/t/p/original/qnVXjkk7FCkXzC6zgWpvUOfebg4.jpg','2024-08-14 16:29:23'),(57,'Watchmen: Chapter I',2024,84,'Animation, Mystery, Science Fiction, Action','In 1985, the murder of a government-sponsored superhero draws his outlawed colleagues out of retirement and into a mystery that threatens to upend their personal lives and the world itself.','Brandon Vietti, J. Michael Straczynski',8.3,'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tE2vZ6HdlmKaBh0wpsvHCf7HJKo.jpg','https://image.tmdb.org/t/p/original/4cazJU7Jjb5EukxmT7XRCoO9VnV.jpg','2024-08-14 16:30:25'),(59,'Deadpool',2016,108,'Action, Adventure, Comedy','The origin story of former Special Forces operative turned mercenary Wade Wilson, who, after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.','Tim Miller, Rhett Reese, Paul Wernick',7.6,'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3E53WEZJqP6aM84D8CckXx4pIHw.jpg','https://image.tmdb.org/t/p/original/en971MEXui9diirXlogOrPKmsEn.jpg','2024-08-14 16:47:02'),(60,'One Minute Time Machine',2014,1,'Mystery, Comedy, Romance','Every time the beautiful Regina rejects his advances, James pushes a red button and tries again, all the while unaware of the reality and consequences of his actions.','Devon Avery, Sean Crouch',7.3,'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/2JQUM8bNjGFlwilokqmZ0AvvsY4.jpg','https://image.tmdb.org/t/p/original/qiewTS30GsKTFXKTL55soJYuLh4.jpg','2024-08-14 17:10:33');
/*!40000 ALTER TABLE `films` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `film_id` int NOT NULL,
  `schedule_datetime` datetime NOT NULL,
  `capacity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `film_id` (`film_id`),
  CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `films` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `film_id` int NOT NULL,
  `schedule_id` int NOT NULL,
  `purchase_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `seat_number` varchar(10) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `film_id` (`film_id`),
  KEY `schedule_id` (`schedule_id`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`film_id`) REFERENCES `films` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tickets_ibfk_3` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin',1),(2,'user','user',0);
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

-- Dump completed on 2024-08-14 20:14:35
