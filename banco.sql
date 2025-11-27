-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           11.8.2-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para bibliotec
CREATE DATABASE IF NOT EXISTS `bibliotec` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `bibliotec`;

-- Copiando estrutura para tabela bibliotec.alunos
CREATE TABLE IF NOT EXISTS `alunos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cpf` char(11) DEFAULT NULL,
  `curso` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela bibliotec.alunos: ~0 rows (aproximadamente)
INSERT INTO `alunos` (`id`, `nome`, `cpf`, `curso`, `email`, `senha`) VALUES
	(2, 'Denise', NULL, NULL, 'denise@gmail.com', '12345678Aa');

-- Copiando estrutura para tabela bibliotec.alunos_favoritos
CREATE TABLE IF NOT EXISTS `alunos_favoritos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aluno_id` int(11) NOT NULL,
  `livro_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aluno_id` (`aluno_id`,`livro_id`),
  KEY `livro_id` (`livro_id`),
  CONSTRAINT `alunos_favoritos_ibfk_1` FOREIGN KEY (`aluno_id`) REFERENCES `alunos` (`id`),
  CONSTRAINT `alunos_favoritos_ibfk_2` FOREIGN KEY (`livro_id`) REFERENCES `livros` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela bibliotec.alunos_favoritos: ~7 rows (aproximadamente)
INSERT INTO `alunos_favoritos` (`id`, `aluno_id`, `livro_id`) VALUES
	(30, 2, 5),
	(25, 2, 9),
	(22, 2, 10),
	(24, 2, 11),
	(23, 2, 13),
	(21, 2, 14),
	(20, 2, 15);

-- Copiando estrutura para tabela bibliotec.livros
CREATE TABLE IF NOT EXISTS `livros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `autor` varchar(255) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `capa_url` varchar(512) DEFAULT NULL,
  `publicado_ano` int(11) DEFAULT NULL,
  `criado_em` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela bibliotec.livros: ~8 rows (aproximadamente)
INSERT INTO `livros` (`id`, `titulo`, `autor`, `descricao`, `capa_url`, `publicado_ano`, `criado_em`) VALUES
	(1, 'One Piece vol-1', 'Eiichiro Oda', 'Descrição...', 'https://m.media-amazon.com/images/I/716EGgqzyOL._AC_UF1000,1000_QL80_.jpg', 1997, '2025-11-27 11:31:48'),
	(2, 'Chainsaw Man vol-1', 'Tatsuki Fujimoto', 'Descrição...', 'https://m.media-amazon.com/images/I/71wp0XTXsAL._AC_UF1000,1000_QL80_.jpg', 2018, '2025-11-27 11:31:48'),
	(3, 'Jujutsu Kaisen Vol. 1', 'Gege Akutami', 'Descrição...', 'https://m.media-amazon.com/images/I/81TmHlRleJL.jpg', 2018, '2025-11-27 11:31:48'),
	(4, 'Berserk Vol. 1', 'Kentaro Miura', 'Descrição...', 'https://m.media-amazon.com/images/I/61K0fW6l1-L._AC_UF1000,1000_QL80_.jpg', 1989, '2025-11-27 11:31:48'),
	(5, 'My hero academia Vol.1', 'Kōhei Horikoshi', 'Descrição...', 'https://m.media-amazon.com/images/I/81wkJuE7PpL._SY466_.jpg', 2014, '2025-11-27 11:31:48'),
	(6, 'Tokyo ghoul Vol.1', 'Sui Ishida', 'Descrição...', '', 2012, '2025-11-27 11:31:48'),
	(7, 'Attack on titan Vol.1', 'Hajime Isayama', 'Descrição...', '', 2010, '2025-11-27 11:31:48'),
	(8, 'Bleach Vol.1', 'Tite Kubo', 'Descrição...', '', 2001, '2025-11-27 11:31:48');

-- Copiando estrutura para tabela bibliotec.login
CREATE TABLE IF NOT EXISTS `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela bibliotec.login: ~0 rows (aproximadamente)
INSERT INTO `login` (`id`, `email`, `senha`) VALUES
	(2, 'denise@gmail.com', '12345678Aa');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
