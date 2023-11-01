-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2023 at 03:44 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medser`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(10) UNSIGNED NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(35) NOT NULL,
  `status` enum('1','2') NOT NULL COMMENT '1=active,2=inactive',
  `role` varchar(255) NOT NULL DEFAULT '''1''',
  `created` datetime DEFAULT current_timestamp(),
  `updated` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `firstname`, `lastname`, `email`, `password`, `status`, `role`, `created`, `updated`) VALUES
(26, 'Super', 'Admin', 'admin@admin.com', '25d55ad283aa400af464c76d713c07ad', '1', '1', '2022-12-20 15:52:56', '2023-03-20 19:50:23'),
(83, 'Ajay', 'Chauhan', 'ajay@ditinterective.com', '25d55ad283aa400af464c76d713c07ad', '1', '2', '2023-03-21 19:59:29', '2023-03-21 20:00:10');

-- --------------------------------------------------------

--
-- Table structure for table `admin_roles`
--

CREATE TABLE `admin_roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_roles`
--

INSERT INTO `admin_roles` (`id`, `role_name`) VALUES
(1, 'admin'),
(2, 'HR');

-- --------------------------------------------------------

--
-- Table structure for table `admin_roles_permissions`
--

CREATE TABLE `admin_roles_permissions` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `module_id` int(11) NOT NULL,
  `readP` enum('0','1') NOT NULL DEFAULT '0',
  `createP` enum('0','1') NOT NULL DEFAULT '0',
  `updateP` enum('0','1') NOT NULL DEFAULT '0',
  `deleteP` enum('0','1') NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_roles_permissions`
--

INSERT INTO `admin_roles_permissions` (`id`, `role_id`, `module_id`, `readP`, `createP`, `updateP`, `deleteP`) VALUES
(909, 1, 1, '1', '1', '1', '1'),
(910, 1, 2, '1', '1', '1', '1'),
(911, 1, 3, '1', '1', '1', '1'),
(912, 1, 4, '1', '1', '1', '1'),
(925, 2, 1, '1', '1', '1', '1'),
(926, 2, 2, '1', '0', '0', '0'),
(927, 2, 3, '0', '0', '0', '0'),
(928, 2, 4, '0', '0', '0', '0');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` text DEFAULT NULL,
  `status` enum('1','2') NOT NULL DEFAULT '1' COMMENT '1 = active, 2 = delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `name`, `image`, `status`) VALUES
(7, 'Y111', '88528mare_orientale_nov_27_2021_tglenn_fullsize_jpg.jpg', '1'),
(8, 'N1', NULL, '1'),
(9, 'Asa', NULL, '1');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `wp_id` varchar(255) NOT NULL,
  `reply_id` varchar(255) DEFAULT NULL,
  `wp_from` varchar(255) NOT NULL,
  `wp_to` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `caption` text DEFAULT NULL,
  `message` text DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `read_at` datetime DEFAULT NULL,
  `delivered_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `wp_id`, `reply_id`, `wp_from`, `wp_to`, `type`, `caption`, `message`, `file_path`, `read_at`, `delivered_at`, `created_at`) VALUES
(20, 'wamid.HBgMOTE5ODk4NTI4MjU3FQIAEhgUM0E5RkQxMjQ0RkM5RTNGMTE4ODMA', NULL, '919898528257', '128759850119056', 'image', NULL, NULL, 'public/assets/1698720575052.jpg', NULL, NULL, '2023-10-31 08:19:35'),
(21, 'wamid.HBgMOTE5ODk4NTI4MjU3FQIAERgSODE5NERBNDFDQjY4NDhCRUYyAA==', 'wamid.HBgMOTE5ODk4NTI4MjU3FQIAEhgUM0E5RkQxMjQ0RkM5RTNGMTE4ODMA', '128759850119056', '919898528257', 'text', NULL, 'Thank you for contacting medsers your prescription is being reviewed.', 'public/assets/1698720575052.jpg', NULL, NULL, '2023-10-31 08:19:35');

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `id` int(11) NOT NULL,
  `module_key` varchar(255) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1' COMMENT '0 - INACTIVE, 1 - ACTIVE\r\n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `module_key`, `status`) VALUES
(1, 'dashboards', '1'),
(2, 'products', '1'),
(3, 'admin', '1'),
(4, 'roles', '1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_roles`
--
ALTER TABLE `admin_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_roles_permissions`
--
ALTER TABLE `admin_roles_permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wp_id` (`wp_id`,`reply_id`,`wp_from`,`wp_to`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `admin_roles`
--
ALTER TABLE `admin_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `admin_roles_permissions`
--
ALTER TABLE `admin_roles_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=929;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
