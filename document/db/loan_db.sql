-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2019 at 04:48 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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

CREATE TABLE `tbl_branch` (
  `bra_id` int(11) NOT NULL,
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
  `bra_nm_kh` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_branch_type`
--

CREATE TABLE `tbl_branch_type` (
  `bra_type_id` int(11) NOT NULL,
  `bra_nm` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bra_des` text COLLATE utf8_unicode_ci,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `regUsr` int(11) DEFAULT NULL,
  `upUsr` int(11) DEFAULT NULL,
  `com_id` int(11) DEFAULT NULL,
  `bra_nm_kh` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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

CREATE TABLE `tbl_category` (
  `cat_id` int(11) NOT NULL,
  `cat_nm` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `cat_nm_kh` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cat_des` text COLLATE utf8_unicode_ci,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `upUsr` int(11) NOT NULL,
  `regUsr` int(11) NOT NULL,
  `com_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_company`
--

CREATE TABLE `tbl_company` (
  `com_id` int(11) NOT NULL,
  `com_nm` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `com_phone` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `com_email` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `com_addr` text COLLATE utf8_unicode_ci,
  `com_des` text COLLATE utf8_unicode_ci,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `upUsr` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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

CREATE TABLE `tbl_contract` (
  `con_id` int(11) NOT NULL,
  `con_no` varchar(20) NOT NULL,
  `con_start_dt` datetime NOT NULL,
  `con_principle` double NOT NULL,
  `con_interest` double NOT NULL,
  `con_interest_type` varchar(10) NOT NULL,
  `con_per_year` int(11) NOT NULL,
  `con_per_month` int(11) NOT NULL,
  `con_total_principle` double NOT NULL,
  `con_total_interest` double NOT NULL,
  `con_status` varchar(1) NOT NULL,
  `con_end_dt` datetime DEFAULT NULL,
  `regDt` datetime DEFAULT NULL,
  `regUsr` varchar(100) DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `upUsr` varchar(30) DEFAULT NULL,
  `con_desc` varchar(100) DEFAULT NULL,
  `useYn` varchar(1) NOT NULL,
  `com_id` int(11) NOT NULL,
  `cus_id` int(11) DEFAULT NULL,
  `cur_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=armscii8;

--
-- Dumping data for table `tbl_contract`
--

INSERT INTO `tbl_contract` (`con_id`, `con_no`, `con_start_dt`, `con_principle`, `con_interest`, `con_interest_type`, `con_per_year`, `con_per_month`, `con_total_principle`, `con_total_interest`, `con_status`, `con_end_dt`, `regDt`, `regUsr`, `upDt`, `upUsr`, `con_desc`, `useYn`, `com_id`, `cus_id`, `cur_id`) VALUES
(9, '0000000009', '2019-03-01 00:00:00', 100000, 10, 'M', 1, 0, 0, 0, '1', NULL, '2019-02-20 02:50:12', '1', '2019-03-05 13:02:33', '1', 'TEST', 'Y', 1, 3, 1),
(13, '0000000013', '2019-03-02 00:00:00', 150000, 55, 'Monthly', 0, 11, 0, 0, '0', NULL, '2019-02-27 10:19:28', '1', '2019-03-02 07:16:46', '1', NULL, 'Y', 1, 4, 1),
(15, '0000000015', '2019-01-22 00:00:00', 150000, 5, 'Monthly', 0, 11, 0, 0, '1', NULL, '2019-02-28 04:57:59', '1', '2019-03-02 07:16:26', '1', NULL, 'Y', 1, 3, 1),
(16, '0000000016', '2019-03-02 00:00:00', 400, 5, 'Monthly', 0, 5, 0, 0, '0', NULL, '2019-02-28 04:59:06', '1', '2019-03-02 05:04:59', '1', NULL, 'Y', 1, 3, 1),
(17, '0000000017', '2019-03-13 00:00:00', 150000, 5, 'Monthly', 0, 6, 0, 0, '1', NULL, '2019-02-28 05:00:48', '1', '2019-03-02 05:52:43', '1', NULL, 'Y', 1, 2, 1),
(18, '0000000018', '2019-02-20 00:00:00', 400, 10, 'Monthly', 0, 11, 0, 0, '0', NULL, '2019-02-28 07:08:56', '1', '2019-03-02 06:39:16', '1', NULL, 'Y', 1, 5, 1),
(19, '0000000019', '2019-02-01 00:00:00', 400, 10, 'Monthly', 0, 11, 0, 0, '1', NULL, '2019-02-28 07:12:25', '1', '2019-03-02 05:50:06', '1', NULL, 'Y', 1, 5, 1),
(20, '0000000020', '2019-04-17 00:00:00', 400, 10, 'Monthly', 0, 11, 0, 0, '0', NULL, '2019-02-28 07:14:03', '1', '2019-03-02 06:56:06', '1', NULL, 'Y', 1, 5, 1),
(21, '0000000021', '2019-03-13 00:00:00', 400, 10, 'Monthly', 0, 11, 0, 0, '1', NULL, '2019-02-28 07:14:23', '1', '2019-03-02 07:17:08', '1', NULL, 'Y', 1, 5, 1),
(22, '0000000022', '2019-03-01 00:00:00', 100000, 10, 'Monthly', 0, 11, 0, 0, '0', NULL, '2019-02-28 07:14:57', '1', '2019-03-02 05:05:13', '1', NULL, 'Y', 1, 3, 1),
(23, '0000000023', '2019-03-02 00:00:00', 150000, 5, 'Monthly', 0, 11, 0, 0, '1', NULL, '2019-02-28 07:16:24', '1', '2019-03-02 07:34:17', '1', NULL, 'Y', 1, 2, 1),
(24, '0000000024', '2019-03-31 00:00:00', 150000, 5, 'Monthly', 0, 11, 0, 0, '1', NULL, '2019-02-28 07:17:10', '1', '2019-03-02 06:38:15', '1', NULL, 'Y', 1, 5, 1),
(27, '0000000027', '2019-03-30 00:00:00', 150000, 5, 'Yearly', 2, 6, 0, 0, '0', NULL, '2019-02-28 07:19:58', '1', '2019-03-02 06:39:28', '1', NULL, 'Y', 1, 3, 1),
(28, '0000000028', '2019-03-22 00:00:00', 150000, 5, 'Yearly', 1, 5, 0, 0, '1', NULL, '2019-03-01 03:31:22', '1', '2019-03-02 07:21:22', '1', NULL, 'Y', 1, 6, 1),
(29, '0000000029', '2019-03-01 00:00:00', 0, 0, 'Monthly', 0, 0, 0, 0, '', NULL, '2019-03-01 16:31:33', '1', NULL, NULL, NULL, 'Y', 1, 0, 1),
(30, '0000000030', '2019-03-04 00:00:00', 2222, 21, 'Yearly', 1, 2, 0, 0, '', NULL, '2019-03-04 06:49:38', '1', NULL, NULL, NULL, 'Y', 1, 11, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_currency`
--

CREATE TABLE `tbl_currency` (
  `cur_id` int(11) NOT NULL,
  `cur_nm` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cur_nm_kh` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cur_syn` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cur_syn_kh` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) NOT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) DEFAULT NULL,
  `com_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=armscii8;

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

CREATE TABLE `tbl_customer` (
  `cus_id` int(11) NOT NULL,
  `cus_nm` varchar(30) DEFAULT NULL,
  `cus_nm_kh` varchar(30) DEFAULT NULL,
  `cus_gender` varchar(10) DEFAULT NULL,
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
  `com_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_customer`
--

INSERT INTO `tbl_customer` (`cus_id`, `cus_nm`, `cus_nm_kh`, `cus_gender`, `cus_dob`, `cus_photo`, `cus_phone1`, `cus_phone2`, `cus_email`, `cus_addr`, `cus_des`, `cus_idnt_num`, `cus_idnt_type`, `regDt`, `upDt`, `useYn`, `regUsr`, `upUsr`, `com_id`) VALUES
(1, 'customer 00001', 'អតិថិជន 00001', 'Female', '2019-01-01', '/loan/customer/2019-01-26-09-46-29_1_1.jpg', '092333344', '092888822', 'customer00001@gmail.com', 'customer str.', 'customer detail', '123321212', NULL, '2019-01-25 00:00:00', '2019-01-26 09:46:29', 'Y', 1, '1', 1),
(2, 'customer 00002', 'អតិថិជន 00002', 'Male', '1970-01-01', '/loan/customer/2019-01-26-09-46-39_1_1.jpg', '091222233', '098111122', 'staff00002@gmail.com', 'customer 00002 str.', 'customer 00002 description', '112222222', NULL, '2019-01-26 05:06:15', '2019-01-26 09:46:39', 'Y', 1, '1', 1),
(3, 'customer 00003', 'អតិថិជន 00003', 'Male', '1990-01-07', '/loan/customer/2019-01-26-10-08-47_1_1.jpg', '012222233', '012333344', 'customer00003@gmail.com', 'customer 00003 str.', 'customer 00003 detail', '999888809', NULL, '2019-01-26 05:30:50', '2019-01-26 10:08:47', 'Y', 1, '1', 1),
(4, 'customer 00004', 'អតិថិជន 00004', 'Female', '1989-06-02', '', '012223344', '092335577', 'staff00004@gmail.com', 'customer 00004 str.', 'customer 00004 description', '757456445', NULL, '2019-01-26 05:31:55', '2019-02-28 08:04:17', 'Y', 1, '1', 1),
(5, 'customer 00005', 'អតិថិជន 00005', 'Female', '1999-08-12', '/loan/customer/2019-01-26-09-47-15_1_1.jpg', '091222333', '012333444', 'customer00005@gmail.com', 'customer 00005 str.', 'customer 00005 description', '999888877', NULL, '2019-01-26 05:37:09', '2019-01-26 09:47:20', 'Y', 1, '1', 1),
(6, 'customer 00006', 'អតិថិជន 00006', 'Male', '1990-06-02', '/loan/customer/2019-01-26-09-47-04_1_1.jpg', '092222233', '098777766', 'customer00006@gmail.com', 'customer 00006 str.', 'customer 00006 description', '123455321', NULL, '2019-01-26 07:51:18', '2019-01-26 09:47:04', 'Y', 1, '1', 1),
(7, 'customer add on contract', 'បញ្ចូលពី contract', 'Male', '1991-06-03', '/loan/customer/2019-03-02-08-04-41_1_1.png', '092929292', '012121212', 'customerlast@gmail.com', 'customer last str.', 'added from contract', '999888177', NULL, '2019-03-02 08:04:41', '2019-03-02 08:20:11', 'N', 1, '1', 1),
(8, 'added on contract', 'អតិថិជន from contract', 'Male', '1970-01-01', '/loan/customer/2019-03-02-08-19-21_1_1.png', '091212121', '012323232', 'customercontract@gmail.com', 'customer contract.....', 'customer contract', '999888000', NULL, '2019-03-02 08:19:21', '2019-03-02 08:20:11', 'N', 1, '1', 1),
(9, 'resrkkkkkk', 'kkkkkkkkkkk', 'Male', '1970-01-01', '/loan/customer/2019-03-02-08-20-55_1_1.png', '023923834', '098888880', 'customer00006@gmail.com', 'customer 00004 str.', 'customer 00006 description', '876867867', NULL, '2019-03-02 08:20:55', '2019-03-02 08:34:34', 'N', 1, '1', 1),
(10, 'wwwwwwwwwwwww', 'wwwwwwwwwww', 'Male', '2000-07-02', '/loan/customer/2019-03-02-08-33-55_1_1.png', '091212121', '012211212', 'customer00006@gmail.com', 'customer 00003 str.', 'customer 00006 description', '123888192', NULL, '2019-03-02 08:33:55', '2019-03-02 08:34:34', 'N', 1, '1', 1),
(11, 'kkkkkk', 'kkkkkkk', 'Male', '2017-01-10', '/loan/customer/2019-03-02-08-39-13_1_1.png', '012121213', '098112112', 'customer00006@gmail.com', 'customer 00004 str.', 'customer 00006 description', '123123121', NULL, '2019-03-02 08:39:13', NULL, 'Y', 1, '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_import`
--

CREATE TABLE `tbl_import` (
  `imp_id` int(11) NOT NULL,
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
  `com_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_import_detail`
--

CREATE TABLE `tbl_import_detail` (
  `imp_id` int(11) NOT NULL,
  `pro_id` int(11) NOT NULL,
  `pro_unit_price` double DEFAULT NULL,
  `pro_sale_price` double DEFAULT NULL,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `com_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_installment`
--

CREATE TABLE `tbl_installment` (
  `ins_id` int(11) NOT NULL,
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
  `com_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=armscii8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_menu`
--

CREATE TABLE `tbl_menu` (
  `menu_id` int(11) NOT NULL,
  `menu_nm` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `menu_nm_kh` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `regDt` datetime DEFAULT NULL,
  `menu_icon_nm` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `menu_level` int(11) DEFAULT NULL,
  `menu_order` int(11) DEFAULT NULL,
  `menu_group` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_menu`
--

INSERT INTO `tbl_menu` (`menu_id`, `menu_nm`, `menu_nm_kh`, `regDt`, `menu_icon_nm`, `menu_level`, `menu_order`, `menu_group`) VALUES
(1, 'Contract', 'កិច្ចសន្យា', '2018-08-24 01:02:15', 'fa fa-handshake-o', NULL, 2, 1),
(2, 'Payment', 'ការបង់ប្រាក់', '2018-08-24 02:59:23', 'fa fa-pie-chart', NULL, 3, 1),
(4, 'Customer', 'អតិថិជន', '2018-08-24 02:59:23', 'fa fa-users', 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_menu_company`
--

CREATE TABLE `tbl_menu_company` (
  `menu_id` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  `upDt` datetime DEFAULT NULL,
  `regDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL
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

CREATE TABLE `tbl_menu_user` (
  `menu_id` int(11) NOT NULL,
  `usr_id` int(11) NOT NULL,
  `upDt` datetime DEFAULT NULL,
  `regDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL
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

CREATE TABLE `tbl_move` (
  `mov_id` int(11) NOT NULL,
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
  `com_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_move_detail`
--

CREATE TABLE `tbl_move_detail` (
  `mov_id` int(11) NOT NULL,
  `pro_id` int(11) NOT NULL,
  `pro_qty` int(11) NOT NULL,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `com_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payment`
--

CREATE TABLE `tbl_payment` (
  `pay_id` int(11) NOT NULL,
  `pay_no` varchar(20) NOT NULL,
  `pay_loan` double DEFAULT NULL,
  `pay_int` double DEFAULT NULL,
  `pay_loan_int` double DEFAULT NULL,
  `pay_loan_int_type` varchar(20) DEFAULT NULL,
  `pay_date` datetime DEFAULT NULL,
  `pay_des` varchar(100) DEFAULT NULL,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) DEFAULT NULL,
  `regUsr` int(11) DEFAULT NULL,
  `upUsr` int(11) DEFAULT NULL,
  `com_id` int(11) DEFAULT NULL,
  `con_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=armscii8;

--
-- Dumping data for table `tbl_payment`
--

INSERT INTO `tbl_payment` (`pay_id`, `pay_no`, `pay_loan`, `pay_int`, `pay_loan_int`, `pay_loan_int_type`, `pay_date`, `pay_des`, `regDt`, `upDt`, `useYn`, `regUsr`, `upUsr`, `com_id`, `con_id`) VALUES
(8, '0000000001', 0, 10333.33, 10, '1', '2019-04-01 00:00:00', '', '2019-03-06 16:15:50', NULL, 'Y', 1, NULL, 1, 9),
(9, '0000000009', 0, 1666.67, 10, '1', '2019-03-06 00:00:00', '', '2019-03-06 16:42:20', NULL, 'Y', 1, NULL, 1, 22);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_position`
--

CREATE TABLE `tbl_position` (
  `pos_id` int(11) NOT NULL,
  `pos_nm` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `pos_nm_kh` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pos_des` text COLLATE utf8_unicode_ci,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `com_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_position`
--

INSERT INTO `tbl_position` (`pos_id`, `pos_nm`, `pos_nm_kh`, `pos_des`, `regDt`, `upDt`, `useYn`, `regUsr`, `upUsr`, `com_id`) VALUES
(1, 'Admin', 'ម្ចាស់ក្រុមហ៊ុន', NULL, '2019-01-07 16:53:06', NULL, 'Y', 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product`
--

CREATE TABLE `tbl_product` (
  `pro_id` int(11) NOT NULL,
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
  `com_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_staff`
--

CREATE TABLE `tbl_staff` (
  `sta_id` int(11) NOT NULL,
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
  `com_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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

CREATE TABLE `tbl_stock` (
  `sto_id` int(11) NOT NULL,
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
  `com_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stock_product`
--

CREATE TABLE `tbl_stock_product` (
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
  `com_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_supplier`
--

CREATE TABLE `tbl_supplier` (
  `sup_id` int(11) NOT NULL,
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
  `pos_nm_kh` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_supplier`
--

INSERT INTO `tbl_supplier` (`sup_id`, `sup_nm`, `sup_phone`, `sup_email`, `sup_addr`, `sup_des`, `sup_cont`, `regDt`, `upDt`, `useYn`, `regUsr`, `upUsr`, `com_id`, `sup_nm_kh`, `pos_nm`, `pos_nm_kh`) VALUES
(1, '', NULL, NULL, NULL, NULL, NULL, '2019-01-27 20:36:17', NULL, 'Y', 0, 0, 5, NULL, 'Admin', 'ម្ចាស់ក្រុមហ៊ុន');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_use`
--

CREATE TABLE `tbl_use` (
  `use_id` int(11) NOT NULL,
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
  `com_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `usr_id` int(11) NOT NULL,
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
  `usr_str` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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

CREATE TABLE `tbl_use_detail` (
  `use_id` int(11) NOT NULL,
  `pro_id` int(11) NOT NULL,
  `pro_qty` int(11) DEFAULT NULL,
  `use_status` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `com_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_use_detail_status`
--

CREATE TABLE `tbl_use_detail_status` (
  `use_stat_id` int(11) NOT NULL,
  `use_id` int(11) NOT NULL,
  `pro_id` int(11) NOT NULL,
  `use_stat_des` text COLLATE utf8_unicode_ci,
  `regDt` datetime DEFAULT NULL,
  `upDt` datetime DEFAULT NULL,
  `useYn` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `regUsr` int(11) NOT NULL,
  `upUsr` int(11) NOT NULL,
  `com_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_branch`
--
ALTER TABLE `tbl_branch`
  ADD PRIMARY KEY (`bra_id`);

--
-- Indexes for table `tbl_branch_type`
--
ALTER TABLE `tbl_branch_type`
  ADD PRIMARY KEY (`bra_type_id`);

--
-- Indexes for table `tbl_category`
--
ALTER TABLE `tbl_category`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `tbl_company`
--
ALTER TABLE `tbl_company`
  ADD PRIMARY KEY (`com_id`);

--
-- Indexes for table `tbl_contract`
--
ALTER TABLE `tbl_contract`
  ADD PRIMARY KEY (`con_id`),
  ADD UNIQUE KEY `con_no` (`con_no`);

--
-- Indexes for table `tbl_currency`
--
ALTER TABLE `tbl_currency`
  ADD PRIMARY KEY (`cur_id`);

--
-- Indexes for table `tbl_customer`
--
ALTER TABLE `tbl_customer`
  ADD PRIMARY KEY (`cus_id`);

--
-- Indexes for table `tbl_import`
--
ALTER TABLE `tbl_import`
  ADD PRIMARY KEY (`imp_id`);

--
-- Indexes for table `tbl_import_detail`
--
ALTER TABLE `tbl_import_detail`
  ADD PRIMARY KEY (`imp_id`,`pro_id`);

--
-- Indexes for table `tbl_installment`
--
ALTER TABLE `tbl_installment`
  ADD PRIMARY KEY (`ins_id`);

--
-- Indexes for table `tbl_menu`
--
ALTER TABLE `tbl_menu`
  ADD PRIMARY KEY (`menu_id`);

--
-- Indexes for table `tbl_menu_company`
--
ALTER TABLE `tbl_menu_company`
  ADD PRIMARY KEY (`menu_id`,`com_id`);

--
-- Indexes for table `tbl_menu_user`
--
ALTER TABLE `tbl_menu_user`
  ADD PRIMARY KEY (`menu_id`,`usr_id`);

--
-- Indexes for table `tbl_move`
--
ALTER TABLE `tbl_move`
  ADD PRIMARY KEY (`mov_id`);

--
-- Indexes for table `tbl_move_detail`
--
ALTER TABLE `tbl_move_detail`
  ADD PRIMARY KEY (`mov_id`,`pro_id`);

--
-- Indexes for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  ADD PRIMARY KEY (`pay_id`);

--
-- Indexes for table `tbl_position`
--
ALTER TABLE `tbl_position`
  ADD PRIMARY KEY (`pos_id`);

--
-- Indexes for table `tbl_product`
--
ALTER TABLE `tbl_product`
  ADD PRIMARY KEY (`pro_id`);

--
-- Indexes for table `tbl_staff`
--
ALTER TABLE `tbl_staff`
  ADD PRIMARY KEY (`sta_id`);

--
-- Indexes for table `tbl_stock`
--
ALTER TABLE `tbl_stock`
  ADD PRIMARY KEY (`sto_id`);

--
-- Indexes for table `tbl_stock_product`
--
ALTER TABLE `tbl_stock_product`
  ADD PRIMARY KEY (`sto_id`,`pro_id`);

--
-- Indexes for table `tbl_supplier`
--
ALTER TABLE `tbl_supplier`
  ADD PRIMARY KEY (`sup_id`);

--
-- Indexes for table `tbl_use`
--
ALTER TABLE `tbl_use`
  ADD PRIMARY KEY (`use_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`usr_id`);

--
-- Indexes for table `tbl_use_detail`
--
ALTER TABLE `tbl_use_detail`
  ADD PRIMARY KEY (`use_id`,`pro_id`);

--
-- Indexes for table `tbl_use_detail_status`
--
ALTER TABLE `tbl_use_detail_status`
  ADD PRIMARY KEY (`use_stat_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_branch`
--
ALTER TABLE `tbl_branch`
  MODIFY `bra_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_branch_type`
--
ALTER TABLE `tbl_branch_type`
  MODIFY `bra_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_company`
--
ALTER TABLE `tbl_company`
  MODIFY `com_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tbl_contract`
--
ALTER TABLE `tbl_contract`
  MODIFY `con_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `tbl_currency`
--
ALTER TABLE `tbl_currency`
  MODIFY `cur_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tbl_customer`
--
ALTER TABLE `tbl_customer`
  MODIFY `cus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `tbl_import`
--
ALTER TABLE `tbl_import`
  MODIFY `imp_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_installment`
--
ALTER TABLE `tbl_installment`
  MODIFY `ins_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_menu`
--
ALTER TABLE `tbl_menu`
  MODIFY `menu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tbl_move`
--
ALTER TABLE `tbl_move`
  MODIFY `mov_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  MODIFY `pay_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `tbl_position`
--
ALTER TABLE `tbl_position`
  MODIFY `pos_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_product`
--
ALTER TABLE `tbl_product`
  MODIFY `pro_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_staff`
--
ALTER TABLE `tbl_staff`
  MODIFY `sta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_stock`
--
ALTER TABLE `tbl_stock`
  MODIFY `sto_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_supplier`
--
ALTER TABLE `tbl_supplier`
  MODIFY `sup_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_use`
--
ALTER TABLE `tbl_use`
  MODIFY `use_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `usr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_use_detail_status`
--
ALTER TABLE `tbl_use_detail_status`
  MODIFY `use_stat_id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
