CREATE DATABASE  IF NOT EXISTS `colegio_control_bullying` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `colegio_control_bullying`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: colegio_control_bullying
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$1000000$mLs3KBnAfbJnGvcZtLC5oL$Fopd6l/fEyqKTBCRpSH/CfpoFmy18ImckI6QEvrz3S4=','2025-12-04 20:05:45.023899',1,'admin','','','',1,1,'2025-12-04 20:04:33.088321');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat_categoria_rol`
--

DROP TABLE IF EXISTS `cat_categoria_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat_categoria_rol` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_baja` date DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat_categoria_rol`
--

LOCK TABLES `cat_categoria_rol` WRITE;
/*!40000 ALTER TABLE `cat_categoria_rol` DISABLE KEYS */;
INSERT INTO `cat_categoria_rol` VALUES (1,'Usuarios Internos','Personal del colegio',1,'2025-12-04 19:00:45','2025-12-04 19:00:45',NULL),(2,'Usuarios Externos','Apoderados',1,'2025-12-04 19:00:45','2025-12-04 19:00:45',NULL);
/*!40000 ALTER TABLE `cat_categoria_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat_estado_matricula`
--

DROP TABLE IF EXISTS `cat_estado_matricula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat_estado_matricula` (
  `id_estado_matricula` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_baja` date DEFAULT NULL,
  PRIMARY KEY (`id_estado_matricula`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat_estado_matricula`
--

LOCK TABLES `cat_estado_matricula` WRITE;
/*!40000 ALTER TABLE `cat_estado_matricula` DISABLE KEYS */;
INSERT INTO `cat_estado_matricula` VALUES (1,'Vigente','Alumno con matrícula activa',1,'2025-12-04 19:06:11','2025-12-04 19:06:11',NULL),(2,'Retirado','Alumno retirado del establecimiento',1,'2025-12-04 19:06:11','2025-12-04 19:06:11',NULL),(3,'Suspendido','Alumno con suspensión temporal',1,'2025-12-04 19:06:11','2025-12-04 19:06:11',NULL);
/*!40000 ALTER TABLE `cat_estado_matricula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat_jornada`
--

DROP TABLE IF EXISTS `cat_jornada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat_jornada` (
  `id_jornada` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_baja` date DEFAULT NULL,
  PRIMARY KEY (`id_jornada`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat_jornada`
--

LOCK TABLES `cat_jornada` WRITE;
/*!40000 ALTER TABLE `cat_jornada` DISABLE KEYS */;
INSERT INTO `cat_jornada` VALUES (1,'Mañana','Jornada AM',1,'2025-12-04 19:00:45','2025-12-04 19:00:45',NULL),(2,'Tarde','Jornada PM',1,'2025-12-04 19:00:45','2025-12-04 19:00:45',NULL),(3,'Vespertina','Jornada vespertina',1,'2025-12-04 19:00:45','2025-12-04 19:00:45',NULL),(4,'Completa','Jornada completa',1,'2025-12-04 19:00:45','2025-12-04 19:00:45',NULL);
/*!40000 ALTER TABLE `cat_jornada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colegio`
--

DROP TABLE IF EXISTS `colegio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colegio` (
  `id_colegio` int NOT NULL AUTO_INCREMENT,
  `rbd` varchar(10) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `comuna` varchar(100) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `dependencia` varchar(30) DEFAULT NULL,
  `sostenedor` varchar(120) DEFAULT NULL,
  `email_contacto` varchar(150) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_baja` date DEFAULT NULL,
  PRIMARY KEY (`id_colegio`),
  UNIQUE KEY `rbd` (`rbd`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colegio`
--

LOCK TABLES `colegio` WRITE;
/*!40000 ALTER TABLE `colegio` DISABLE KEYS */;
INSERT INTO `colegio` VALUES (1,'12345','Colegio Demo Antibullying','Av. Principal 123','Santiago','RM','Particular Subvencionado','Fundación Educativa Demo','contacto@demo.cl','22223333',1,'2025-12-04 19:00:45','2025-12-04 19:00:45',NULL),(2,'10001','Colegio Azul','Av. Principal 123','Santiago','RM','Particular Subvencionado','Fundación Azul','contacto@azul.cl','221234567',1,'2025-12-11 14:28:57','2025-12-11 14:28:57',NULL),(3,'10002','Colegio Los Alerces','Los Alerces 45','La Serena','Coquimbo','Municipal','DAEM','info@alerc.es','512345678',1,'2025-12-11 14:28:57','2025-12-11 14:28:57',NULL),(4,'10003','Colegio Vista Hermosa','Vista Hermosa 999','Valparaíso','Valparaíso','Particular Pagado','Fundación Vista','contacto@vista.cl','322345678',1,'2025-12-11 14:28:57','2025-12-11 14:28:57',NULL);
/*!40000 ALTER TABLE `colegio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso` (
  `id_curso` int NOT NULL AUTO_INCREMENT,
  `id_colegio` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `nivel` varchar(20) NOT NULL,
  `anio` int NOT NULL,
  `id_jornada` int NOT NULL,
  `id_profesor_jefe` int NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_baja` date DEFAULT NULL,
  PRIMARY KEY (`id_curso`),
  UNIQUE KEY `uq_curso` (`id_colegio`,`nombre`,`nivel`,`anio`),
  KEY `fk_curso_jornada` (`id_jornada`),
  KEY `fk_curso_profesor` (`id_profesor_jefe`),
  CONSTRAINT `fk_curso_colegio` FOREIGN KEY (`id_colegio`) REFERENCES `colegio` (`id_colegio`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_curso_jornada` FOREIGN KEY (`id_jornada`) REFERENCES `cat_jornada` (`id_jornada`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_curso_profesor` FOREIGN KEY (`id_profesor_jefe`) REFERENCES `persona` (`id_persona`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (1,1,'1° Básico A','1B',2025,1,2,1,'2025-12-04 19:00:46','2025-12-04 19:00:46',NULL),(2,1,'1° Básico B','1B',2025,1,3,1,'2025-12-04 19:00:46','2025-12-04 19:00:46',NULL);
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(7,'convivencia_escolar','catcategoriarol'),(8,'convivencia_escolar','catestadomatricula'),(9,'convivencia_escolar','catjornada'),(10,'convivencia_escolar','colegio'),(11,'convivencia_escolar','curso'),(12,'convivencia_escolar','persona'),(13,'convivencia_escolar','rolpersona'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-11-19 18:40:20.181277'),(2,'auth','0001_initial','2025-11-19 18:40:21.412148'),(3,'admin','0001_initial','2025-11-19 18:40:21.647758'),(4,'admin','0002_logentry_remove_auto_add','2025-11-19 18:40:21.660896'),(5,'admin','0003_logentry_add_action_flag_choices','2025-11-19 18:40:21.675829'),(6,'contenttypes','0002_remove_content_type_name','2025-11-19 18:40:21.841409'),(7,'auth','0002_alter_permission_name_max_length','2025-11-19 18:40:21.967538'),(8,'auth','0003_alter_user_email_max_length','2025-11-19 18:40:22.006884'),(9,'auth','0004_alter_user_username_opts','2025-11-19 18:40:22.019474'),(10,'auth','0005_alter_user_last_login_null','2025-11-19 18:40:22.135591'),(11,'auth','0006_require_contenttypes_0002','2025-11-19 18:40:22.140406'),(12,'auth','0007_alter_validators_add_error_messages','2025-11-19 18:40:22.152254'),(13,'auth','0008_alter_user_username_max_length','2025-11-19 18:40:22.277439'),(14,'auth','0009_alter_user_last_name_max_length','2025-11-19 18:40:22.352028'),(15,'auth','0010_alter_group_name_max_length','2025-11-19 18:40:22.416376'),(16,'auth','0011_update_proxy_permissions','2025-11-19 18:40:22.434547'),(17,'auth','0012_alter_user_first_name_max_length','2025-11-19 18:40:22.509822'),(18,'sessions','0001_initial','2025-11-19 18:40:22.554630');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('wkshzlsgmd9xqj85we9ypkiptd02a7c8','.eJxVjMsKwjAQAP9lzxKym3eP3v2GsGkSW5UGmvYk_rsUetDrzDBviLxvU9x7WeOcYQCEyy9LPD7Lcoj84OXexNiWbZ2TOBJx2i5uLZfX9Wz_BhP3CQYomLW2yRB6tIYlO-PIVEy52uQVkqPgVc1UCV2wISjShR1J4zRbWeHzBbirNoc:1vRFaD:Sp-ftH0mWdbYVHAYN9YRELUiGDFpD4a66w9T8FGJGEM','2025-12-18 20:05:45.039417');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matricula`
--

DROP TABLE IF EXISTS `matricula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matricula` (
  `id_matricula` int NOT NULL AUTO_INCREMENT,
  `id_persona` int NOT NULL,
  `id_curso` int NOT NULL,
  `anio` int NOT NULL,
  `id_estado_matricula` int NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_baja` date DEFAULT NULL,
  PRIMARY KEY (`id_matricula`),
  KEY `fk_matricula_persona` (`id_persona`),
  KEY `fk_matricula_curso` (`id_curso`),
  KEY `fk_matricula_estado` (`id_estado_matricula`),
  CONSTRAINT `fk_matricula_curso` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_matricula_estado` FOREIGN KEY (`id_estado_matricula`) REFERENCES `cat_estado_matricula` (`id_estado_matricula`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_matricula_persona` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id_persona`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matricula`
--

LOCK TABLES `matricula` WRITE;
/*!40000 ALTER TABLE `matricula` DISABLE KEYS */;
INSERT INTO `matricula` VALUES (5,6,1,2025,1,1,'2025-12-04 19:08:54','2025-12-04 19:08:54',NULL),(6,7,1,2025,1,1,'2025-12-04 19:08:54','2025-12-04 19:08:54',NULL),(7,8,2,2025,1,1,'2025-12-04 19:08:54','2025-12-04 19:08:54',NULL),(8,9,2,2025,1,1,'2025-12-04 19:08:54','2025-12-04 19:08:54',NULL);
/*!40000 ALTER TABLE `matricula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `id_persona` int NOT NULL AUTO_INCREMENT,
  `id_colegio` int NOT NULL,
  `rut` varchar(15) DEFAULT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellido_paterno` varchar(60) DEFAULT NULL,
  `apellido_materno` varchar(60) DEFAULT NULL,
  `apellidos` varchar(100) NOT NULL,
  `correo` varchar(120) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email_alt` varchar(150) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `consentimiento_datos` tinyint(1) NOT NULL DEFAULT '0',
  `fecha_consentimiento` date DEFAULT NULL,
  `fecha_alta` date DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `fecha_baja` date DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_persona`),
  UNIQUE KEY `rut` (`rut`),
  KEY `fk_persona_colegio` (`id_colegio`),
  CONSTRAINT `fk_persona_colegio` FOREIGN KEY (`id_colegio`) REFERENCES `colegio` (`id_colegio`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (1,1,NULL,'Carlos','Rojas','demo1','Rojas','c.rojas@demo.cl','987654321',NULL,NULL,0,NULL,NULL,1,NULL,'2025-12-04 19:00:45','2025-12-10 16:07:40'),(2,1,NULL,'María','Lagos','demo2','Lagos','m.lagos@demo.cl','987654322',NULL,NULL,0,NULL,NULL,1,NULL,'2025-12-04 19:00:45','2025-12-10 16:07:40'),(3,1,NULL,'Pedro','Ávila','demo3','Ávila','p.avila@demo.cl','987654323',NULL,NULL,0,NULL,NULL,1,NULL,'2025-12-04 19:00:45','2025-12-10 16:07:40'),(4,1,NULL,'Ana','Gutiérrez','demo4','Gutiérrez','a.gutierrez@demo.cl','987654324',NULL,NULL,0,NULL,NULL,1,NULL,'2025-12-04 19:00:45','2025-12-10 16:07:40'),(5,1,NULL,'Rosa','Mendoza','demo5','Mendoza','r.mendoza@demo.cl','987654325',NULL,NULL,0,NULL,NULL,1,NULL,'2025-12-04 19:00:45','2025-12-10 16:07:40'),(6,1,NULL,'Juan','Pérez','demo6','Pérez',NULL,NULL,NULL,NULL,0,NULL,NULL,1,NULL,'2025-12-04 19:00:45','2025-12-10 16:07:40'),(7,1,NULL,'Camila','Soto','demo7','Soto',NULL,NULL,NULL,NULL,0,NULL,NULL,1,NULL,'2025-12-04 19:00:45','2025-12-10 16:07:40'),(8,1,NULL,'Diego','Mena','demo8','Mena',NULL,NULL,NULL,NULL,0,NULL,NULL,1,NULL,'2025-12-04 19:00:45','2025-12-10 16:07:40'),(9,1,NULL,'Valentina','Suárez','demo9','Suárez',NULL,NULL,NULL,NULL,0,NULL,NULL,1,NULL,'2025-12-04 19:00:45','2025-12-10 16:07:40'),(10,1,NULL,'Pedro','Pérez','demo10','Pérez',NULL,NULL,NULL,NULL,0,NULL,NULL,1,NULL,'2025-12-04 19:00:45','2025-12-10 16:07:40'),(11,1,NULL,'Sandra','Soto','demo11','Soto',NULL,NULL,NULL,NULL,0,NULL,NULL,1,NULL,'2025-12-04 19:00:45','2025-12-10 16:07:40'),(12,1,NULL,'Luis','Mena','demo12','Mena',NULL,NULL,NULL,NULL,0,NULL,NULL,1,NULL,'2025-12-04 19:00:45','2025-12-10 16:07:40'),(13,1,NULL,'Carolina','Suárez','demo13','Suárez',NULL,NULL,NULL,NULL,0,NULL,NULL,1,NULL,'2025-12-04 19:00:45','2025-12-10 16:07:40'),(14,1,NULL,'Tuyi','Vallejo','Demo','Vallejo Demo','tuyi@demo.cl','987654000',NULL,NULL,1,'2025-12-11','2025-12-11',1,NULL,'2025-12-11 15:34:27','2025-12-11 15:34:27');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona_relacion`
--

DROP TABLE IF EXISTS `persona_relacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona_relacion` (
  `id_persona_relacion` int NOT NULL AUTO_INCREMENT,
  `id_persona` int NOT NULL,
  `tipo_relacion` varchar(50) NOT NULL,
  `id_persona_rel` int NOT NULL,
  `prioridad_contacto` int NOT NULL DEFAULT '1',
  `observaciones` varchar(255) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_baja` date DEFAULT NULL,
  PRIMARY KEY (`id_persona_relacion`),
  UNIQUE KEY `uq_relacion` (`id_persona`,`id_persona_rel`,`tipo_relacion`),
  KEY `fk_prela_persona_rel` (`id_persona_rel`),
  CONSTRAINT `fk_prela_persona` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id_persona`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_prela_persona_rel` FOREIGN KEY (`id_persona_rel`) REFERENCES `persona` (`id_persona`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona_relacion`
--

LOCK TABLES `persona_relacion` WRITE;
/*!40000 ALTER TABLE `persona_relacion` DISABLE KEYS */;
INSERT INTO `persona_relacion` VALUES (1,6,'Apoderado',10,1,NULL,'2025-12-04 19:00:45','2025-12-04 19:00:45',NULL),(2,7,'Apoderado',11,1,NULL,'2025-12-04 19:00:45','2025-12-04 19:00:45',NULL),(3,8,'Apoderado',12,1,NULL,'2025-12-04 19:00:45','2025-12-04 19:00:45',NULL),(4,9,'Apoderado',13,1,NULL,'2025-12-04 19:00:45','2025-12-04 19:00:45',NULL);
/*!40000 ALTER TABLE `persona_relacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona_rol`
--

DROP TABLE IF EXISTS `persona_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona_rol` (
  `id_persona_rol` int NOT NULL AUTO_INCREMENT,
  `id_persona` int NOT NULL,
  `id_rol` int NOT NULL,
  `fecha_asignacion` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_baja` date DEFAULT NULL,
  PRIMARY KEY (`id_persona_rol`),
  UNIQUE KEY `uq_persona_rol` (`id_persona`,`id_rol`),
  KEY `fk_persona_rol_rol` (`id_rol`),
  CONSTRAINT `fk_persona_rol_persona` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id_persona`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_persona_rol_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol_persona` (`id_rol`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona_rol`
--

LOCK TABLES `persona_rol` WRITE;
/*!40000 ALTER TABLE `persona_rol` DISABLE KEYS */;
INSERT INTO `persona_rol` VALUES (1,1,2,'2025-12-10',NULL,'2025-12-10 09:40:02','2025-12-10 09:40:02',NULL),(2,1,1,'2025-12-10',NULL,'2025-12-10 14:25:02','2025-12-10 14:25:02',NULL),(3,2,3,'2025-12-10',NULL,'2025-12-10 14:25:02','2025-12-10 14:25:02',NULL),(4,3,4,'2025-12-10',NULL,'2025-12-10 14:25:02','2025-12-10 14:25:02',NULL),(5,4,5,'2025-12-10',NULL,'2025-12-10 14:25:02','2025-12-10 14:25:02',NULL),(6,5,5,'2025-12-10',NULL,'2025-12-10 14:25:02','2025-12-10 14:25:02',NULL),(7,6,6,'2025-12-10',NULL,'2025-12-10 14:25:02','2025-12-10 14:25:02',NULL),(8,7,6,'2025-12-10',NULL,'2025-12-10 14:25:02','2025-12-10 14:25:02',NULL),(9,8,6,'2025-12-10',NULL,'2025-12-10 14:25:02','2025-12-10 14:25:02',NULL),(10,9,6,'2025-12-10',NULL,'2025-12-10 14:25:02','2025-12-10 14:25:02',NULL),(11,10,6,'2025-12-10',NULL,'2025-12-10 14:25:02','2025-12-10 14:25:02',NULL),(12,11,6,'2025-12-10',NULL,'2025-12-10 14:25:02','2025-12-10 14:25:02',NULL),(13,12,6,'2025-12-10',NULL,'2025-12-10 14:25:02','2025-12-10 14:25:02',NULL),(14,13,6,'2025-12-10',NULL,'2025-12-10 14:25:02','2025-12-10 14:25:02',NULL);
/*!40000 ALTER TABLE `persona_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol_persona`
--

DROP TABLE IF EXISTS `rol_persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_persona` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `id_categoria` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_baja` date DEFAULT NULL,
  PRIMARY KEY (`id_rol`),
  KEY `fk_rol_cat_categoria` (`id_categoria`),
  CONSTRAINT `fk_rol_cat_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `cat_categoria_rol` (`id_categoria`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_persona`
--

LOCK TABLES `rol_persona` WRITE;
/*!40000 ALTER TABLE `rol_persona` DISABLE KEYS */;
INSERT INTO `rol_persona` VALUES (1,1,'Director','Director del establecimiento',1,'2025-12-04 19:00:45','2025-12-04 19:00:45',NULL),(2,1,'Docente','Profesor del establecimiento',1,'2025-12-04 19:00:45','2025-12-04 19:00:45',NULL),(3,1,'Inspector','Inspector general',1,'2025-12-04 19:00:45','2025-12-04 19:00:45',NULL),(4,1,'Encargado de Convivencia Escolar','Responsable del área de convivencia',1,'2025-12-04 19:00:45','2025-12-04 19:00:45',NULL),(5,2,'Apoderado','Apoderado del alumno',1,'2025-12-04 19:00:45','2025-12-04 19:00:45',NULL),(6,1,'Alumno','Estudiante del colegio',1,'2025-12-04 19:00:45','2025-12-04 19:00:45',NULL);
/*!40000 ALTER TABLE `rol_persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_persona`
--

DROP TABLE IF EXISTS `usuario_persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_persona` (
  `id_usuario_persona` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `id_persona` int NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_baja` date DEFAULT NULL,
  PRIMARY KEY (`id_usuario_persona`),
  UNIQUE KEY `uq_user_persona` (`user_id`,`id_persona`),
  KEY `fk_up_persona` (`id_persona`),
  CONSTRAINT `fk_up_persona` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id_persona`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_up_user` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_persona`
--

LOCK TABLES `usuario_persona` WRITE;
/*!40000 ALTER TABLE `usuario_persona` DISABLE KEYS */;
INSERT INTO `usuario_persona` VALUES (1,1,14,'2025-12-11 15:34:28','2025-12-11 15:34:28',NULL);
/*!40000 ALTER TABLE `usuario_persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'colegio_control_bullying'
--

--
-- Dumping routines for database 'colegio_control_bullying'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-11 19:08:28
