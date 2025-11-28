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

-- Copiando estrutura para tabela bibliotec.tabela_curso
CREATE TABLE IF NOT EXISTS `tabela_curso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela bibliotec.tabela_curso: ~14 rows (aproximadamente)
INSERT INTO `tabela_curso` (`id`, `nome`) VALUES
	(1, 'Engenharia de Fundição'),
	(2, 'Engenharia de Soldagem'),
	(3, 'Superior de Tecnologia em Processos Metalúrgicos'),
	(4, 'Técnico em Metalurgia'),
	(5, 'Técnico em Desenvolvimento de Sistemas'),
	(6, 'Técnico em Administração'),
	(7, 'Construtor de Moldes e Ferramentas para Fundição'),
	(8, 'Projetista de Moldes e Ferramentas para Fundição'),
	(9, 'Assistente Administrativo'),
	(10, 'Auxiliar de Linha de Produção'),
	(11, 'Eletricista de Manutenção Eletroeletrônica'),
	(12, 'Instalador e Reparador de Equipamentos de Telecomunicações'),
	(13, 'Mecânico de Manutenção'),
	(14, 'Soldador');

-- Copiando estrutura para tabela bibliotec.tabela_livros
CREATE TABLE IF NOT EXISTS `tabela_livros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `autor` varchar(255) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `capa_url` varchar(512) DEFAULT NULL,
  `genero` enum('manga','romance') DEFAULT NULL,
  `publicado_ano` int(11) DEFAULT NULL,
  `criado_em` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela bibliotec.tabela_livros: ~16 rows (aproximadamente)
