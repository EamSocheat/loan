-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 18, 2019 at 10:33 AM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `loan_db`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
  `upUsr` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`com_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_company`
--

INSERT INTO `tbl_company` (`com_id`, `com_nm`, `com_phone`, `com_email`, `com_addr`, `com_des`, `regDt`, `upDt`, `upUsr`, `useYn`) VALUES
(1, 'E-LOAN Khmer', '010234567', NULL, NULL, NULL, '2019-01-07 16:53:06', '2019-02-05 07:05:28', '1', 'Y'),
(5, 'b', '0963276991', NULL, NULL, NULL, '2019-01-27 20:36:17', NULL, '', 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_contract`
--

DROP TABLE IF EXISTS `tbl_contract`;
CREATE TABLE IF NOT EXISTS `tbl_contract` (
  `con_id` int(11) NOT NULL AUTO_INCREMENT,
  `con_no` int(10) NOT NULL,
  `con_start_dt` datetime NOT NULL,
  `con_principle` double NOT NULL,
  `con_interest` double NOT NULL,
  `con_interest_type` varchar(1) NOT NULL,
  `con_per_year` int(11) NOT NULL,
  `con_per_month` int(11) NOT NULL,
  `con_total_principle` double NOT NULL,
  `con_total_interest` double NOT NULL,
  `con_status` varchar(10) NOT NULL,
  `con_end_dt` datetime DEFAULT NULL,
  `regDt` datetime DEFAULT NULL,
  `regUsr` varchar(100) DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `upUsr` varchar(30) DEFAULT NULL,
  `useYn` varchar(1) NOT NULL,
  `com_id` int(11) NOT NULL,
  `cus_id` int(11) DEFAULT NULL,
  `cur_id` int(11) NOT NULL,
  PRIMARY KEY (`con_id`),
  UNIQUE KEY `con_no` (`con_no`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=armscii8;

--
-- Dumping data for table `tbl_contract`
--

INSERT INTO `tbl_contract` (`con_id`, `con_no`, `con_start_dt`, `con_principle`, `con_interest`, `con_interest_type`, `con_per_year`, `con_per_month`, `con_total_principle`, `con_total_interest`, `con_status`, `con_end_dt`, `regDt`, `regUsr`, `upDt`, `upUsr`, `useYn`, `com_id`, `cus_id`, `cur_id`) VALUES
(1, 1, '2019-02-08 00:00:00', 200, 20, 'Y', 1, 12, 216.8, 16.8, 'Y', NULL, '2019-02-08 00:00:00', '1', NULL, NULL, 'Y', 1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_currency`
--

DROP TABLE IF EXISTS `tbl_currency`;
CREATE TABLE IF NOT EXISTS `tbl_currency` (
  `cur_id` int(11) NOT NULL AUTO_INCREMENT,
  `cur_nm` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cur_nm_kh` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cur_syn` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cur_syn_kh` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) NOT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) DEFAULT NULL,
  `com_id` int(11) NOT NULL,
  PRIMARY KEY (`cur_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=armscii8;

--
-- Dumping data for table `tbl_currency`
--

INSERT INTO `tbl_currency` (`cur_id`, `cur_nm`, `cur_nm_kh`, `cur_syn`, `cur_syn_kh`, `regDt`, `upDt`, `useYn`, `regUsr`, `upUsr`, `com_id`) VALUES
(2, 'Dollar', 'ដុល្លា', '$', '', '2019-02-18 00:00:00', NULL, 'Y', 1, NULL, 1),
(1, 'Riel', 'រៀល', '៛', '', '2019-02-18 00:00:00', NULL, 'Y', 1, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_customer`
--

DROP TABLE IF EXISTS `tbl_customer`;
CREATE TABLE IF NOT EXISTS `tbl_customer` (
  `cus_id` int(11) NOT NULL AUTO_INCREMENT,
  `cus_nm` varchar(30) DEFAULT NULL,
  `cus_nm_kh` varchar(30) DEFAULT NULL,
  `cus_gender` varchar(1) DEFAULT NULL,
  `cus_dob` date DEFAULT NULL,
  `cus_photo` text,
  `cus_phone1` varchar(15) DEFAULT NULL,
  `cus_phone2` varchar(15) DEFAULT NULL,
  `cus_email` varchar(50) DEFAULT NULL,
  `cus_addr` text,
  `cus_des` text,
  `cus_idnt_num` varchar(20) DEFAULT NULL,
  `cus_idnt_type` varchar(4) DEFAULT NULL,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) DEFAULT NULL,
  `regUsr` int(11) DEFAULT NULL,
  `upUsr` varchar(100) CHARACTER SET armscii8 NOT NULL,
  `com_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`cus_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_customer`
--

INSERT INTO `tbl_customer` (`cus_id`, `cus_nm`, `cus_nm_kh`, `cus_gender`, `cus_dob`, `cus_photo`, `cus_phone1`, `cus_phone2`, `cus_email`, `cus_addr`, `cus_des`, `cus_idnt_num`, `cus_idnt_type`, `regDt`, `upDt`, `useYn`, `regUsr`, `upUsr`, `com_id`) VALUES
(1, 'customer 00001', 'អតិថិជន 00001', 'F', '2019-01-01', '/loan/customer/2019-01-26-09-46-29_1_1.jpg', '092333344', '092888822', 'customer00001@gmail.com', 'customer str.', 'customer detail', '123321212', NULL, '2019-01-25 00:00:00', '2019-01-26 09:46:29', 'Y', 1, '1', 1),
(2, 'customer 00002', 'អតិថិជន 00002', 'M', '1970-01-01', '/loan/customer/2019-01-26-09-46-39_1_1.jpg', '091222233', '098111122', 'staff00002@gmail.com', 'customer 00002 str.', 'customer 00002 description', '112222222', NULL, '2019-01-26 05:06:15', '2019-01-26 09:46:39', 'Y', 1, '1', 1),
(3, 'customer 00003', 'អតិថិជន 00003', 'M', '1990-01-07', '/loan/customer/2019-01-26-10-08-47_1_1.jpg', '012222233', '012333344', 'customer00003@gmail.com', 'customer 00003 str.', 'customer 00003 detail', '999888809', NULL, '2019-01-26 05:30:50', '2019-01-26 10:08:47', 'Y', 1, '1', 1),
(4, 'customer 00004', 'អតិថិជន 00004', 'F', '1989-06-02', '', '012223344', '092335577', 'staff00004@gmail.com', 'customer 00004 str.', 'customer 00004 description', '757456445', NULL, '2019-01-26 05:31:55', '2019-01-26 08:05:09', 'Y', 1, '1', 1),
(5, 'customer 00005', 'អតិថិជន 00005', 'F', '1999-08-12', '/loan/customer/2019-01-26-09-47-15_1_1.jpg', '091222333', '012333444', 'customer00005@gmail.com', 'customer 00005 str.', 'customer 00005 description', '999888877', NULL, '2019-01-26 05:37:09', '2019-01-26 09:47:20', 'Y', 1, '1', 1),
(6, 'customer 00006', 'អតិថិជន 00006', 'M', '1990-06-02', '/loan/customer/2019-01-26-09-47-04_1_1.jpg', '092222233', '098777766', 'customer00006@gmail.com', 'customer 00006 str.', 'customer 00006 description', '123455321', NULL, '2019-01-26 07:51:18', '2019-01-26 09:47:04', 'Y', 1, '1', 1);

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
-- Table structure for table `tbl_installment`
--

DROP TABLE IF EXISTS `tbl_installment`;
CREATE TABLE IF NOT EXISTS `tbl_installment` (
  `ins_id` int(11) NOT NULL AUTO_INCREMENT,
  `ins_num` int(11) NOT NULL,
  `ins_dt` datetime NOT NULL,
  `ins_principle` double NOT NULL,
  `ins_interest` double NOT NULL,
  `ins_status` varchar(10) NOT NULL,
  `ins_pay_dt` datetime DEFAULT NULL,
  `con_total_interest` double NOT NULL,
  `con_status` double NOT NULL,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) NOT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  PRIMARY KEY (`ins_id`)
) ENGINE=MyISAM DEFAULT CHARSET=armscii8;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_menu`
--

INSERT INTO `tbl_menu` (`menu_id`, `menu_nm`, `menu_nm_kh`, `regDt`, `menu_icon_nm`, `menu_level`, `menu_order`, `menu_group`) VALUES
(1, 'Contract', 'កិច្ចសន្យា', '2018-08-24 01:02:15', 'fa fa-handshake-o', NULL, 2, 1),
(2, 'Payment', 'ការបង់ប្រាក់', '2018-08-24 02:59:23', 'fa fa-pie-chart', NULL, 3, 1),
(3, 'Paid', 'ប្រាក់បានបង់', '2018-08-24 02:59:23', 'fa fa-money', NULL, 4, 1),
(4, 'Customer', 'អតិថិជន', '2018-08-24 02:59:23', 'fa fa-users', 0, 1, 1),
(5, 'Calculate_Sample', 'របៀបគណនា', '2019-01-26 00:00:00', 'fa fa-calculator', NULL, 5, 1);

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
(1, 1, NULL, '2019-01-07 16:53:06', 'Y'),
(1, 5, NULL, '2019-01-27 20:36:17', 'Y'),
(2, 1, NULL, '2019-01-07 16:53:06', 'Y'),
(2, 5, NULL, '2019-01-27 20:36:17', 'Y'),
(3, 1, NULL, '2019-01-07 16:53:06', 'Y'),
(3, 5, NULL, '2019-01-27 20:36:17', 'Y'),
(4, 1, NULL, '2019-01-07 16:53:06', 'Y'),
(4, 5, NULL, '2019-01-27 20:36:17', 'Y'),
(5, 1, NULL, '2019-01-26 00:00:00', 'Y'),
(5, 5, NULL, '2019-01-27 20:36:17', 'Y');

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
(1, 1, NULL, '2019-01-07 16:53:06', 'Y'),
(1, 2, NULL, '2019-01-27 20:36:17', 'Y'),
(2, 1, NULL, '2019-01-07 16:53:06', 'Y'),
(2, 2, NULL, '2019-01-27 20:36:17', 'Y'),
(3, 1, NULL, '2019-01-07 16:53:06', 'Y'),
(3, 2, NULL, '2019-01-27 20:36:17', 'Y'),
(4, 1, NULL, '2019-01-07 16:53:06', 'Y'),
(4, 2, NULL, '2019-01-27 20:36:17', 'Y'),
(5, 1, NULL, '2019-01-26 00:00:00', 'Y'),
(5, 2, NULL, '2019-01-27 20:36:17', 'Y');

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_position`
--

INSERT INTO `tbl_position` (`pos_id`, `pos_nm`, `pos_nm_kh`, `pos_des`, `regDt`, `upDt`, `useYn`, `regUsr`, `upUsr`, `com_id`) VALUES
(1, 'Admin', 'ម្ចាស់ក្រុមហ៊ុន', NULL, '2019-01-07 16:53:06', NULL, 'Y', 0, 0, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_staff`
--

INSERT INTO `tbl_staff` (`sta_id`, `sta_nm`, `sta_nm_kh`, `sta_gender`, `sta_dob`, `sta_photo`, `sta_phone1`, `sta_phone2`, `sta_email`, `sta_addr`, `sta_des`, `sta_start_dt`, `sta_end_dt`, `regDt`, `upDt`, `useYn`, `regUsr`, `upUsr`, `pos_id`, `bra_id`, `com_id`) VALUES
(1, 'a', NULL, '', NULL, NULL, '010234567', NULL, NULL, NULL, NULL, NULL, NULL, '2019-01-07 16:53:06', NULL, 'Y', 0, 0, 1, NULL, 1),
(2, 'b', NULL, '', NULL, NULL, '0963276991', NULL, NULL, NULL, NULL, NULL, NULL, '2019-01-27 20:36:17', NULL, 'Y', 0, 0, 1, NULL, 5);

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
  `pos_nm` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `pos_nm_kh` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`sup_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_supplier`
--

INSERT INTO `tbl_supplier` (`sup_id`, `sup_nm`, `sup_phone`, `sup_email`, `sup_addr`, `sup_des`, `sup_cont`, `regDt`, `upDt`, `useYn`, `regUsr`, `upUsr`, `com_id`, `sup_nm_kh`, `pos_nm`, `pos_nm_kh`) VALUES
(1, '', NULL, NULL, NULL, NULL, NULL, '2019-01-27 20:36:17', NULL, 'Y', 0, 0, 5, NULL, 'Admin', 'ម្ចាស់ក្រុមហ៊ុន');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`usr_id`, `usr_nm`, `usr_pwd`, `usr_wri_yn`, `usr_menu`, `regDt`, `upDt`, `useYn`, `regUsr`, `upUsr`, `sta_id`, `com_id`, `usr_str`) VALUES
(1, 'a', 'AO5f4wTvo7y6Y2d/u10MTwDZxN5Nez5f0bLq1wD7NJ0RuXLsZaZC2pNHL8LAAOQ46fJ30vZiNLJl8OkCQthzSg==', 'Y', NULL, '2019-01-07 16:53:06', '2019-02-05 04:32:28', 'Y', 0, 1, 1, 1, 'Y'),
(2, 'b', 'lLtE0Dr9clK1XMrZnM3MympjL8VMhcCxQBUzQ8vQ0LozzLqwTxHKpCYSutVsVXUNxW46a0Xy1gyuTWS2tglZJQ==', 'Y', NULL, '2019-01-27 20:36:17', NULL, 'Y', 0, 1, 2, 5, 'Y');

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
