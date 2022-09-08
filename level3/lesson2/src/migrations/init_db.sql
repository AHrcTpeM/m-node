CREATE TABLE if not exists books(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    pages INT NOT NULL,
    isbn VARCHAR(255) NOT NULL,
    view INT DEFAULT 0,
    click INT DEFAULT 0
    );

CREATE TABLE if not exists authors(
    id INT PRIMARY KEY AUTO_INCREMENT,
    author VARCHAR(255) NOT NULL
    );

CREATE TABLE if not exists books_authors(
    book_id INT NOT NULL,
    author_id INT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (author_id) REFERENCES authors(id)
    );