INSERT INTO `tabela_livros` (`id`, `titulo`, `autor`, `descricao`, `capa_url`, `genero`, `publicado_ano`, `criado_em`) VALUES
	(1, 'One Piece vol-1', 'Eiichiro Oda', 'O primeiro volume apresenta Monkey D. Luffy desde sua infância, quando admira Shanks e sua tripulação. Após comer a Gomu Gomu no Mi, ele ganha um corpo elástico, mas perde a capacidade de nadar. Anos depois, já adolescente, decide partir sozinho para os mares, mesmo sem navio ou tripulação, guiado apenas pelo sonho de encontrar o One Piece e se tornar o Rei dos Piratas. Nesse volume, Luffy enfrenta sua primeira inimiga, Alvida, mostrando seu estilo ingênuo, corajoso e otimista. Ele também conhece Roronoa Zoro, um caçador de piratas temido, preso injustamente pela Marinha. Luffy o liberta e tenta convencê-lo a se juntar à sua tripulação. O volume estabelece o espírito de aventura, liberdade e amizade que define toda a série.', 'https://m.media-amazon.com/images/I/61xOtH1kTsL._SY425_.jpg', 'manga', 1997, '2025-11-28 12:02:31'),
	(2, 'Chainsaw Man vol-1', 'Tatsuki Fujimoto', 'Denji vive uma vida miserável, preso a dívidas absurdas deixadas por seu pai, trabalhando como caçador de demônios para a Yakuza. Pochita, seu cão-demônio motosserra, é sua única companhia e fonte de força emocional. Em um momento de traição, Denji é assassinado pela máfia controlada por um demônio. Porém, Pochita sacrifica sua própria vida para fundir-se ao coração de Denji, ressuscitando-o como um híbrido capaz de transformar braços e cabeça em motores de motosserra. Após renascer, ele é encontrado pela misteriosa Makima, que oferece a ele uma vida melhor — desde que se torne um caçador de demônios do governo sob suas ordens. Esse volume apresenta a mistura de violência intensa, humor ácido e drama trágico que caracteriza a obra, além da inocência de Denji, que deseja apenas viver uma vida comum.', 'https://m.media-amazon.com/images/I/71wp0XTXsAL._AC_UF1000,1000_QL80_.jpg', 'manga', 2018, '2025-11-28 12:02:31'),
	(3, 'Jujutsu Kaisen Vol. 1', 'Gege Akutami', 'Yuji Itadori é um adolescente forte, mas sem ambições grandiosas. Tudo muda quando ele encontra um objeto amaldiçoado — o dedo de Sukuna, o mais poderoso e maligno dos espíritos amaldiçoados. Para salvar seu amigo, ele engole o dedo e se torna o receptáculo de Sukuna, algo considerado impossível e mortal. Em vez de ser executado imediatamente, ele é levado por Gojo Satoru à Escola Técnica de Jujutsu, onde é treinado para controlar Sukuna e ajudar no extermínio de maldições. O volume apresenta o trio principal (Yuji, Megumi e Nobara), as regras do mundo jujutsu e a constante luta entre vida e morte. A narrativa mistura ação rápida, terror sobrenatural e reflexões sobre a morte e o propósito de viver.', 'https://m.media-amazon.com/images/I/81TmHlRleJL.jpg', 'manga', 2018, '2025-11-28 12:02:31'),
	(4, 'Berserk Vol. 1', 'Kentaro Miura', 'O volume de abertura mergulha o leitor em um mundo medieval brutal e corrompido, onde demônios e humanos coexistem em violência constante. Guts é introduzido como um guerreiro solitário de passado traumático, marcado por uma infância violenta e carregando uma espada enorme capaz de cortar monstros ao meio. Ele vaga confrontando criaturas demoníacas e enfrentando o destino imposto pela Marca, um símbolo que atrai seres das trevas. O volume estabelece o tom sombrio da obra: temas como tragédia, instinto de sobrevivência, guerra, destino e ódio. A narrativa é intensa, cheia de detalhes visuais e violência que constroem o universo cruel de Miura.', 'https://m.media-amazon.com/images/I/61K0fW6l1-L._AC_UF1000,1000_QL80_.jpg', 'manga', 1989, '2025-11-28 12:02:31'),
	(5, 'My hero academia Vol. 1', 'Kōhei Horikoshi', 'Vivendo em uma sociedade onde poderes especiais são comuns, Izuku Midoriya sonha ser um herói, mas nasce sem um Quirk. Mesmo assim, ele estuda obsessivamente os heróis e registra tudo em cadernos. Após arriscar sua vida para salvar Bakugou, seu rival de infância, ele impressiona All Might, que vê nele o coração de um verdadeiro herói. All Might decide transmitir seu poder, o One For All, e inicia o difícil treinamento de Izuku para que ele consiga ingressar na U.A., a escola de heróis mais prestigiada do país. O volume acompanha sua transformação dolorosa, seus medos, sua determinação e o início de sua trajetória no mundo dos heróis.', 'https://m.media-amazon.com/images/I/81wkJuE7PpL._SY466_.jpg', 'manga', 2014, '2025-11-28 12:02:31'),
	(6, 'Tokyo ghoul Vol. 1', 'Sui Ishida', 'Kaneki Ken é um estudante introvertido e amante de livros. Sua vida muda drasticamente quando ele tem um encontro quase fatal com Rize, uma ghoul que o ataca. Para salvar sua vida, cirurgiões transplantam órgãos dela para Kaneki, transformando-o em um meio-ghoul — nem humano, nem monstro. Agora ele precisa aprender a conviver com sua nova fome por carne humana, seu conflito interno entre moralidade e sobrevivência, e sua descoberta de que as ghouls possuem sentimentos, medos e uma sociedade própria. O volume apresenta o Antiku, um café que serve como abrigo para ghouls pacíficos, e constrói um clima psicológico denso, mostrando a luta de Kaneki com sua identidade.', 'https://m.media-amazon.com/images/I/51gTbdvr9tL._SY445_SX342_ML2_.jpg', 'manga', 2012, '2025-11-28 12:02:31'),
	(7, 'Attack on titan Vol. 1', 'Hajime Isayama', 'O mundo é dominado por Titãs gigantescos que devoram humanos sem motivo aparente. A humanidade sobrevive dentro de enormes muralhas construídas há mais de um século. Eren Yeager, Mikasa e Armin vivem uma vida limitada, mas tranquila, até que um Titã colossal rompe a muralha e provoca uma invasão devastadora. O evento muda para sempre a vida de Eren, que jura eliminar todos os Titãs da face da Terra. O volume explora o desespero da humanidade, o caos da invasão, a dor das perdas e o nascimento da determinação de Eren. Ele se prepara para entrar no treinamento militar, onde passará por mudanças físicas e mentais profundas.', 'https://m.media-amazon.com/images/I/91F-m3Zm1xL._SY342_.jpg', 'manga', 2010, '2025-11-28 12:02:31'),
	(8, 'Bleach Vol. 1', 'Tite Kubo', 'Ichigo Kurosaki sempre pôde ver espíritos, mas tudo muda quando Rukia, uma shinigami, aparece perseguindo um hollow. Durante o ataque, ela fica ferida e transfere seus poderes para Ichigo, que precisa agir como substituto temporário. A partir daí, Ichigo aprende sobre almas, hollows, purificação e o papel dos shinigamis. O volume apresenta monstros espirituais, a Soul Society e o cotidiano de Ichigo tentando equilibrar escola, família e deveres sobrenaturais. Combinando humor, tensão e espiritualidade, o primeiro volume abre portas para um universo rico e cheio de batalhas icônicas.', 'https://m.media-amazon.com/images/I/516WLV8lFCL._SY445_SX342_ML2_.jpg', 'manga', 2001, '2025-11-28 12:02:31'),
	(9, 'Balela', 'Solaine Chioro', 'O livro conta a rotina e as vivências emocionais de adolescentes e jovens adultos lidando com dúvidas, relações turbulentas e descobertas sobre quem são. A narrativa explora temas como primeiras paixões, inseguranças internas, expectativas sociais e a busca por autoconhecimento. A história mostra como situações aparentemente comuns — amizades, brigas, escolhas escolares, expectativas familiares — moldam a personalidade e a forma de sentir de cada personagem. É um romance leve, sensível e muito próximo da realidade.', 'https://m.media-amazon.com/images/I/71Ig0iq-BKL._SY466_.jpg', 'romance', 2025, '2025-11-28 12:03:02'),
	(10, 'Quebrando o gelo', 'Hannah Grace', 'Uma história sobre duas pessoas com posturas opostas: uma reservada, fria ou extremamente racional, e outra espontânea, emotiva ou aberta ao mundo. Por motivos da vida — escola, trabalho, convivência forçada ou um projeto em comum — elas precisam se aproximar. Com o tempo, começam a derrubar as barreiras emocionais que haviam criado para se proteger de traumas do passado. O livro fala sobre vulnerabilidade, confiança, amadurecimento e a importância de permitir que alguém entre na sua vida.', 'https://m.media-amazon.com/images/I/81xhLdQciVL._SY342_.jpg', 'romance', 2023, '2025-11-28 12:03:02'),
	(11, 'Não é amor', 'Ali Hazelwood', 'Um romance profundo e necessário sobre reconhecer o que é afeto e o que é abuso. A história acompanha uma personagem (ou personagens) envolvida em um relacionamento que, à primeira vista, parece amoroso, mas revela comportamentos manipuladores, ciúme excessivo, chantagem emocional e dependência. O livro discute a dificuldade de identificar limites, o impacto do abuso psicológico e a jornada de recuperação e reconstrução da autoestima. É forte, sensível e cheio de reflexões sociais.', 'https://m.media-amazon.com/images/I/71Ec-mBlH4L._SY342_.jpg', 'romance', 2024, '2025-11-28 12:03:02'),
	(12, 'É assim que acaba', ' Colleen Hoover', 'A narrativa segue Lily Bloom, que tenta construir uma vida estável longe do passado difícil, marcado pela violência doméstica vivida pela mãe. Ao conhecer Ryle, um neurocirurgião charmoso, ela acredita ter encontrado o amor ideal. No entanto, comportamentos agressivos começam a surgir, colocando-a em um ciclo de abuso que ela prometeu nunca repetir. Paralelamente, o livro apresenta Atlas, seu primeiro amor, que representa segurança e compreensão. A história aborda traumas, relações abusivas, escolhas dolorosas e a coragem necessária para romper padrões familiares.', 'https://m.media-amazon.com/images/I/91r5G8RxqfL._SY342_.jpg', 'romance', 2018, '2025-11-28 12:03:02'),
	(13, 'Quinze dias', 'Vitor Martins', 'Ambientado no Brasil, o livro acompanha um adolescente com baixa autoestima e dificuldades sociais que vê sua vida mudar quando seu vizinho — por quem ele é secretamente apaixonado — vai passar 15 dias hospedado em sua casa. Durante esse período de convivência intensa, ele precisa lidar com inseguranças, preconceitos, autodescoberta e o medo de se abrir. A narrativa é sensível, representativa e fala sobre amor jovem, aceitação, empatia e o valor de ser verdadeiro consigo mesmo.', 'https://m.media-amazon.com/images/I/714yEGAjivL._SY342_.jpg', 'romance', 2022, '2025-11-28 12:03:02'),
	(14, 'Era uma vez um coração partido', 'Stephanie Garber', '“Era Uma Vez um Coração Partido” acompanha Evangeline Fox, uma garota que faz um pacto com o misterioso Príncipe dos Corações, Jacks, para impedir o casamento do seu grande amor. Mas o acordo tem um preço: ela precisa cumprir três pedidos que a envolvem em magia, segredos e perigos. Em um mundo de contos de fadas sombrios, Evangeline descobre que nem sempre se pode confiar no amor — e que Jacks pode ser tanto sua ruína quanto seu destino.', 'https://m.media-amazon.com/images/I/91tgztS06QL._SY342_.jpg', 'romance', 2022, '2025-11-28 12:03:02'),
	(15, 'A hipótese do amor', 'Ali Hazelwood', 'Ambientado no mundo acadêmico, o livro acompanha Olive, uma aluna de pós-graduação que entra em um acordo com Adam, um professor rígido e temido por todos: fingir um relacionamento para resolver questões pessoais e profissionais. O que começa como um acordo frio e sem emoção acaba se tornando uma relação baseada em respeito, descobertas e afeto sincero. O livro explora a pressão da vida científica, o machismo na academia, inseguranças internas e o processo de se permitir amar.', 'https://m.media-amazon.com/images/I/81LTEfXYgcL._SY342_.jpg', 'romance', 2022, '2025-11-28 12:03:02'),
	(16, 'Romance real', 'Clara Alves', 'A história segue uma jovem comum que, por acaso do destino, se envolve com alguém da realeza — um príncipe, herdeiro ou membro importante da família real. Ao entrar nesse mundo, ela descobre que glamour e poder vêm acompanhados de cobranças pesadas, segredos e expectativas sociais rígidas. Entre fofocas, escândalos e manchetes, o casal precisa aprender a equilibrar amor, identidade pessoal e a pressão do público. É uma narrativa sobre coragem, escolhas e o preço de amar alguém extraordinário.', 'https://m.media-amazon.com/images/I/81nxnpZqsSL._SY342_.jpg', 'romance', 2022, '2025-11-28 12:03:02');

