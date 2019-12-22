-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: mysql-db
-- ------------------------------------------------------
-- Server version	8.0.18

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
  `firstname` varchar(20) DEFAULT NULL,
  `lastname` varchar(20) DEFAULT NULL,
  `username` varchar(60) NOT NULL,
  `password` blob,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci KEY_BLOCK_SIZE=2 COMMENT='user info';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('American','Bear','abear',_binary ';x\�#�\n�\�Ud���s\�'),('asd','asd','asd',_binary '\0$р�O\�\�\�\�<[�'),('Cool','Bear','cbear',_binary ';x\�#�\n�\�Ud���s\�'),('Cool','Goblin','cgoblin',_binary ';x\�#�\n�\�Ud���s\�'),('Gummy','Goat','ggoat',_binary ';x\�#�\n�\�Ud���s\�'),('Gummy','Hacker','ghacker',_binary ';x\�#�\n�\�Ud���s\�'),('groot','greet','groot',_binary '\n\�J�r�\r�H\�\�x\�\�z'),('Great','Vegan','gvegan',_binary ';x\�#�\n�\�Ud���s\�'),('naravich','chutisilp','icekang',_binary 'password'),('n','n','icekang1',_binary ';x\�#�\n�\�Ud���s\�'),('Sarisa','Thongrit','imm',_binary '\�T\�\�2\�)+\���bN)��'),('Sarisa','Thongrit','imm1',_binary 'I<RZ\�s\r>2\�F\�P'),('asd','asd','imm3',_binary '\0$р�O\�\�\�\�<[�'),('Masked','Quickscoper','mquickscoper',_binary ';x\�#�\n�\�Ud���s\�'),('Mlg','Vegan','mvegan',_binary ';x\�#�\n�\�Ud���s\�'),('Retarded','Carrot','rcarrot',_binary ';x\�#�\n�\�Ud���s\�'),('Rich','Vegan','rvegan',_binary ';x\�#�\n�\�Ud���s\�'),('Sarisa','Imm','sarisa',_binary ';x\�#�\n�\�Ud���s\�'),('Shy','Carrot','scarrot',_binary ';x\�#�\n�\�Ud���s\�'),('Super','Goblin','sgoblin',_binary ';x\�#�\n�\�Ud���s\�'),('Super','Programmer','sprogrammer',_binary ';x\�#�\n�\�Ud���s\�'),('Unusual','Horse','uhorse',_binary ';x\�#�\n�\�Ud���s\�'),('Vegan','Carrot','vcarrot',_binary ';x\�#�\n�\�Ud���s\�'),('Yummy','Coder','ycoder',_binary ';x\�#�\n�\�Ud���s\�');
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

-- Dump completed on 2019-12-22 17:30:10
