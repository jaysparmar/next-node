-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2023 at 10:21 PM
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
  `role_id` int(11) NOT NULL,
  `access_token` text NOT NULL,
  `permission_reset` enum('0','1') NOT NULL DEFAULT '0',
  `created` datetime DEFAULT current_timestamp(),
  `updated` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `firstname`, `lastname`, `email`, `password`, `status`, `role_id`, `access_token`, `permission_reset`, `created`, `updated`) VALUES
(1, 'Super', 'Admin', 'admin@admin.com', '25d55ad283aa400af464c76d713c07ad', '1', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiU3VwZXIiLCJsYXN0bmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJzdGF0dXMiOiIxIiwicm9sZV9pZCI6MSwicGVybWlzc2lvbl9yZXNldCI6IjAiLCJjcmVhdGVkIjoiMjAyMi0xMi0yMFQxMDoyMjo1Ni4wMDBaIiwidXBkYXRlZCI6IjIwMjMtMTEtMDNUMjE6NTc6MzcuMDAwWiIsImZ1bGxOYW1lIjoiU3VwZXIgQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTkwNDg3ODgsImV4cCI6MTY5OTA1NTk4OH0.bwK7NnZYmgdQUFc_Q98dUMaxzJmYEH9n_n4c-L8QZrY', '0', '2022-12-20 15:52:56', '2023-11-04 03:50:32'),
(83, 'Ajay', 'Chauhan', 'meet@admin.com', '25d55ad283aa400af464c76d713c07ad', '1', 12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODMsImZpcnN0bmFtZSI6IkFqYXkiLCJsYXN0bmFtZSI6IkNoYXVoYW4iLCJlbWFpbCI6Im1lZXRAYWRtaW4uY29tIiwic3RhdHVzIjoiMSIsInJvbGVfaWQiOjEsImFjY2Vzc190b2tlbiI6IiIsInBlcm1pc3Npb25fcmVzZXQiOiIwIiwiY3JlYXRlZCI6IjIwMjMtMDMtMjFUMTQ6Mjk6MjkuMDAwWiIsInVwZGF0ZWQiOiIyMDIzLTExLTAzVDIxOjA1OjI1LjAwMFoiLCJmdWxsTmFtZSI6IkFqYXkgQ2hhdWhhbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5OTA0NTUzMCwiZXhwIjoxNjk5MDUyNzMwfQ.S8vjR60gjFiQgsVt4bWuRgjjH9AzGbtlBIyp7tjQ0nA', '0', '2023-03-21 19:59:29', '2023-11-04 03:36:03');

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
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `permissions` text NOT NULL DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `permissions`) VALUES
(1, 'Admin', '[\"admin-create\",\"admin-delete\",\"admin-update\",\"admin-write\",\"admin-read\"]'),
(16, 'Jay', '[\"admin-read\",\"admin-write\",\"admin-update\",\"admin-delete\",\"chat-read\",\"chat-write\",\"chat-update\",\"chat-delete\",\"settings-read\",\"settings-write\",\"settings-update\",\"x-read\",\"x-write\",\"x-update\",\"x-delete\"]'),
(17, 'test', '[\"settings-write\",\"chat-write\"]'),
(18, 'asd', '[\"admin-read\",\"admin-delete\",\"admin-update\"]'),
(19, 'vdsgb', '[\"admin-read\",\"admin-write\",\"admin-update\",\"admin-delete\",\"chat-read\",\"chat-write\",\"chat-update\",\"chat-delete\",\"settings-read\",\"settings-write\",\"settings-update\",\"x-read\",\"x-write\",\"x-update\",\"x-delete\"]'),
(20, 'fdsfsdgfasdc', '[\"admin-read\",\"admin-write\",\"admin-update\",\"admin-delete\",\"chat-read\",\"chat-write\",\"chat-update\",\"chat-delete\",\"settings-read\",\"settings-write\",\"settings-update\",\"x-read\",\"x-write\",\"x-update\",\"x-delete\"]');

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
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wp_id` (`wp_id`,`reply_id`,`wp_from`,`wp_to`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
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
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