-- Copiando estrutura para tabela bibliotec.tabela_livros_favoritos
CREATE TABLE IF NOT EXISTS `tabela_livros_favoritos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aluno_id` int(11) NOT NULL,
  `livro_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aluno_id` (`aluno_id`,`livro_id`),
  KEY `livro_id` (`livro_id`),
  CONSTRAINT `tabela_livros_favoritos_ibfk_1` FOREIGN KEY (`aluno_id`) REFERENCES `tabela_usuario` (`id`),
  CONSTRAINT `tabela_livros_favoritos_ibfk_2` FOREIGN KEY (`livro_id`) REFERENCES `tabela_livros` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela bibliotec.tabela_livros_favoritos: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela bibliotec.tabela_login
CREATE TABLE IF NOT EXISTS `tabela_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aluno_id` int(11) NOT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `perfil` enum('aluno','admin') DEFAULT 'aluno',
  PRIMARY KEY (`id`),
  KEY `aluno_id` (`aluno_id`),
  CONSTRAINT `tabela_login_ibfk_1` FOREIGN KEY (`aluno_id`) REFERENCES `tabela_usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela bibliotec.tabela_login: ~2 rows (aproximadamente)
INSERT INTO `tabela_login` (`id`, `aluno_id`, `senha`, `perfil`) VALUES
	(3, 1, '$2b$10$PwpbjA0kyhnmLdk.at47ceHyIPcHv6e/D1T5CHMQybrZkhiy3go2e', 'aluno'),
	(4, 2, '$2b$10$TPjuiqwwnBH.bU3JNC7GguOQQksK6/2FBGlptuWOPrUrEh23aoiVa', 'aluno');

-- Copiando estrutura para tabela bibliotec.tabela_turma
CREATE TABLE IF NOT EXISTS `tabela_turma` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `turma` varchar(100) NOT NULL,
  `curso_id` int(11) NOT NULL,
  `periodo` enum('M','V','N','I') DEFAULT NULL,
  `semestre_inicio` enum('1','2') DEFAULT NULL,
  `ano_inicio` year(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `curso_id` (`curso_id`),
  CONSTRAINT `tabela_turma_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `tabela_curso` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela bibliotec.tabela_turma: ~33 rows (aproximadamente)
