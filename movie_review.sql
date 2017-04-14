-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2017 at 07:46 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie_review`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `movie_id` int(100) NOT NULL,
  `comments` varchar(10000) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `movie_id`, `comments`) VALUES
(1, 1, 'testing comments 1'),
(2, 2, 'testing comments 2\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `genre` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `comments` varchar(10000) NOT NULL,
  `trailer` varchar(1000) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `name`, `genre`, `description`, `comments`, `trailer`) VALUES
(1, 'The Matrix', 'Action', 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers. ', 'happy fuzzy bunny weekend', 'https://www.youtube.com/watch?v=m8e-FF8MsqU'),
(2, 'Black Hawk Down', 'Action', '160 elite U.S. soldiers drop into Somalia to capture two top lieutenants of a renegade warlord and find themselves in a desperate battle with a large force of heavily-armed Somalis. ', 'Happy zombie jesus day', 'https://www.youtube.com/watch?v=tnV6wM-vd9s'),
(3, 'Saw', 'Horror', 'Two strangers awaken in a room with no recollection of how they got there or why, and soon discover they are pawns in a deadly game perpetrated by a notorious serial killer. ', 'testing saw', 'https://www.youtube.com/watch?v=S-1QgOMQ-ls'),
(4, 'The Sixth Sense', 'Horror', 'A boy who communicates with spirits that don\'t know they\'re dead seeks the help of a disheartened child psychologist. ', '', 'https://www.youtube.com/watch?v=VG9AGf66tXM'),
(5, 'Star Wars Episode 7 A New Hope', 'Sci-Fi', 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader. ', '', 'https://www.youtube.com/watch?v=1g3_CFmnU7k'),
(6, 'District 9', 'Sci-Fi', 'An extraterrestrial race forced to live in slum-like conditions on Earth suddenly finds a kindred spirit in a government agent who is exposed to their biotechnology. ', '', 'https://www.youtube.com/watch?v=DyLUwOcR5pk'),
(8, 'Act of Valour', 'Action', 'An elite team of Navy SEALs embark on a covert mission to recover a kidnapped CIA agent', 'I have some fuzzy easter eggs for you in my pants!', 'https://www.youtube.com/watch?v=ZnlPgo9TaGo');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
