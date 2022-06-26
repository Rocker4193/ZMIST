-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: zmist
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

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
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `job_id` int NOT NULL,
  `salary` decimal(15,2) NOT NULL,
  `login` varchar(25) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (3,'Василь','Тьоркін','1984-12-01','0994522547','2022-05-01',NULL,7,200000.00,'admin','$2b$10$kKhkmoPbJYBzcoApOxT6Eu2vUAR7VOqRlNoj23zrVvVOTp7qLKb5e'),(4,'Володимр','Савченко','1999-01-11','0502584568','2022-06-26',NULL,4,50000.00,'volodimir','$2b$10$1.4v6kIyur/riavW.qeREeT/exsCPOOM9N6MS5xIQREwTW4NZa5ca'),(5,'Павло','Савченок','1997-12-02','0662487910','2022-06-26',NULL,2,15000.00,'paha','$2b$10$i0d.H.Iz1CKDUQBR609Kfe59Ejza37zwLekKUMwg/vFGims1QikG2'),(6,'Олександр','Ковпак','2001-02-24','0675485945','2022-06-26',NULL,5,20000.00,'kovpak','$2b$10$/48.RKt0/aZUtJc.akq1Ue3CAgkS4LTVoEa39vd2uCe/FMtlogp/.'),(7,'Александра','Соня','1997-12-05','0507984521','2022-06-26',NULL,6,25000.00,'sonya','$2b$10$HmG3dM7sfB.Sa8SuscBfau8ZeshjD9SoHDkHij.hCs0GcPt8TKLPy');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees_shifts`
--

DROP TABLE IF EXISTS `employees_shifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees_shifts` (
  `id_employee` int NOT NULL,
  `id_shift` int NOT NULL,
  PRIMARY KEY (`id_employee`,`id_shift`),
  KEY `id_shift` (`id_shift`),
  CONSTRAINT `employees_shifts_ibfk_1` FOREIGN KEY (`id_employee`) REFERENCES `employees` (`id`),
  CONSTRAINT `employees_shifts_ibfk_2` FOREIGN KEY (`id_shift`) REFERENCES `shifts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees_shifts`
--

LOCK TABLES `employees_shifts` WRITE;
/*!40000 ALTER TABLE `employees_shifts` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees_shifts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_name` varchar(40) NOT NULL,
  `order_perm` enum('forbidden','read_only_self','read','edit') NOT NULL,
  `products_perm` enum('forbidden','read_only_self','read','edit') NOT NULL,
  `storage_perm` enum('forbidden','read_only_self','read','edit') NOT NULL,
  `shifts_perm` enum('forbidden','read_only_self','read','edit') NOT NULL,
  `jobs_perm` enum('forbidden','read_only_self','read','edit') NOT NULL,
  `tables_perm` enum('forbidden','read_only_self','read','edit') NOT NULL,
  `employees_perm` enum('forbidden','read_only_self','read','edit') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (2,'Офіціант','edit','edit','edit','edit','edit','edit','edit'),(3,'Повар','edit','edit','edit','edit','edit','edit','edit'),(4,'Адміністратор','edit','edit','edit','edit','edit','edit','edit'),(5,'Кальянний-майстер','edit','edit','edit','edit','edit','edit','edit'),(6,'Бармен','edit','edit','edit','edit','edit','edit','edit'),(7,'Директор','edit','edit','edit','edit','edit','edit','edit');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (6,17,1),(6,20,1),(6,23,5),(6,25,2),(6,26,2),(7,17,1),(7,20,1),(7,23,5),(7,25,2),(7,26,2),(8,17,1),(8,20,1),(8,23,5),(8,25,2),(8,26,2),(9,17,1),(9,20,1),(9,23,5),(9,25,2),(9,26,2),(10,17,1),(10,20,1),(10,23,5),(10,25,2),(10,26,2),(11,17,1),(11,20,1),(11,23,5),(11,25,2),(11,26,2),(12,17,1),(12,20,1),(12,23,5),(12,25,2),(12,26,2),(13,25,1),(14,25,1),(15,15,3),(15,16,4),(15,17,1),(15,18,4),(15,20,2),(15,23,3),(15,25,1),(15,26,1),(15,32,4),(16,18,1),(16,24,1),(17,15,1),(17,16,1),(17,17,1),(17,18,1),(17,20,1),(17,21,1),(17,23,1),(17,25,1),(17,26,1),(17,27,1),(17,28,1),(17,29,1),(17,32,1);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_employee` int NOT NULL,
  `order_time` timestamp NOT NULL,
  `total` decimal(15,2) NOT NULL,
  `is_closed` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_employee` (`id_employee`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_employee`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (6,3,'2022-06-26 11:04:16',7000.00,1),(7,4,'2022-06-26 11:04:17',7000.00,1),(8,5,'2022-06-26 11:04:42',7000.00,1),(9,6,'2022-06-26 11:04:43',7000.00,1),(10,7,'2022-06-26 11:04:43',7000.00,1),(11,4,'2022-06-26 11:04:43',7000.00,1),(12,5,'2022-06-26 11:04:44',7000.00,1),(13,6,'2022-06-26 11:07:05',250.00,1),(14,7,'2022-06-26 11:18:21',250.00,1),(15,5,'2022-06-26 11:19:28',9292.00,1),(16,3,'2022-06-26 11:19:45',350.00,1),(17,3,'2022-06-26 11:40:30',7620.00,0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_ingridients`
--

DROP TABLE IF EXISTS `product_ingridients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_ingridients` (
  `product_id` int NOT NULL,
  `ingridient_id` int NOT NULL,
  `required_quantity` int NOT NULL DEFAULT '1',
  `measure` enum('shtukas','kilograms') NOT NULL,
  PRIMARY KEY (`product_id`,`ingridient_id`),
  KEY `ingridient_id` (`ingridient_id`),
  CONSTRAINT `product_ingridients_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `product_ingridients_ibfk_2` FOREIGN KEY (`ingridient_id`) REFERENCES `storage` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_ingridients`
--

LOCK TABLES `product_ingridients` WRITE;
/*!40000 ALTER TABLE `product_ingridients` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_ingridients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (12,'ТАБАК ТАНЖИРС (CША)',580.00),(13,'ТАБАК МЕДЖИК СМОУК ',520.00),(14,'ТЕРМИНАТОР',4600.00),(15,'Пиво Корона',48.00),(16,'Пиво Чернігівське',62.00),(17,'Горілка Прайм',5000.00),(18,'Овочева тарілка',150.00),(19,'Сирна тарілка',220.00),(20,'Грецький салат',150.00),(21,'Ніжний салат',200.00),(22,'Суп курячий',120.00),(23,'Крем суп',150.00),(24,'Хачапурі',200.00),(25,'Гамбургер',250.00),(26,'Гамбургер Блек',300.00),(27,'Піца Чотири Сира',260.00),(28,'Піца Страсть',300.00),(29,'Піца Океан',250.00),(30,'Такос',170.00),(31,'Свинячі вушки',180.00),(32,'Паста болоньєзе',500.00);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shifts`
--

DROP TABLE IF EXISTS `shifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shifts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shifts`
--

LOCK TABLES `shifts` WRITE;
/*!40000 ALTER TABLE `shifts` DISABLE KEYS */;
/*!40000 ALTER TABLE `shifts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage`
--

DROP TABLE IF EXISTS `storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(50) NOT NULL,
  `bought_price` decimal(15,2) NOT NULL,
  `availiable_quantity` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage`
--

LOCK TABLES `storage` WRITE;
/*!40000 ALTER TABLE `storage` DISABLE KEYS */;
INSERT INTO `storage` VALUES (3,'Кальяни',50000.00,50),(4,'Тарілки',5000.00,100),(5,'Бокали',3000.00,100),(6,'Стакани',5000.00,150),(7,'Помідори (Херсонські)',100000.00,100),(8,'Огірки (Богодухів)',500000.00,100),(9,'Яблука (Зелені)',1000.00,100),(10,'Яловичина',5000.00,25),(11,'Курятина',5000.00,40),(12,'Свинина',5000.00,30),(13,'Листя салату',1000.00,50);
/*!40000 ALTER TABLE `storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `table_reservations`
--

DROP TABLE IF EXISTS `table_reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `table_reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `table_id` int NOT NULL,
  `reservation_datetime` datetime NOT NULL,
  `reservation_name` varchar(40) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `table_id` (`table_id`),
  CONSTRAINT `table_reservations_ibfk_1` FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table_reservations`
--

LOCK TABLES `table_reservations` WRITE;
/*!40000 ALTER TABLE `table_reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `table_reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tables`
--

DROP TABLE IF EXISTS `tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seat_count` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tables`
--

LOCK TABLES `tables` WRITE;
/*!40000 ALTER TABLE `tables` DISABLE KEYS */;
INSERT INTO `tables` VALUES (7,5),(8,4),(9,3),(10,2),(11,1),(12,8),(13,10),(14,17);
/*!40000 ALTER TABLE `tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tables_orders`
--

DROP TABLE IF EXISTS `tables_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tables_orders` (
  `table_id` int NOT NULL,
  `order_id` int NOT NULL,
  PRIMARY KEY (`order_id`,`table_id`),
  KEY `table_id` (`table_id`),
  CONSTRAINT `tables_orders_ibfk_1` FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`),
  CONSTRAINT `tables_orders_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tables_orders`
--

LOCK TABLES `tables_orders` WRITE;
/*!40000 ALTER TABLE `tables_orders` DISABLE KEYS */;
INSERT INTO `tables_orders` VALUES (7,13),(8,8),(9,11),(10,17),(11,6),(11,10),(11,14),(12,9),(12,15),(13,7),(13,12),(13,16);
/*!40000 ALTER TABLE `tables_orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-26 14:48:58
