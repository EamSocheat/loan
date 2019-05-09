-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 01, 2019 at 07:41 AM
-- Server version: 5.7.23
-- PHP Version: 7.0.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stock_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_branch`
--

DROP TABLE IF EXISTS `tbl_branch`;
CREATE TABLE IF NOT EXISTS `tbl_branch` (
  `bra_id` int(11) NOT NULL AUTO_INCREMENT,
  `bra_nm` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `bra_phone1` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bra_phone2` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bra_email` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bra_addr` text COLLATE utf8_unicode_ci,
  `bra_des` text COLLATE utf8_unicode_ci,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `bra_type_id` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  `bra_nm_kh` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`bra_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_branch`
--

INSERT INTO `tbl_branch` (`bra_id`, `bra_nm`, `bra_phone1`, `bra_phone2`, `bra_email`, `bra_addr`, `bra_des`, `regDt`, `upDt`, `useYn`, `regUsr`, `upUsr`, `bra_type_id`, `com_id`, `bra_nm_kh`) VALUES
(1, 'Tulip DNUUUUU', '0123467822', '0123456789', 'eamsocheat@gmail.com', 'AAA', 'AAA', '2018-09-15 09:04:07', '2018-09-17 04:49:04', 'N', 5, 5, 2, 5, 'តេស'),
(2, 'Tulip AOEN', '0123467822', '0123456789', 'eamsocheat@gmail.com', '', '', '2018-09-13 08:46:37', '2018-10-23 07:11:12', 'N', 5, 5, 2, 5, 'តេស១'),
(3, '2333pppppp', '2', '2', '', '2', '2', '2018-09-15 09:09:22', '2018-10-25 04:45:02', 'Y', 5, 5, 1, 5, '2'),
(4, '3', '3', '3', '', '3', '3', '2018-09-15 08:51:43', '2018-10-25 04:46:49', 'N', 5, 5, 1, 5, '3'),
(5, '4u', '4444444', '', '', '', '', '2018-09-15 08:08:11', NULL, 'Y', 5, 5, 1, 5, '4'),
(6, '5', '5', '', '', '', '', '2018-09-13 08:47:19', NULL, 'Y', 5, 0, 1, 5, '5'),
(7, '6', '6', '', '', '', '', '2018-09-15 09:03:50', NULL, 'Y', 5, 5, 1, 5, '6'),
(8, '7up', '7', '7', '', 'AA', 'AAA', '2018-09-15 09:11:28', '2018-09-17 05:01:28', 'N', 5, 5, 1, 5, '7'),
(9, '8', '8', '', '', '', '', '2018-09-13 08:47:39', NULL, 'Y', 5, 0, 1, 5, '8'),
(10, '9', '9', '', '', '', '', '2018-09-13 08:47:44', '2018-10-25 04:47:44', 'N', 5, 5, 1, 5, '9'),
(11, '1155', '11', '11', '', '', '', '2018-09-13 08:47:52', '2018-10-23 07:22:14', 'Y', 5, 5, 1, 5, '1'),
(12, '22', '22', '22', '', '', '', '2018-09-13 08:47:58', NULL, 'Y', 5, 0, 1, 5, '22'),
(13, '33llllllll', '33', '3333333', '', '', '', '2018-09-13 08:48:04', '2018-10-25 04:45:37', 'Y', 5, 5, 1, 5, '33'),
(14, '4444', '444', '44', '', '', '', '2018-09-13 08:48:11', '2018-09-17 04:52:25', 'N', 5, 5, 1, 5, '44'),
(15, '55', '555555555', '5', '', '', '', '2018-09-13 08:48:17', '2018-09-17 04:52:25', 'N', 5, 5, 1, 5, '55'),
(16, 'Tulip DN', '01234678223333', '0123456789', 'eamsocheat@gmail.com', 'AAA', 'AAA', '2018-09-15 04:55:41', NULL, 'Y', 5, 0, 2, 5, 'តេស'),
(17, 'Tulip DNAA', '0123467822', '0123456789', 'eamsocheat@gmail.com', 'AAA', 'AAA', '2018-09-15 04:59:04', '2018-09-17 05:01:38', 'N', 5, 5, 2, 5, 'តេស'),
(18, '33WWWWW', '3', '33', '', '33', '33', '2018-10-22 08:32:55', '2018-10-23 02:46:51', 'Y', 5, 5, 1, 5, '333'),
(19, 'ttt99999', '0123467822', '0123456789', '', '', '', '2018-10-22 08:45:00', '2018-10-23 03:01:56', 'Y', 5, 5, 1, 5, 'AAAAAAAAAA'),
(20, '111RRRRRRRRRR', '111', '111', '', '', '', '2018-10-23 04:40:15', '2018-10-25 04:46:07', 'Y', 5, 5, 1, 5, '111'),
(21, 'a', '555555555', '', '', '', '', '2018-10-23 04:44:08', '2018-10-23 07:33:23', 'Y', 5, 5, 1, 5, 'AAA'),
(22, '5555', '555', '555', '', '', '', '2018-10-23 06:56:24', '2018-10-25 04:47:53', 'N', 5, 5, 1, 5, '5555'),
(23, 'ttttttyyy', '0987654321', '', '', '', '', '2018-10-23 06:57:06', NULL, 'Y', 5, 0, 1, 5, 'yyyy'),
(24, '99999', '9999', '99999', '', '', '', '2018-10-23 06:58:36', NULL, 'Y', 5, 0, 1, 5, '99999'),
(25, 'iiiii', '0987654321', '', '', '', '', '2018-10-23 07:05:35', NULL, 'Y', 5, 0, 1, 5, 'iiii'),
(26, 'uuu', '899999', '99', '', '', '', '2018-10-23 07:33:05', NULL, 'Y', 5, 0, 1, 5, 'uuu'),
(27, 'ww', '111', '1111', '', '', '', '2019-01-06 07:06:14', NULL, 'Y', 5, 0, 1, 5, 'ww');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_branch_type`
--

DROP TABLE IF EXISTS `tbl_branch_type`;
CREATE TABLE IF NOT EXISTS `tbl_branch_type` (
  `bra_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `bra_nm` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bra_des` text COLLATE utf8_unicode_ci,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `regUsr` int(11) DEFAULT NULL,
  `upUsr` int(11) DEFAULT NULL,
  `com_id` int(11) DEFAULT NULL,
  `bra_nm_kh` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`bra_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_branch_type`
--

INSERT INTO `tbl_branch_type` (`bra_type_id`, `bra_nm`, `bra_des`, `regDt`, `upDt`, `useYn`, `regUsr`, `upUsr`, `com_id`, `bra_nm_kh`) VALUES
(1, 'Sub branch', NULL, '2018-08-24 03:58:01', NULL, NULL, NULL, NULL, NULL, 'អនុសាខា'),
(2, 'Head branch', NULL, '2018-08-24 03:57:37', NULL, NULL, NULL, NULL, NULL, 'សាខាធំ');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

DROP TABLE IF EXISTS `tbl_category`;
CREATE TABLE IF NOT EXISTS `tbl_category` (
  `cat_id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_nm` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `cat_nm_kh` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cat_des` text COLLATE utf8_unicode_ci,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `upUsr` int(11) NOT NULL,
  `regUsr` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_company`
--

DROP TABLE IF EXISTS `tbl_company`;
CREATE TABLE IF NOT EXISTS `tbl_company` (
  `com_id` int(11) NOT NULL AUTO_INCREMENT,
  `com_nm` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `com_phone` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `com_email` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `com_addr` text COLLATE utf8_unicode_ci,
  `com_des` text COLLATE utf8_unicode_ci,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`com_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_company`
--

INSERT INTO `tbl_company` (`com_id`, `com_nm`, `com_phone`, `com_email`, `com_addr`, `com_des`, `regDt`, `upDt`, `useYn`) VALUES
(1, '1', '1', NULL, NULL, NULL, '2018-09-12 11:50:39', NULL, 'Y'),
(2, '2', '2', NULL, NULL, NULL, '2018-09-12 11:54:03', NULL, 'N'),
(3, '3', '3', NULL, NULL, NULL, '2018-09-12 12:04:03', NULL, 'Y'),
(4, '4', '4', NULL, NULL, NULL, '2018-09-12 13:05:35', NULL, 'Y'),
(5, '5', '5', NULL, NULL, NULL, '2018-09-12 13:14:32', NULL, 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_import`
--

