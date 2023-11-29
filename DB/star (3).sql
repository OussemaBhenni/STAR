-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 29, 2023 at 11:43 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `star`
--

-- --------------------------------------------------------

--
-- Table structure for table `cours`
--

CREATE TABLE `cours` (
  `idCours` int(11) NOT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `duree` int(11) DEFAULT NULL,
  `nbrDeVue` int(11) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `createdBy` text DEFAULT NULL,
  `dateCreation` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cours`
--

INSERT INTO `cours` (`idCours`, `titre`, `description`, `duree`, `nbrDeVue`, `image`, `createdBy`, `dateCreation`) VALUES
(1, 'Angular', 'test', 1, NULL, 'D:\\Other Works\\STAR\\images\\7btt88.jpg', NULL, '2023-11-29 22:03:04');

-- --------------------------------------------------------

--
-- Table structure for table `lecon`
--

CREATE TABLE `lecon` (
  `idLecon` int(11) NOT NULL,
  `ordre` int(11) DEFAULT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `contenu` text DEFAULT NULL,
  `duree` int(11) DEFAULT NULL,
  `idCours` int(11) DEFAULT NULL,
  `dateCreation` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `idUtilisateur` int(11) NOT NULL,
  `nom_prenom` varchar(255) DEFAULT NULL,
  `adresse` text DEFAULT NULL,
  `photo` text DEFAULT NULL,
  `grade` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mdp` text DEFAULT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `resetPasswordExpires` datetime DEFAULT NULL,
  `createdBy` text DEFAULT NULL,
  `dateCreation` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`idUtilisateur`, `nom_prenom`, `adresse`, `photo`, `grade`, `role`, `email`, `mdp`, `resetPasswordToken`, `resetPasswordExpires`, `createdBy`, `dateCreation`) VALUES
(1, 'Oussema', NULL, NULL, NULL, 'auteur', 'oussemabenhenni@gmail.com', '$2b$10$bdJWqtpe5xyiW3GAAgcrBeik4Hgp4nZ5Kz6/BZ3SuXxCZTr8c32Bi', NULL, NULL, NULL, NULL),
(2, 'Oussema', NULL, NULL, NULL, 'auteur', 'oussemabenhenni@gmail.com', '$2b$10$ZqoRZuOtKimLfEN8xDXMIuNkv.93xljEC6AlTxfdFC2fWff2WNjEG', NULL, NULL, NULL, NULL),
(3, 'Oussema', NULL, NULL, NULL, 'auteur', 'oussemabenhenni@gmail.com', '$2b$10$Ok75UlyJehwhdJMABwfaa.hTfXS23r8z16y.AtDisWw9DJECDCsG2', NULL, NULL, NULL, NULL),
(4, NULL, 'wxc', NULL, 'CA', NULL, 'wxcw', '$2b$10$.wAgxG9G6BdocdUBxT0iq.MljUKkbL9Tc1Fvz3UnIX9L3pqhcO5na', NULL, NULL, NULL, NULL),
(5, NULL, 'ADDRESS', NULL, 'CA', NULL, 'oussemabenhnni@gmail.com', '$2b$10$7RTPwetf2/eF0tZ858RH4.pwW.RAZ7yOJeDGdV9erQMqnZJCIhoz.', NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cours`
--
ALTER TABLE `cours`
  ADD PRIMARY KEY (`idCours`);

--
-- Indexes for table `lecon`
--
ALTER TABLE `lecon`
  ADD PRIMARY KEY (`idLecon`),
  ADD KEY `idCours` (`idCours`);

--
-- Indexes for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`idUtilisateur`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cours`
--
ALTER TABLE `cours`
  MODIFY `idCours` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lecon`
--
ALTER TABLE `lecon`
  MODIFY `idLecon` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `idUtilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `lecon`
--
ALTER TABLE `lecon`
  ADD CONSTRAINT `lecon_ibfk_1` FOREIGN KEY (`idCours`) REFERENCES `cours` (`idCours`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
