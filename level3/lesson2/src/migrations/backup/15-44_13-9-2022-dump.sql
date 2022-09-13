/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: authors
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `author` (`author`)
) ENGINE = InnoDB AUTO_INCREMENT = 91 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: books
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `pages` int NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `view` int DEFAULT '0',
  `click` int DEFAULT '0',
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 64 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: books_authors
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `books_authors` (
  `book_id` int NOT NULL,
  `author_id` int NOT NULL,
  UNIQUE KEY `book_id` (`book_id`, `author_id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `books_authors_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `books_authors_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: authors
# ------------------------------------------------------------

INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (1, '');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (46, 'ggg');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (28, 'h');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (67, 'sfd');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (76, 'tom');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (14, 'А. Белов');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (17, 'Александр Сераков');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (27, 'Андрей Богуславский');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (5, 'Брюс Эккель');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (8, 'Гэри Маклин Холл');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (23, 'Джей Макгаврен');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (9, 'Джеймс Р. Грофф');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (13, 'Джереми Блум');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (12, 'Джон Вудкок');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (24, 'Дрю Нейл');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (7, 'Дэвид Флэнаган');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (80, 'Иван Безруснявый');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (49, 'Игорь Борщов');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (10, 'Люк Веллинг');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (3, 'М., Вильямс');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (2, 'Марк Саммерфильд');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (22, 'Мартин Фаулер');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (81, 'Микола Московский');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (19, 'Пол Дейтел');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (26, 'Прамодкумар Дж. Садаладж');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (20, 'Роберт Мартин');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (11, 'Сергей Мастицкий');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (16, 'Сет Гринберг');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (15, 'Сэмюэл Грингард');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (18, 'Тим Кедлек');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (6, 'Томас Кормен');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (4, 'Уэс Маккинни');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (25, 'Харви Дейтел');
INSERT INTO
  `authors` (`id`, `author`)
VALUES
  (21, 'Энтони Грей');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: books
# ------------------------------------------------------------

INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    22,
    'СИ++ и компьютерная графика',
    2010,
    351,
    '978-3-16-148410-0',
    1,
    1,
    '22.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    23,
    'Программирование на языке Go!',
    2015,
    300,
    '978-3-16-148410-0',
    6,
    1,
    '23.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    25,
    'Толковый словарь сетевых терминов и аббревиатур',
    2020,
    311,
    '402, 978-3-16-148410-0',
    5,
    2,
    '25.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    26,
    'Python for Data Analysis',
    2011,
    265,
    '978-3-16-148410-0',
    0,
    0,
    '26.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    27,
    'Thinking in Java (4th Edition)',
    2019,
    305,
    '978-3-16-148410-0',
    4,
    1,
    '27.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    29,
    'Introduction to Algorithms',
    2015,
    280,
    '978-3-16-148410-0',
    1,
    0,
    '29.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    31,
    'JavaScript Pocket Reference',
    2014,
    352,
    '978-3-16-148410-0',
    0,
    0,
    '31.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    32,
    'Adaptive Code via C#: Class and Interface Design, Design Patterns, and SOLID Principles',
    2016,
    340,
    '978-3-16-148410-0',
    0,
    0,
    '32.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    33,
    'SQL: The Complete Referenc',
    2017,
    321,
    '978-3-16-148410-0',
    1,
    2,
    '33.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    34,
    'PHP and MySQL Web Development',
    2011,
    582,
    '978-3-16-148410-0',
    1,
    0,
    '34.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    35,
    'Статистический анализ и визуализация данных с помощью R',
    2019,
    366,
    '978-3-16-148410-0',
    0,
    0,
    '35.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    36,
    'Computer Coding for Kid',
    2012,
    374,
    '978-3-16-148410-0',
    0,
    0,
    '36.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    37,
    'Exploring Arduino: Tools and Techniques for Engineering Wizardry',
    2013,
    295,
    '978-3-16-148410-0',
    0,
    0,
    '37.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    38,
    'Программирование микроконтроллеров для начинающих и не только',
    2014,
    374,
    '978-3-16-148410-0',
    0,
    0,
    '38.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    39,
    'The Internet of Things',
    2018,
    410,
    '978-3-16-148410-0',
    0,
    0,
    '39.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    40,
    'Sketching User Experiences: The Workbook',
    2021,
    395,
    '978-3-16-148410-0',
    0,
    0,
    '40.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    41,
    'InDesign CS6',
    2020,
    332,
    '978-3-16-148410-0',
    1,
    0,
    '41.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    42,
    'Адаптивный дизайн. Делаем сайты для любых устройств',
    2014,
    388,
    '978-3-16-148410-0',
    1,
    0,
    '42.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    43,
    'Android для разработчиков',
    2017,
    342,
    '978-3-16-148410-0',
    0,
    0,
    '43.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    44,
    'Clean Code: A Handbook of Agile Software Craftsmanship',
    2015,
    417,
    '978-3-16-148410-0',
    0,
    0,
    '44.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    45,
    'Swift Pocket Reference: Programming for iOS and OS X',
    2016,
    299,
    '978-3-16-148410-0',
    0,
    0,
    '45.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    46,
    'NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence',
    2010,
    324,
    '978-3-16-148410-0',
    4,
    1,
    '46.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    47,
    'Head First Ruby',
    2011,
    381,
    '978-3-16-148410-0',
    0,
    0,
    '47.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    48,
    'Practical Vim',
    2019,
    360,
    '978-3-16-148410-0',
    0,
    0,
    '48.jpg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (54, 'fdg', 2015, 100, 'hh', 1, 1, 'img-sj2xo5lzn4e.png');
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    59,
    'Без русни',
    2020,
    200,
    '12',
    0,
    0,
    'img-msus4dgm0nn.png'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    60,
    'a\'; srop aaa',
    2020,
    100,
    '11',
    1,
    0,
    'img-nvtf8jz56ik.jpeg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    61,
    'Учись, познавай, пробуй',
    2020,
    333,
    '225-00',
    1,
    1,
    'img-9w7cspu7m7.jpeg'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    62,
    'a\'; hhh',
    2015,
    100,
    '11',
    3,
    4,
    'img-5xazhsk9528.png'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `year`,
    `pages`,
    `isbn`,
    `view`,
    `click`,
    `image`
  )
VALUES
  (
    63,
    'Ага-ага',
    2020,
    100,
    '12',
    0,
    0,
    'img-9r9o9x0c73w.jpeg'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: books_authors
# ------------------------------------------------------------

INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (23, 2);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (25, 3);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (26, 4);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (27, 5);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (29, 6);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (31, 7);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (32, 8);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (33, 9);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (34, 10);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (35, 11);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (36, 12);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (37, 13);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (38, 14);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (39, 15);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (40, 16);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (41, 17);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (42, 18);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (43, 19);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (44, 20);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (45, 21);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (46, 22);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (47, 23);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (48, 24);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (43, 25);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (46, 26);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (22, 27);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (54, 49);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (59, 49);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (61, 49);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (62, 49);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (63, 49);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (60, 76);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (61, 80);
INSERT INTO
  `books_authors` (`book_id`, `author_id`)
VALUES
  (61, 81);

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
