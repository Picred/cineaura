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

INSERT INTO users (username, password, isAdmin) VALUES
('admin', 'admin', TRUE),
('user', 'user', FALSE);

INSERT INTO films (title, release_year, duration, genre, description, cast, rating, img) VALUES
('Inside Out 2', 2024, 126, 'Animation', 'INSIDE OUT description', 'Veronica Puccio', 8.3, 'https://www.ucicinemas.it/media/movie/l/2024/inside-out-2.jpg')
-- ('Parasite', 2019, 132, 'Thriller', 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', 'Kang-ho Song, Sun-kyun Lee, Yeo-jeong Jo', 8.6),
-- ('1917', 2019, 119, 'War', 'Two young British soldiers during the First World War are given an impossible mission: deliver a message deep in enemy territory.', 'Dean-Charles Chapman, George MacKay, Daniel Mays', 8.3),
-- ('Joker', 2019, 122, 'Drama', 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society.', 'Joaquin Phoenix, Robert De Niro, Zazie Beetz', 8.5),
-- ('Once Upon a Time in Hollywood', 2019, 161, 'Comedy', 'A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywood\'s Golden Age.', 'Leonardo DiCaprio, Brad Pitt, Margot Robbie', 7.6),
-- ('Avengers: Endgame', 2019, 181, 'Action', 'After the devastating events of Avengers: Infinity War, the universe is in ruins.', 'Robert Downey Jr., Chris Evans, Mark Ruffalo', 8.4),
-- ('Ford v Ferrari', 2019, 152, 'Sport', 'American car designer Carroll Shelby and driver Ken Miles battle corporate interference and the laws of physics to build a revolutionary race car for Ford.', 'Matt Damon, Christian Bale, Jon Bernthal', 8.1),
-- ('Knives Out', 2019, 130, 'Mystery', 'A detective investigates the death of a patriarch of an eccentric, combative family.', 'Daniel Craig, Chris Evans, Ana de Armas', 7.9),
-- ('Marriage Story', 2019, 137, 'Romance', 'Noah Baumbach\'s incisive and compassionate look at a marriage breaking up and a family staying together.', 'Adam Driver, Scarlett Johansson, Julia Greer', 7.9),
-- ('Jojo Rabbit', 2019, 108, 'Comedy', 'A young boy in Hitler\'s army finds out his mother is hiding a Jewish girl in their home.', 'Roman Griffin Davis, Thomasin McKenzie, Scarlett Johansson', 7.9),
-- ('Little Women', 2019, 135, 'Drama', 'Jo March reflects back and forth on her life, telling the beloved story of the March sisters.', 'Saoirse Ronan, Emma Watson, Florence Pugh', 7.8),
-- ('The Lighthouse', 2019, 109, 'Horror', 'Two lighthouse keepers try to maintain their sanity while living on a remote and mysterious New England island in the 1890s.', 'Robert Pattinson, Willem Dafoe, Valeriia Karaman', 7.5),
-- ('Toy Story 4', 2019, 100, 'Animation', 'When a new toy called "Forky" joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be for a toy.', 'Tom Hanks, Tim Allen, Annie Potts', 7.8),
-- ('The Farewell', 2019, 100, 'Comedy', 'A Chinese family discovers their grandmother has only a short while left to live and decide to keep her in the dark, scheduling a wedding to gather before she dies.', 'Awkwafina, Tzi Ma, Diana Lin', 7.6),
-- ('Uncut Gems', 2019, 135, 'Crime', 'With his debts mounting and angry collectors closing in, a fast-talking New York City jeweler risks everything in hope of staying afloat and alive.', 'Adam Sandler, Julia Fox, Idina Menzel', 7.4),
-- ('Ad Astra', 2019, 123, 'Sci-Fi', 'Astronaut Roy McBride undertakes a mission across an unforgiving solar system to uncover the truth about his missing father.', 'Brad Pitt, Tommy Lee Jones, Ruth Negga', 6.6),
-- ('A Beautiful Day in the Neighborhood', 2019, 109, 'Biography', 'Based on the true story of a real-life friendship between Fred Rogers and journalist Lloyd Vogel.', 'Tom Hanks, Matthew Rhys, Chris Cooper', 7.3),
-- ('Bombshell', 2019, 109, 'Drama', 'A group of women take on Fox News head Roger Ailes and the toxic atmosphere he presided over at the network.', 'Charlize Theron, Nicole Kidman, Margot Robbie', 6.8),
-- ('The Two Popes', 2019, 125, 'Biography', 'Behind Vatican walls, the conservative Pope Benedict and the liberal future Pope Francis must find common ground to forge a new path for the Catholic Church.', 'Anthony Hopkins, Jonathan Pryce, Juan Minujín', 7.6),
-- ('Frozen II', 2019, 103, 'Animation', 'Anna, Elsa, Kristoff, Olaf, and Sven leave Arendelle to travel to an ancient, autumn-bound forest of an enchanted land.', 'Kristen Bell, Idina Menzel, Josh Gad', 6.8);