DROP TABLE IF EXISTS `tbl_import`;
CREATE TABLE IF NOT EXISTS `tbl_import` (
  `imp_id` int(11) NOT NULL AUTO_INCREMENT,
  `imp_total_qty` int(11) DEFAULT NULL,
  `imp_total_price` double DEFAULT NULL,
  `imp_date` date NOT NULL,
  `imp_des` text COLLATE utf8_unicode_ci,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `sup_id` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  PRIMARY KEY (`imp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_import_detail`
--

DROP TABLE IF EXISTS `tbl_import_detail`;
CREATE TABLE IF NOT EXISTS `tbl_import_detail` (
  `imp_id` int(11) NOT NULL,
  `pro_id` int(11) NOT NULL,
  `pro_unit_price` double DEFAULT NULL,
  `pro_sale_price` double DEFAULT NULL,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  PRIMARY KEY (`imp_id`,`pro_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_menu`
--

DROP TABLE IF EXISTS `tbl_menu`;
CREATE TABLE IF NOT EXISTS `tbl_menu` (
  `menu_id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_nm` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `menu_nm_kh` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `regDt` datetime DEFAULT NULL,
  `menu_icon_nm` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `menu_level` int(11) DEFAULT NULL,
  `menu_order` int(11) DEFAULT NULL,
  `menu_group` int(11) DEFAULT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_menu`
--

INSERT INTO `tbl_menu` (`menu_id`, `menu_nm`, `menu_nm_kh`, `regDt`, `menu_icon_nm`, `menu_level`, `menu_order`, `menu_group`) VALUES
(1, 'Branch', 'សាខាក្រុមហ៊ុន', '2018-08-24 01:02:15', 'fa fa-home', NULL, 2, 1),
(2, 'Stock', 'ឃ្លាំងទំនិញ', '2018-08-24 02:59:23', 'fa fa-pie-chart', NULL, 3, 1),
(3, 'Position', 'តួនាទីបុគ្គលិក', '2018-08-24 02:59:23', 'fa fa-user-plus', NULL, 4, 1),
(4, 'Staff', 'បុគ្គលិក', '2018-08-24 02:59:23', 'fa fa-users', 0, 5, 1),
(5, 'User Account', 'គណនី​អ្នកប្រើប្រាស់', '2018-08-24 02:59:23', 'fa fa-user-circle-o', NULL, 6, 1),
(6, 'Supplier', 'អ្នកផ្គត់ផ្គង់', '2018-08-24 02:59:23', 'fa fa-address-card-o', NULL, 7, 2),
(7, 'Category', 'ប្រភេទ​ទំនិញ', '2018-08-24 02:59:23', 'fa fa-tags', NULL, 8, 2),
(8, 'Products', 'ទំនិញ', '2018-08-24 02:59:23', 'fa fa-bar-chart', NULL, 9, 2),
(9, 'Transfer', 'ផ្ទេរទំនិញ', '2018-08-24 02:59:23', 'fa fa-truck', NULL, 10, 2),
(10, 'Checkout', 'ពិនិត្យចេញទំនិញ', '2018-08-24 02:59:23', 'fa fa-shopping-cart', NULL, 11, 2),
(11, 'Import', 'នាំចូលទំនិញ', '2018-08-24 02:59:23', 'fa fa-ship', NULL, 12, 2),
(12, 'Dashboard', 'ផ្ទាំងគ្រប់គ្រង', '2018-08-24 03:02:26', 'fa fa-dashboard', NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_menu_company`
--

DROP TABLE IF EXISTS `tbl_menu_company`;
CREATE TABLE IF NOT EXISTS `tbl_menu_company` (
  `menu_id` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  `upDt` datetime DEFAULT NULL,
  `regDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`menu_id`,`com_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_menu_company`
--

INSERT INTO `tbl_menu_company` (`menu_id`, `com_id`, `upDt`, `regDt`, `useYn`) VALUES
(1, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(1, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(1, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(1, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(1, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(2, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(2, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(2, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(2, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(2, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(3, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(3, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(3, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(3, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(3, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(4, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(4, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(4, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(4, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(4, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(5, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(5, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(5, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(5, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(5, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(6, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(6, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(6, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(6, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(6, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(7, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(7, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(7, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(7, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(7, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(8, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(8, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(8, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(8, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(8, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(9, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(9, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(9, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(9, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(9, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(10, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(10, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(10, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(10, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(10, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(11, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(11, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(11, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(11, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(11, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(12, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(12, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(12, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(12, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(12, 5, NULL, '2018-09-12 06:18:22', 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_menu_user`
--

DROP TABLE IF EXISTS `tbl_menu_user`;
CREATE TABLE IF NOT EXISTS `tbl_menu_user` (
  `menu_id` int(11) NOT NULL,
  `usr_id` int(11) NOT NULL,
  `upDt` datetime DEFAULT NULL,
  `regDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`menu_id`,`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_menu_user`
--

INSERT INTO `tbl_menu_user` (`menu_id`, `usr_id`, `upDt`, `regDt`, `useYn`) VALUES
(1, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(1, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(1, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(1, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(1, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(2, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(2, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(2, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(2, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(2, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(3, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(3, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(3, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(3, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(3, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(4, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(4, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(4, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(4, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(4, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(5, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(5, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(5, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(5, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(5, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(6, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(6, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(6, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(6, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(6, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(7, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(7, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(7, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(7, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(7, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(8, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(8, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(8, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(8, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(8, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(9, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(9, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(9, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(9, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(9, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(10, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(10, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(10, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(10, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(10, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(11, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(11, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(11, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(11, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(11, 5, NULL, '2018-09-12 06:18:22', 'Y'),
(12, 1, NULL, '2018-09-12 04:54:29', 'Y'),
(12, 2, NULL, '2018-09-12 04:57:53', 'Y'),
(12, 3, NULL, '2018-09-12 05:07:53', 'Y'),
(12, 4, NULL, '2018-09-12 06:09:25', 'Y'),
(12, 5, NULL, '2018-09-12 06:18:22', 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_move`
--

DROP TABLE IF EXISTS `tbl_move`;
CREATE TABLE IF NOT EXISTS `tbl_move` (
  `mov_id` int(11) NOT NULL AUTO_INCREMENT,
  `mov_total_qty` int(11) NOT NULL,
  `mov_date` date NOT NULL,
  `mov_des` text COLLATE utf8_unicode_ci,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sto_out_id` int(11) NOT NULL,
  `sto_in_id` int(11) NOT NULL,
  `sta_id` int(11) NOT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  PRIMARY KEY (`mov_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_move_detail`
--

DROP TABLE IF EXISTS `tbl_move_detail`;
CREATE TABLE IF NOT EXISTS `tbl_move_detail` (
  `mov_id` int(11) NOT NULL,
  `pro_id` int(11) NOT NULL,
  `pro_qty` int(11) NOT NULL,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  PRIMARY KEY (`mov_id`,`pro_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_position`
--

DROP TABLE IF EXISTS `tbl_position`;
CREATE TABLE IF NOT EXISTS `tbl_position` (
  `pos_id` int(11) NOT NULL AUTO_INCREMENT,
  `pos_nm` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `pos_nm_kh` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pos_des` text COLLATE utf8_unicode_ci,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  PRIMARY KEY (`pos_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_position`
--

INSERT INTO `tbl_position` (`pos_id`, `pos_nm`, `pos_nm_kh`, `pos_des`, `regDt`, `upDt`, `useYn`, `regUsr`, `upUsr`, `com_id`) VALUES
(1, 'Admin', 'ម្ចាស់ក្រុមហ៊ុន', NULL, '2018-09-12 11:50:39', NULL, 'Y', 0, 0, 1),
(2, 'Admin', 'ម្ចាស់ក្រុមហ៊ុន', NULL, '2018-09-12 11:54:03', NULL, 'Y', 0, 0, 2),
(3, 'Admin', 'ម្ចាស់ក្រុមហ៊ុន', NULL, '2018-09-12 12:04:03', NULL, 'Y', 0, 0, 3),
(4, 'Admin', 'ម្ចាស់ក្រុមហ៊ុន', NULL, '2018-09-12 13:05:35', NULL, 'Y', 0, 0, 4),
(5, 'Admin', 'ម្ចាស់ក្រុមហ៊ុន', NULL, '2018-09-12 13:14:32', '2018-09-29 04:01:35', 'Y', 0, 0, 5),
(6, 'AAARRR', 'AAAAA', 'AAAAA', '2018-09-29 06:33:46', '2018-10-26 07:29:17', 'Y', 5, 0, 5),
(7, 'BBB', 'BBB', 'BBBB', '2018-09-29 06:37:02', '2018-10-26 08:15:59', 'N', 5, 0, 5),
(8, 'CCUpdate', 'CCCC', 'CCCC', '2018-09-29 06:38:17', '2018-09-29 06:39:03', 'Y', 5, 0, 5),
(9, 'kkk', 'kkkk', 'kkk', '2018-10-26 07:06:49', NULL, 'Y', 5, 0, 5),
(10, 'RRR', 'rRR', '', '2018-10-26 07:26:22', NULL, 'Y', 5, 0, 5),
(11, 'TTTT', 'ខ្មែរ', '', '2018-10-26 07:28:51', '2018-11-07 07:05:08', 'Y', 5, 0, 5);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product`
--

DROP TABLE IF EXISTS `tbl_product`;
CREATE TABLE IF NOT EXISTS `tbl_product` (
  `pro_id` int(11) NOT NULL AUTO_INCREMENT,
  `pro_nm` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `pro_nm_kh` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pro_vol` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pro_price` double DEFAULT NULL,
  `pro_sale_price` double DEFAULT NULL,
  `pro_qty` int(11) DEFAULT NULL,
  `pro_des` text COLLATE utf8_unicode_ci,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  PRIMARY KEY (`pro_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_staff`
--

DROP TABLE IF EXISTS `tbl_staff`;
CREATE TABLE IF NOT EXISTS `tbl_staff` (
  `sta_id` int(11) NOT NULL AUTO_INCREMENT,
  `sta_nm` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `sta_nm_kh` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sta_gender` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `sta_dob` date DEFAULT NULL,
  `sta_photo` text COLLATE utf8_unicode_ci,
  `sta_phone1` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sta_phone2` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sta_email` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sta_addr` text COLLATE utf8_unicode_ci,
  `sta_des` text COLLATE utf8_unicode_ci,
  `sta_start_dt` date DEFAULT NULL,
  `sta_end_dt` date DEFAULT NULL,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `pos_id` int(11) NOT NULL,
  `bra_id` int(11) DEFAULT NULL,
  `com_id` int(11) NOT NULL,
  PRIMARY KEY (`sta_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_staff`
--

INSERT INTO `tbl_staff` (`sta_id`, `sta_nm`, `sta_nm_kh`, `sta_gender`, `sta_dob`, `sta_photo`, `sta_phone1`, `sta_phone2`, `sta_email`, `sta_addr`, `sta_des`, `sta_start_dt`, `sta_end_dt`, `regDt`, `upDt`, `useYn`, `regUsr`, `upUsr`, `pos_id`, `bra_id`, `com_id`) VALUES
(1, '1', NULL, '', NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL, '2018-09-12 11:50:39', NULL, 'Y', 0, 0, 1, NULL, 1),
(2, '2', NULL, '', NULL, NULL, '2', NULL, NULL, NULL, NULL, NULL, NULL, '2018-09-12 11:54:03', NULL, 'Y', 0, 0, 2, NULL, 2),
(3, '3', NULL, '', NULL, NULL, '3', NULL, NULL, NULL, NULL, NULL, NULL, '2018-09-12 12:04:03', NULL, 'Y', 0, 0, 3, NULL, 3),
(4, '4', NULL, '', NULL, NULL, '4', NULL, NULL, NULL, NULL, NULL, NULL, '2018-09-12 13:05:35', NULL, 'Y', 0, 0, 4, NULL, 4),
(5, '5', NULL, '', NULL, NULL, '5', NULL, NULL, NULL, NULL, NULL, NULL, '2018-09-12 13:14:32', NULL, 'Y', 0, 0, 5, NULL, 5),
(6, 'AAAA', 'aa', 'F', '0000-00-00', NULL, NULL, '999', 'AAAAAA@email.com', 'pp', 'A', '0000-00-00', NULL, '2018-10-29 08:39:46', '2018-11-07 07:41:50', 'N', 5, 5, 11, 26, 5),
(7, 'AAA4444', 'AAAA', 'F', '1992-01-01', '/stock/staff/2018-11-07-06-59-01_5_5.jpg', '1011222', '6565', '', 'TTT', '55', '2018-01-01', NULL, '2018-10-29 09:22:17', '2018-11-07 07:41:50', 'N', 5, 5, 11, 26, 5),
(8, '444', '444', 'F', '1992-01-01', '', '444', '4444', 'socheat@mail.com', '44', '333', '2018-01-01', '1970-01-01', '2018-11-06 07:54:50', '2019-01-06 07:09:25', 'Y', 5, 5, 10, 26, 5),
(9, 'AAA', 'AAAA', 'F', '1992-01-01', '/stock/staff/2018-11-06-08-48-55_5_5.jpg', '1011222', '6565', '', 'TTT', '55', '2018-01-01', NULL, '2018-11-06 08:48:55', '2018-11-07 07:35:55', 'N', 5, 5, 11, 26, 5),
(10, 'TTTTT', 'តេស', 'M', '1970-01-01', '', '012232401', '6565', 'socheat@mail.com', 'TTT', 'oooo', '2018-11-12', '1970-01-01', '2018-11-12 07:06:02', '2019-01-06 07:06:45', 'Y', 5, 5, 5, 24, 5);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stock`
--

DROP TABLE IF EXISTS `tbl_stock`;
CREATE TABLE IF NOT EXISTS `tbl_stock` (
  `sto_id` int(11) NOT NULL AUTO_INCREMENT,
  `sto_nm` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `sto_nm_kh` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sto_addr` text COLLATE utf8_unicode_ci,
  `sto_des` text COLLATE utf8_unicode_ci,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `bra_id` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  PRIMARY KEY (`sto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stock_product`
--

DROP TABLE IF EXISTS `tbl_stock_product`;
CREATE TABLE IF NOT EXISTS `tbl_stock_product` (
  `sto_id` int(11) NOT NULL,
  `pro_id` int(11) NOT NULL,
  `imp_mov_id` int(11) NOT NULL,
  `imp_mov_status` int(11) NOT NULL,
  `pro_qty` int(11) DEFAULT NULL,
  `pro_unit_price` double DEFAULT NULL,
  `pro_sale_price` double DEFAULT NULL,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  PRIMARY KEY (`sto_id`,`pro_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_supplier`
--

DROP TABLE IF EXISTS `tbl_supplier`;
CREATE TABLE IF NOT EXISTS `tbl_supplier` (
  `sup_id` int(11) NOT NULL AUTO_INCREMENT,
  `sup_nm` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `sup_phone` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sup_email` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sup_addr` text COLLATE utf8_unicode_ci,
  `sup_des` text COLLATE utf8_unicode_ci,
  `sup_cont` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  `sup_nm_kh` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`sup_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_supplier`
--

INSERT INTO `tbl_supplier` (`sup_id`, `sup_nm`, `sup_phone`, `sup_email`, `sup_addr`, `sup_des`, `sup_cont`, `regDt`, `upDt`, `useYn`, `regUsr`, `upUsr`, `com_id`, `sup_nm_kh`) VALUES
(1, 'AAAAAAUUUUUUU', '0123456789', 'eamsocheatsmart@gmail.com', 'AAAAAAAAAA', 'AAAAAAAAAAAAAAAAAA', NULL, '2018-10-29 03:32:42', '2018-10-29 03:38:26', 'N', 5, 0, 5, 'ខ្មែរ');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_use`
--

DROP TABLE IF EXISTS `tbl_use`;
CREATE TABLE IF NOT EXISTS `tbl_use` (
  `use_id` int(11) NOT NULL AUTO_INCREMENT,
  `use_total_qty` int(11) NOT NULL,
  `use_date` date NOT NULL,
  `use_des` text COLLATE utf8_unicode_ci,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sto_id` int(11) NOT NULL,
  `sta_id` int(11) NOT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  PRIMARY KEY (`use_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `usr_id` int(11) NOT NULL AUTO_INCREMENT,
  `usr_nm` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `usr_pwd` text COLLATE utf8_unicode_ci NOT NULL,
  `usr_wri_yn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `usr_menu` text COLLATE utf8_unicode_ci,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `sta_id` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  `usr_str` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`usr_id`, `usr_nm`, `usr_pwd`, `usr_wri_yn`, `usr_menu`, `regDt`, `upDt`, `useYn`, `regUsr`, `upUsr`, `sta_id`, `com_id`, `usr_str`) VALUES
(1, '1', 'X/Cf1cmof5aDa8iuIVN2oNgoJfmUQd8gqvPSGDMhgemDRsKhQYzdFHCzdqX3uQIBQIe0n79RnGMMMpynqvkTQg==', 'Y', NULL, '2018-09-12 11:50:39', NULL, 'Y', 0, 0, 1, 1, 'Y'),
(2, '2', 'UFAmn6pBQ/wWmNHnGL7pQtAB/Sm2jRyrGFVGheCCGK6tzD4hB4GDw58ndNPZIJwSjLp1qNi5N+yVVL4El2TZ1Q==', 'Y', NULL, '2018-09-12 11:54:03', NULL, 'Y', 0, 0, 2, 2, 'Y'),
(3, '3', '1AjILh2WSR7Js5Xkprm0kVoDnHvpMGVj2i3nKUfmb8M8Pa9USbFLZBej/uGxPOOLMPTfVc+l093D2WLdJkcHAg==', 'Y', NULL, '2018-09-12 12:04:03', NULL, 'Y', 0, 0, 3, 3, 'Y'),
(4, '4', 'qis8su6y7KgIF9Dsm/QFsA2RMU8YiPtVwcGHmhW2vqXjxMOf7Z3PEv1jbUFx2QrgFsR/Pp9ORoraQDjb8LcofA==', 'Y', NULL, '2018-09-12 13:05:35', NULL, 'Y', 0, 0, 4, 4, 'Y'),
(5, '5', 'N0UOR8kWY8jHrALGmJyhNaaP7eHlSTxz5Fxn1+YEIutetEJ/VmcuaNzU4lx9CRMwvcJSaXcakndkw/B9I0+GSQ==', 'Y', NULL, '2018-09-12 13:14:32', NULL, 'Y', 0, 0, 5, 5, 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_use_detail`
--

DROP TABLE IF EXISTS `tbl_use_detail`;
CREATE TABLE IF NOT EXISTS `tbl_use_detail` (
  `use_id` int(11) NOT NULL,
  `pro_id` int(11) NOT NULL,
  `pro_qty` int(11) DEFAULT NULL,
  `use_status` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  PRIMARY KEY (`use_id`,`pro_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_use_detail_status`
--

DROP TABLE IF EXISTS `tbl_use_detail_status`;
CREATE TABLE IF NOT EXISTS `tbl_use_detail_status` (
  `use_stat_id` int(11) NOT NULL AUTO_INCREMENT,
  `use_id` int(11) NOT NULL,
  `pro_id` int(11) NOT NULL,
  `use_stat_des` text COLLATE utf8_unicode_ci,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  PRIMARY KEY (`use_stat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
