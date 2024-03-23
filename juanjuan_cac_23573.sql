-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-03-2024 a las 16:33:14
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `juanjuan_cac_23573`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'Funko', '2024-03-22 14:46:08', '2024-03-23 12:59:06'),
(2, 'Libros', '2024-03-22 14:46:14', '2024-03-22 14:46:14'),
(3, 'Remeras', '2024-03-22 14:46:24', '2024-03-22 14:46:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `licences`
--

CREATE TABLE `licences` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `licences`
--

INSERT INTO `licences` (`id`, `nombre`, `createdAt`, `updatedAt`) VALUES
(1, 'STAR WARS', '2024-03-22 14:46:33', '2024-03-22 14:46:33'),
(2, 'MARVEL', '2024-03-22 14:46:39', '2024-03-22 14:46:39'),
(3, 'POKEMON', '2024-03-22 14:46:48', '2024-03-22 14:46:48'),
(4, 'HARRY POTTER', '2024-03-22 14:46:55', '2024-03-22 14:46:55'),
(5, 'NARUTO', '2024-03-23 14:01:32', '2024-03-23 14:01:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `precio` float NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `dues` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `licenceId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `nombre`, `description`, `precio`, `stock`, `discount`, `sku`, `dues`, `createdAt`, `updatedAt`, `categoryId`, `licenceId`) VALUES
(1, 'Harry Potter con Bhúo', 'Figura coleccionable de plástico con accesorios en caja con exhibidor y soporte de acrílico para vitrinas', 1590, 10, 10, 'SKUHP001', 0, '0000-00-00 00:00:00', '2024-03-23 13:50:29', 1, 4),
(2, 'Hermione', 'Figura coleccionable de plástico con accesorios en caja con exhibidor y soporte de acrílico para vitrinas', 1591, 10, 10, 'SKUHP002', 0, '0000-00-00 00:00:00', '2024-03-23 13:32:59', 1, 4),
(3, 'Bobbafeth', 'Figura coleccionable de plástico con accesorios en caja con exhibidor y soporte de acrílico para vitrinas', 1592, 10, 10, 'SKUSW003', 0, '0000-00-00 00:00:00', '2024-03-23 13:23:22', 1, 1),
(4, 'Storm Trooper', 'Figura coleccionable de plástico con accesorios en caja con exhibidor y soporte de acrílico para vitrinas', 1593, 10, 20, 'SKUSW004', 0, '0000-00-00 00:00:00', '2024-03-23 13:20:49', 1, 1),
(5, 'Luke Skywalker con Baby Yoda', 'Figura coleccionable de plástico con accesorios en caja con exhibidor y soporte de acrílico para vitrinas', 1594, 10, 10, 'SKUSW-005', 0, '0000-00-00 00:00:00', '2024-03-23 12:24:20', 2, 1),
(6, 'Charmander', 'Figura coleccionable de plástico con accesorios en caja con exhibidor y soporte de acrílico para vitrinas', 1595, 10, 10, 'SKUPM006', 0, '0000-00-00 00:00:00', '2024-03-23 13:25:16', 1, 3),
(7, 'Snape Patronus', 'Figura coleccionable de plástico con accesorios en caja con exhibidor y soporte de acrílico para vitrinas', 1596, 10, 10, 'SKUHP007', 0, '0000-00-00 00:00:00', '2024-03-23 13:33:50', 1, 4),
(8, 'Baby Yoda', 'Figura coleccionable de plástico con accesorios en caja con exhibidor y soporte de acrílico para vitrinas', 1597, 10, 20, 'SKUSW008', 0, '0000-00-00 00:00:00', '2024-03-23 13:19:34', 1, 1),
(9, 'Pidgeotto', 'Figura coleccionable de plástico con accesorios en caja con exhibidor y soporte de acrílico para vitrinas', 1598, 10, 10, 'SKUPM009', 0, '0000-00-00 00:00:00', '2024-03-23 13:34:42', 3, 3),
(10, 'Dragonite', 'Figura coleccionable de plástico con accesorios en caja con exhibidor y soporte de acrílico para vitrinas', 1599, 10, 10, 'SKUPM010', 0, '0000-00-00 00:00:00', '2024-03-23 13:46:01', 1, 3),
(11, 'Vulpix', 'Figura coleccionable de plástico con accesorios en caja con exhibidor y soporte de acrílico para vitrinas', 1600, 10, 10, 'SKUPK011', 0, '0000-00-00 00:00:00', '2024-03-23 13:41:34', 2, 3),
(12, 'Luna', 'Figura coleccionable de plástico con accesorios en caja con exhibidor y soporte de acrílico para vitrinas', 1601, 10, 15, 'SKUHP012', 0, '0000-00-00 00:00:00', '2024-03-23 14:00:42', 1, 4),
(13, 'Pikachu', 'Figura coleccionable de plástico con accesorios en caja con exhibidor y soporte de acrílico para vitrinas', 1602, 10, 10, 'SKU0PM13', 0, '0000-00-00 00:00:00', '2024-03-23 13:52:22', 1, 3),
(16, 'Naruto', 'Figura coleccionable de plástico con accesorios en caja con exhibidor y soporte de acrílico para vitrinas', 1605, 10, 10, 'SKUN016', 0, '0000-00-00 00:00:00', '2024-03-23 14:02:04', 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `licences`
--
ALTER TABLE `licences`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `licenceId` (`licenceId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `licences`
--
ALTER TABLE `licences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`licenceId`) REFERENCES `licences` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