INSERT INTO `tabela_turma` (`id`, `turma`, `curso_id`, `periodo`, `semestre_inicio`, `ano_inicio`) VALUES
	(1, 'PEF-03-FUA', 1, NULL, NULL, NULL),
	(2, 'PES-04-EJS', 2, NULL, NULL, NULL),
	(3, 'CSTPME225N1', 3, NULL, NULL, NULL),
	(4, 'CSTPME124N4', 3, NULL, NULL, NULL),
	(5, '1NA', 4, NULL, NULL, NULL),
	(6, '2DS', 5, NULL, NULL, NULL),
	(7, '2NA', 4, NULL, NULL, NULL),
	(8, 'ADM1A-SESI', 6, NULL, NULL, NULL),
	(9, 'ADM2A-SESI', 6, NULL, NULL, NULL),
	(10, 'ADM2B-SESI', 6, NULL, NULL, NULL),
	(11, 'DS1A-SESI', 5, NULL, NULL, NULL),
	(12, 'DS1B-SESI', 5, NULL, NULL, NULL),
	(13, 'DS2A-SESI', 5, NULL, NULL, NULL),
	(14, 'DS2B-SESI', 5, NULL, NULL, NULL),
	(15, 'MT1A-SESI', 4, NULL, NULL, NULL),
	(16, 'MT1B-SESI', 4, NULL, NULL, NULL),
	(17, 'MT1-SEDUC', 4, NULL, NULL, NULL),
	(18, 'MT2-SESI', 4, NULL, NULL, NULL),
	(19, 'I1CMFF', 7, NULL, NULL, NULL),
	(20, 'I1PMFF', 8, NULL, NULL, NULL),
	(21, 'M1ADM', 9, NULL, NULL, NULL),
	(22, 'M1ALP', 10, NULL, NULL, NULL),
	(23, 'M1EME', 11, NULL, NULL, NULL),
	(24, 'M2IRET', 12, NULL, NULL, NULL),
	(25, 'M2MM', 13, NULL, NULL, NULL),
	(26, 'M4MM', 13, NULL, NULL, NULL),
	(27, 'T1ADM', 9, NULL, NULL, NULL),
	(28, 'T1EME', 11, NULL, NULL, NULL),
	(29, 'T1SOL', 14, NULL, NULL, NULL),
	(30, 'T2ALP', 10, NULL, NULL, NULL),
	(31, 'T2MM', 13, NULL, NULL, NULL),
	(32, 'T3EME', 11, NULL, NULL, NULL),
	(33, 'T4MM', 13, NULL, NULL, NULL);

-- Copiando estrutura para tabela bibliotec.tabela_usuario
CREATE TABLE IF NOT EXISTS `tabela_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `CPF` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `curso_id` int(11) NOT NULL,
  `turma_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CPF` (`CPF`),
  KEY `curso_id` (`curso_id`),
  KEY `tabela_usuario_ibfk_3` (`turma_id`),
  CONSTRAINT `tabela_usuario_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `tabela_curso` (`id`),
  CONSTRAINT `tabela_usuario_ibfk_3` FOREIGN KEY (`turma_id`) REFERENCES `tabela_turma` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Copiando dados para a tabela bibliotec.tabela_usuario: ~2 rows (aproximadamente)
INSERT INTO `tabela_usuario` (`id`, `nome`, `CPF`, `email`, `curso_id`, `turma_id`) VALUES
	(1, 'teste', '55522233311', 'teste@gmail.com', 1, 1),
	(2, 'teste2', '55522233312', 'teste@gmail.com', 1, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
