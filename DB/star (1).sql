-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2023 at 11:29 PM
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
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `idContact` int(11) NOT NULL,
  `subject` text NOT NULL,
  `message` text NOT NULL,
  `email` text NOT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `dateCreation` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`idContact`, `subject`, `message`, `email`, `createdBy`, `dateCreation`) VALUES
(1, 'xc', 'xc', 'xc', NULL, '2023-12-11 22:15:24');

-- --------------------------------------------------------

--
-- Table structure for table `cours`
--

CREATE TABLE `cours` (
  `idCours` int(11) NOT NULL,
  `titre` varchar(45) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `duree` int(11) DEFAULT NULL,
  `nbrDeVue` int(11) DEFAULT NULL,
  `image` varchar(400) DEFAULT NULL,
  `createdBy` int(11) NOT NULL,
  `dateCreation` datetime DEFAULT NULL,
  `langue` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cours`
--

INSERT INTO `cours` (`idCours`, `titre`, `description`, `duree`, `nbrDeVue`, `image`, `createdBy`, `dateCreation`, `langue`) VALUES
(104, 'Angular', 'Angular (commonly referred to as \"Angular 2+\" or \"Angular 2\") is a TypeScript-based opensource front-end web framework led by the Angular Team at Google and by a community of individuals and corporations to address all of the parts of the developer\'s workflow while building complex web applications. Angular is a complete rewrite from the same team that built AngularJS.\r\n\r\n', 16, 100, 'C:\\Users\\asus\\Desktop\\At.PI\\STAR\\images\\t10djc.png', 4, '2023-12-05 15:21:33', 'English'),
(105, 'Programmation Orientée-Objet', 'Le langage Java est un langage généraliste de programmation synthétisant les principaux langages existants lors de sa création en  par Sun Microsystems. Il permet une programmation orientée-objet (à l’instar de SmallTalk et, dans une moindre mesure, C++), modulaire (langage ADA) et reprend une syntaxe très proche de celle du langage C.\r\nOutre son orientation objet, le langage Java a l’avantage d’être modulaire (on peut écrire des\r\nportions de code génériques, c-à-d utilisables par plusieurs applications), rigoureux (la plupart des erreurs se produisent à la compilation et non à l’exécution) et portable (un même programme compilé peut s’exécuter sur différents environnements). En contre-partie, les applications Java ont le défaut d’être plus lentes à l’exécution que des applications programmées en C par exemple.', 22, 123, 'C:\\Users\\asus\\Desktop\\At.PI\\STAR\\images\\g9nswj.png', 4, '2023-12-05 15:36:54', 'French'),
(106, 'Symfony', 'Symfony est un ensemble de composants PHP ainsi qu\'un framework MVC libre écrit en PHP. Il fournit des fonctionnalités modulables et adaptables qui permettent de faciliter et d’accélérer le développement d\'un site web.', 17, 320, 'C:\\Users\\asus\\Desktop\\At.PI\\STAR\\images\\iapvmb.png', 4, '2023-12-05 15:52:03', 'French'),
(113, 'Test et validation', 'une bonne cours', 14, NULL, 'D:\\Other Works\\STAR\\imageDoc\\x8ovgu.png', 4, '2023-12-11 21:35:44', 'French');

-- --------------------------------------------------------

--
-- Table structure for table `lecon`
--

CREATE TABLE `lecon` (
  `idLecon` int(11) NOT NULL,
  `ordre` int(11) NOT NULL,
  `titre` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `contenu` text NOT NULL,
  `duree` int(11) NOT NULL,
  `idCours` int(11) NOT NULL,
  `dateCreation` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lecon`
--

INSERT INTO `lecon` (`idLecon`, `ordre`, `titre`, `description`, `contenu`, `duree`, `idCours`, `dateCreation`) VALUES
(89, 1, 'Mise en place de l\'environnement de développement', 'Installation et Mise en place de l\'environnement de développement d\'Angular', 'D:\\Other Works\\STAR\\images\\eii81s.pdf', 0, 104, '2023-12-05 15:24:27'),
(90, 1, 'Introduction à la programmation Orienté-Objet', 'Explication de la programmation Orienté Objet : Structurée, Procédurale, Modulaire\r\nLes Approches par traitements vs Par Objet', 'D:\\Other Works\\STAR\\docs\\d3ncln.pdf', 0, 105, '2023-12-05 15:40:33'),
(91, 1, 'Cours Symfony', 'PHP/Programmation Orientée Objet \r\n• Les espaces de nom (namespace)\r\n• Gérer le sode sur Git/Github\r\n• MVC (Modèle/Vue/Contôleur)', 'C:\\Users\\asus\\Desktop\\At.PI\\STAR\\docs\\z0667h.pdf', 0, 106, '2023-12-05 15:54:00');

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
  `dateCreation` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`idUtilisateur`, `nom_prenom`, `adresse`, `photo`, `grade`, `role`, `email`, `mdp`, `resetPasswordToken`, `resetPasswordExpires`, `dateCreation`) VALUES
(4, 'Ben Hlila Cyrine', 'Ezzahra', NULL, 'Autor', NULL, 'syrinebh05@gmail.com', '$2b$10$NFy68QlXu9OPcniWKBOIBeaHXIlhKCIminOV90dogD6JhX.36nRva', NULL, NULL, '2023-11-30 09:53:47'),
(5, 'Oussema', 'Rades Tunisie', NULL, 'Student', NULL, 'oussemabenhenni@gmail.com', '$2b$10$Lmy0B7.5VoDzQKAqwmoI9u3j9CZO2yDarnUciVUk.Kp8crAFNkPR2', NULL, NULL, '2023-12-11 19:31:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`idContact`),
  ADD KEY `FK_contact_createdBy` (`createdBy`);

--
-- Indexes for table `cours`
--
ALTER TABLE `cours`
  ADD PRIMARY KEY (`idCours`),
  ADD KEY `FK_cours_createdBy` (`createdBy`);

--
-- Indexes for table `lecon`
--
ALTER TABLE `lecon`
  ADD PRIMARY KEY (`idLecon`),
  ADD KEY `FK_cours` (`idCours`);

--
-- Indexes for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`idUtilisateur`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `idContact` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cours`
--
ALTER TABLE `cours`
  MODIFY `idCours` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `lecon`
--
ALTER TABLE `lecon`
  MODIFY `idLecon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `idUtilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `FK_contact_createdBy` FOREIGN KEY (`createdBy`) REFERENCES `utilisateur` (`idUtilisateur`);

--
-- Constraints for table `cours`
--
ALTER TABLE `cours`
  ADD CONSTRAINT `FK_cours_createdBy` FOREIGN KEY (`createdBy`) REFERENCES `utilisateur` (`idUtilisateur`);

--
-- Constraints for table `lecon`
--
ALTER TABLE `lecon`
  ADD CONSTRAINT `FK_cours` FOREIGN KEY (`idCours`) REFERENCES `cours` (`idCours`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
