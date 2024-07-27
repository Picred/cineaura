CREATE DATABASE IF NOT EXISTS cineaura;

USE cineaura;

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS films;
CREATE TABLE IF NOT EXISTS films (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_year YEAR NOT NULL,
    duration INT NOT NULL,
    genre VARCHAR(100),
    description TEXT,
    cast VARCHAR(255),
    rating DECIMAL(3, 1),
    img VARCHAR(255) DEFAULT 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*AC9frN1qFnn-I2JCycN8fw.png',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS schedule;
CREATE TABLE IF NOT EXISTS schedule(
    id INT AUTO_INCREMENT PRIMARY KEY,
    film_id INT NOT NULL,
    schedule_datetime DATETIME NOT NULL,
    capacity INT NOT NULL,
    FOREIGN KEY (film_id) REFERENCES films(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS tickets;
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    film_id INT NOT NULL,
    schedule_id INT NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    seat_number VARCHAR(10),
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (film_id) REFERENCES films(id),
    FOREIGN KEY (schedule_id) REFERENCES schedule(id)
);

INSERT INTO users (username, password, isAdmin) VALUES
('admin', 'admin', TRUE),
('user', 'user', FALSE);

INSERT INTO films (title, release_year, duration, genre, description, cast, rating, img) VALUES
('Inside Out 2', 2024, 126, 'Animation', 'INSIDE OUT description', 'Veronica Puccio', 8.3, 'https://www.ucicinemas.it/media/movie/l/2024/inside-out-2.jpg')
