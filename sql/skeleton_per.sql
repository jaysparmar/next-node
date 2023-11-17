-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2023 at 07:26 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medsers`
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
  `role_id` int(11) NOT NULL,
  `access_token` text NOT NULL,
  `permission_reset` enum('0','1') NOT NULL DEFAULT '0',
  `created` datetime DEFAULT current_timestamp(),
  `updated` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `firstname`, `lastname`, `email`, `password`, `status`, `role_id`, `access_token`, `permission_reset`, `created`, `updated`) VALUES
(1, 'Super', 'Admin', 'admin@admin.com', '25d55ad283aa400af464c76d713c07ad', '1', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiU3VwZXIiLCJsYXN0bmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJzdGF0dXMiOiIxIiwicm9sZV9pZCI6MSwicGVybWlzc2lvbl9yZXNldCI6IjAiLCJjcmVhdGVkIjoiMjAyMi0xMi0yMFQxMDoyMjo1Ni4wMDBaIiwidXBkYXRlZCI6IjIwMjMtMTEtMDhUMTQ6MjI6MzQuMDAwWiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDAxNTYzOTEsImV4cCI6MTcwMDE2MzU5MX0.qgLPg2FynT23SicJZfAUF8jy7_5HdHNhWMMLBemUT34', '0', '2022-12-20 15:52:56', '2023-11-16 23:09:51'),
(83, 'Jay', 'Parmar', 'jay@admin.com', '25d55ad283aa400af464c76d713c07ad', '1', 12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODMsImZpcnN0bmFtZSI6IkpheSIsImxhc3RuYW1lIjoiUGFybWFyIiwiZW1haWwiOiJqYXlAYWRtaW4uY29tIiwic3RhdHVzIjoiMSIsInJvbGVfaWQiOjEyLCJwZXJtaXNzaW9uX3Jlc2V0IjoiMCIsImNyZWF0ZWQiOiIyMDIzLTAzLTIxVDE0OjI5OjI5LjAwMFoiLCJ1cGRhdGVkIjoiMjAyMy0xMS0wNlQwNDo0Mjo1MC4wMDBaIiwiZnVsbE5hbWUiOiJKYXkgUGFybWFyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk5MjQ2NTYzLCJleHAiOjE2OTkyNTM3NjN9.QkPmTIt6pcyvc6AVybgZ_-hBO0Gd2bra0a-u7znK38U', '0', '2023-03-21 19:59:29', '2023-11-06 10:26:12');

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `wp_id`, `reply_id`, `wp_from`, `wp_to`, `type`, `caption`, `message`, `file_path`, `read_at`, `delivered_at`, `created_at`) VALUES
(20, 'wamid.HBgMOTE5ODk4NTI4MjU3FQIAEhgUM0E5RkQxMjQ0RkM5RTNGMTE4ODMA', NULL, '919898528257', '128759850119056', 'image', NULL, NULL, 'public/assets/1698720575052.jpg', NULL, NULL, '2023-10-31 08:19:35'),
(21, 'wamid.HBgMOTE5ODk4NTI4MjU3FQIAERgSODE5NERBNDFDQjY4NDhCRUYyAA==', 'wamid.HBgMOTE5ODk4NTI4MjU3FQIAEhgUM0E5RkQxMjQ0RkM5RTNGMTE4ODMA', '128759850119056', '919898528257', 'text', NULL, 'Thank you for contacting medsers your prescription is being reviewed.', 'public/assets/1698720575052.jpg', NULL, NULL, '2023-10-31 08:19:35'),
(22, 'wamid.HBgMOTE5ODk4NTI4MjU3FQIAEhgUM0EwOTM0QzhFOEExRkQyQTBDRkYA', NULL, '919898528257', '128759850119056', 'image', NULL, NULL, 'public/assets/1699365300646.jpg', NULL, NULL, '2023-11-07 19:25:00'),
(23, 'wamid.HBgMOTE5ODk4NTI4MjU3FQIAERgSQUY1RDEwODU3NDk1RDhDQzBCAA==', NULL, '128759850119056', '919898528257', 'text', NULL, 'Thank you for contacting medsers your prescription is being reviewed.', 'public/assets/1699365300646.jpg', '1970-01-20 09:32:45', NULL, '2023-11-07 19:25:02'),
(24, 'wamid.HBgMOTE5ODk4NTI4MjU3FQIAEhgUM0E0RTMzRTZGRkJGOEJGNjIwNUUA', NULL, '919898528257', '128759850119056', 'image', NULL, NULL, 'public/assets/1699365655368.jpg', NULL, NULL, '2023-11-07 19:30:55'),
(25, 'wamid.HBgMOTE5ODk4NTI4MjU3FQIAERgSOTYyNDE0NDE1NkI5QzgyOTAwAA==', NULL, '128759850119056', '919898528257', 'text', NULL, 'Thank you for contacting medsers your prescription is being reviewed. Please select address from the link to get the best quote. http://localhost:3000/orders/[object Object]', 'public/assets/1699365655368.jpg', NULL, '1970-01-20 09:32:45', '2023-11-07 19:30:56'),
(26, 'wamid.HBgMOTE5ODk4NTI4MjU3FQIAEhgUM0FDOTFCQzg3M0VFREQxMTYwREIA', NULL, '919898528257', '128759850119056', 'image', NULL, NULL, 'public/assets/1699365691773.jpg', NULL, NULL, '2023-11-07 19:31:31'),
(27, 'wamid.HBgMOTE5ODk4NTI4MjU3FQIAERgSRjhEODZGQTUxMjVGNjZFQzBBAA==', NULL, '128759850119056', '919898528257', 'text', NULL, 'Thank you for contacting medsers your prescription is being reviewed. Please select address from the link to get the best quote. http://localhost:3000/orders/[object Object]', 'public/assets/1699365691773.jpg', '1970-01-20 09:32:45', NULL, '2023-11-07 19:31:32'),
(28, 'wamid.HBgMOTE5MDE2Mzc5Mzc0FQIAEhgWM0VCMDlCNDVBODU0OTRGMUU4RjE2QgA=', NULL, '919016379374', '128759850119056', 'image', NULL, NULL, 'public/assets/1699366201127.jpg', NULL, NULL, '2023-11-07 19:40:01'),
(29, 'wamid.HBgMOTE5MDE2Mzc5Mzc0FQIAERgSMkQ4NUVDOUMwMTg0NjhDRTkxAA==', NULL, '128759850119056', '919016379374', 'text', NULL, 'Thank you for contacting medsers your prescription is being reviewed. Please select address from the link to get the best quote. http://localhost:3000/orders/[object Object]', 'public/assets/1699366201127.jpg', '1970-01-20 09:32:46', NULL, '2023-11-07 19:40:02'),
(30, 'wamid.HBgMOTE5MDE2Mzc5Mzc0FQIAEhgWM0VCMDgzMUM1RDcxQkFFMzc2RDU2RgA=', NULL, '919016379374', '128759850119056', 'image', NULL, NULL, 'public/assets/1699366245658.jpg', NULL, NULL, '2023-11-07 19:40:45'),
(31, 'wamid.HBgMOTE5MDE2Mzc5Mzc0FQIAERgSMDI5QzQxOTRENjMxODc0OEVCAA==', NULL, '128759850119056', '919016379374', 'text', NULL, 'Thank you for contacting medsers your prescription is being reviewed. Please select address from the link to get the best quote. http://localhost:3000/orders/[object Object]', 'public/assets/1699366245658.jpg', '1970-01-20 09:32:46', NULL, '2023-11-07 19:40:47'),
(32, 'wamid.HBgMOTE5MDE2Mzc5Mzc0FQIAEhgWM0VCMEREQTIzQzMyMzVDNDU2MzY3OAA=', NULL, '919016379374', '128759850119056', 'image', NULL, NULL, 'public/assets/1699366303451.jpg', NULL, NULL, '2023-11-07 19:41:43'),
(33, 'wamid.HBgMOTE5MDE2Mzc5Mzc0FQIAERgSMTZFNEM0MDAyNkNDQkU3MjAzAA==', NULL, '128759850119056', '919016379374', 'text', NULL, 'Thank you for contacting medsers your prescription is being reviewed. Please select address from the link to get the best quote. http://localhost:3000/orders/[object Object]', 'public/assets/1699366303451.jpg', '1970-01-20 09:32:46', NULL, '2023-11-07 19:41:44'),
(34, 'wamid.HBgMOTE5MDE2Mzc5Mzc0FQIAEhgWM0VCMDNGQTE5NzczRDQ1QjdDOUU1OQA=', NULL, '919016379374', '128759850119056', 'image', NULL, NULL, 'public/assets/1699366382289.jpg', NULL, NULL, '2023-11-07 19:43:02'),
(35, 'wamid.HBgMOTE5MDE2Mzc5Mzc0FQIAERgSOTlGNTE5N0EwQjhENDVCQTBGAA==', NULL, '128759850119056', '919016379374', 'text', NULL, 'Thank you for contacting medsers your prescription is being reviewed. Please select address from the link to get the best quote. http://localhost:3000/orders/7', 'public/assets/1699366382289.jpg', NULL, '1970-01-20 09:32:46', '2023-11-07 19:43:03'),
(36, 'wamid.HBgMOTE5MDE2Mzc5Mzc0FQIAEhgWM0VCMDQyM0YzNjU2OUU2OTAwQ0U0QQA=', NULL, '919016379374', '128759850119056', 'image', NULL, NULL, 'public/assets/1699379609367.jpg', NULL, NULL, '2023-11-07 23:23:29'),
(37, 'wamid.HBgMOTE5MDE2Mzc5Mzc0FQIAERgSQkIzMkExN0VFMkI0NDE4ODZDAA==', NULL, '128759850119056', '919016379374', 'text', NULL, 'Thank you for contacting medsers your prescription is being reviewed. Please select address from the link to get the best quote. http://localhost:3000/orders/8', 'public/assets/1699379609367.jpg', '1970-01-20 09:32:59', NULL, '2023-11-07 23:23:30'),
(38, 'wamid.HBgMOTE5MDE2Mzc5Mzc0FQIAEhgWM0VCMDVGRkEyNzg3MDJGRTUxNERGRgA=', NULL, '919016379374', '128759850119056', 'image', NULL, NULL, 'public/assets/1699379684468.jpg', NULL, NULL, '2023-11-07 23:24:44'),
(39, 'wamid.HBgMOTE5MDE2Mzc5Mzc0FQIAERgSODRBOTgyNUQwMEEzNDVFMEM5AA==', NULL, '128759850119056', '919016379374', 'text', NULL, 'Thank you for contacting medsers your prescription is being reviewed. Please select address from the link to get the best quote. http://localhost:3000/orders/9', 'public/assets/1699379684468.jpg', NULL, '1970-01-20 09:32:59', '2023-11-07 23:24:45'),
(40, 'wamid.HBgMOTE5MDE2Mzc5Mzc0FQIAEhgWM0VCMEFDMTM4MUEwQjczNTFGQzI1NgA=', NULL, '919016379374', '128759850119056', 'image', NULL, NULL, 'public/assets/1699453218399.jpg', NULL, NULL, '2023-11-08 19:50:18'),
(41, 'wamid.HBgMOTE5MDE2Mzc5Mzc0FQIAERgSNTk0NjkzMDk5OTA5NTI1MEREAA==', NULL, '128759850119056', '919016379374', 'text', NULL, 'Thank you for contacting medsers your prescription is being reviewed. Please select address from the link to get the best quote. http://localhost:3000/orders/10', 'public/assets/1699453218399.jpg', '1970-01-20 09:34:13', NULL, '2023-11-08 19:50:19'),
(42, 'wamid.HBgMOTE5MDE2Mzc5Mzc0FQIAEhgWM0VCMDJDODNEQTA1NTZCNjc0Q0EwQgA=', NULL, '919016379374', '128759850119056', 'image', NULL, NULL, 'public/assets/1699453228818.jpg', NULL, NULL, '2023-11-08 19:50:28'),
(43, 'wamid.HBgMOTE5MDE2Mzc5Mzc0FQIAERgSMTZBQjJFOTc3QjQ2RTlFQzFFAA==', NULL, '128759850119056', '919016379374', 'text', NULL, 'Thank you for contacting medsers your prescription is being reviewed. Please select address from the link to get the best quote. http://localhost:3000/orders/11', 'public/assets/1699453228818.jpg', '1970-01-20 09:34:13', NULL, '2023-11-08 19:50:29');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `number` varchar(255) DEFAULT NULL,
  `asset_url` varchar(255) DEFAULT NULL,
  `pharmacy_id` int(11) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `status` enum('awaiting','quote_sent','processing','transit','complete') NOT NULL DEFAULT 'awaiting'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `number`, `asset_url`, `pharmacy_id`, `amount`, `status`) VALUES
(1, '919898528257', 'public/assets/1699365300646.jpg', NULL, NULL, 'awaiting'),
(2, '919898528257', 'public/assets/1699365655368.jpg', NULL, NULL, 'awaiting'),
(3, '919898528257', 'public/assets/1699365691773.jpg', NULL, NULL, 'awaiting'),
(4, '919016379374', 'public/assets/1699366201127.jpg', NULL, NULL, 'awaiting'),
(5, '919016379374', 'public/assets/1699366245658.jpg', NULL, NULL, 'awaiting'),
(6, '919016379374', 'public/assets/1699366303451.jpg', NULL, NULL, 'awaiting'),
(7, '919016379374', 'public/assets/1699366382289.jpg', NULL, NULL, 'awaiting'),
(8, '919016379374', 'public/assets/1699379609367.jpg', NULL, NULL, 'awaiting'),
(9, '919016379374', 'public/assets/1699379684468.jpg', NULL, NULL, 'awaiting'),
(10, '919016379374', 'public/assets/1699453218399.jpg', NULL, NULL, 'awaiting'),
(11, '919016379374', 'public/assets/1699453228818.jpg', NULL, NULL, 'awaiting');

-- --------------------------------------------------------

--
-- Table structure for table `pharmacies`
--

CREATE TABLE `pharmacies` (
  `id` int(11) NOT NULL,
  `pharmacy_name` varchar(255) NOT NULL,
  `owner_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `whatsapp_no` varchar(255) NOT NULL,
  `bank_ifsc` varchar(255) DEFAULT NULL,
  `bank_account_number` varchar(255) DEFAULT NULL,
  `awards` varchar(255) DEFAULT NULL,
  `license_no` varchar(255) DEFAULT NULL,
  `lat` varchar(255) NOT NULL,
  `lng` varchar(255) NOT NULL,
  `status` enum('pending','active','inactive') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pharmacies`
--

INSERT INTO `pharmacies` (`id`, `pharmacy_name`, `owner_name`, `email`, `whatsapp_no`, `bank_ifsc`, `bank_account_number`, `awards`, `license_no`, `lat`, `lng`, `status`) VALUES
(1, 'manoj-espeech', 'sdf', 'ghfghf', 'fhfhf', 'fhfh', '', 'ghjghj', 'fhgfhf', '23.242078565188933', '69.66045218302003', 'pending'),
(2, 'manoj-espeech', 'sdf', 'ghfghf', 'fhfhf', 'fhfh', '33618100000001', 'ghjghj', 'fhgfhf', '23.242078565188933', '69.66045218302003', 'pending'),
(3, 'manoj-espeech', 'sdf', 'ghfghf', 'fhfhf', 'fhfh', '33618100000001', 'ghjghj', 'fhgfhf', '23.09155038517213', '69.52166894526059', 'pending'),
(4, 'Jay', 'Jay Parmar', 'jaysspspsp@gmail.com', '9898528257', 'BARB0Dahkut', '33618100000001', 'test', '12345678', '19.07618649332822', '72.8862818841919', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `permissions` text NOT NULL DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `permissions`) VALUES
(1, 'Admin', '[\"admin-read\",\"chat-read\",\"chat-write\",\"chat-update\",\"chat-delete\",\"settings-read\",\"settings-write\",\"settings-update\",\"x-read\",\"x-write\",\"x-update\",\"x-delete\",\"admin-update\",\"admin-delete\"]'),
(12, 'Jay', '[\"admin-read\",\"chat-read\",\"chat-write\",\"chat-update\",\"chat-delete\",\"settings-read\",\"settings-write\",\"settings-update\",\"x-read\",\"x-write\",\"x-update\",\"x-delete\",\"admin-update\",\"admin-delete\",\"admin-write\"]'),
(17, 'test', '[\"settings-write\",\"chat-write\"]'),
(18, 'asd', '[\"admin-read\",\"admin-delete\",\"admin-update\"]'),
(19, 'vdsgb', '[\"admin-read\",\"admin-write\",\"admin-update\",\"admin-delete\",\"chat-read\",\"chat-write\",\"chat-update\",\"chat-delete\",\"settings-read\",\"settings-write\",\"settings-update\",\"x-read\",\"x-write\",\"x-update\",\"x-delete\"]'),
(20, 'fdsfsdgfasdc', '[\"admin-read\",\"admin-write\",\"admin-update\",\"admin-delete\",\"chat-read\",\"chat-write\",\"chat-update\",\"chat-delete\",\"settings-read\",\"settings-write\",\"settings-update\",\"x-read\",\"x-write\",\"x-update\",\"x-delete\"]'),
(21, '', '[\"admin-read\",\"admin-write\",\"admin-update\",\"admin-delete\",\"chat-read\",\"chat-write\",\"chat-update\",\"chat-delete\",\"settings-read\",\"settings-write\",\"settings-update\",\"x-read\",\"x-write\",\"x-update\",\"x-delete\"]'),
(22, 'new-Role', '[]'),
(23, 'jagdish', '[\"admin-read\",\"admin-write\",\"admin-update\",\"admin-delete\",\"chat-read\",\"chat-write\",\"chat-update\",\"chat-delete\",\"settings-read\",\"settings-write\",\"settings-update\",\"x-read\",\"x-write\",\"x-update\",\"x-delete\"]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wp_id` (`wp_id`,`reply_id`,`wp_from`,`wp_to`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pharmacies`
--
ALTER TABLE `pharmacies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
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
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `pharmacies`
--
ALTER TABLE `pharmacies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
