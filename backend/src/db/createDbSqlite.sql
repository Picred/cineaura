-- SQLite schema for Cineaura

-- Table structure for table `films`
CREATE TABLE IF NOT EXISTS `films` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` TEXT NOT NULL,
  `release_year` INTEGER NOT NULL,
  `duration` INTEGER NOT NULL,
  `genre` TEXT DEFAULT NULL,
  `description` TEXT,
  `cast` TEXT DEFAULT NULL,
  `rating` REAL DEFAULT NULL,
  `img` TEXT DEFAULT 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*AC9frN1qFnn-I2JCycN8fw.png',
  `coverImg` TEXT DEFAULT 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*AC9frN1qFnn-I2JCycN8fw.png',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table structure for table `users`
CREATE TABLE IF NOT EXISTS `users` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `username` TEXT NOT NULL UNIQUE,
  `password` TEXT NOT NULL,
  `isAdmin` INTEGER DEFAULT 0
);

-- Table structure for table `schedule`
CREATE TABLE IF NOT EXISTS `schedule` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `film_id` INTEGER NOT NULL,
  `schedule_datetime` TEXT NOT NULL,
  `capacity` INTEGER NOT NULL,
  FOREIGN KEY (`film_id`) REFERENCES `films` (`id`) ON DELETE CASCADE
);

-- Table structure for table `tickets`
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_id` INTEGER NOT NULL,
  `film_id` INTEGER NOT NULL,
  `schedule_id` INTEGER NOT NULL,
  `purchase_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `seat_number` TEXT DEFAULT NULL,
  `price` REAL NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`film_id`) REFERENCES `films` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`) ON DELETE CASCADE
);

-- Initial data
INSERT OR IGNORE INTO `users` (id, username, password, isAdmin) VALUES (1, 'admin', 'admin', 1);
INSERT OR IGNORE INTO `users` (id, username, password, isAdmin) VALUES (2, 'user', 'user', 0);

INSERT OR IGNORE INTO `films` (id, title, release_year, duration, genre, description, cast, rating, img, coverImg, created_at) VALUES 
(53,'Twisters',2024,123,'Action, Adventure, Drama','As storm season intensifies, the paths of former storm chaser Kate Carter and reckless social-media superstar Tyler Owens collide when terrifying phenomena never seen before are unleashed. The pair and their competing teams find themselves squarely in the paths of multiple storm systems converging over central Oklahoma in the fight of their lives.','Michael Crichton, Lee Isaac Chung, Anne-Marie Martin',7.1,'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg','https://image.tmdb.org/t/p/original/58D6ZAvOKxlHjyX9S8qNKSBE9Y.jpg','2024-08-14 16:24:14'),
(54,'Fly Me to the Moon - Le due facce della Luna',2024,132,'Romance, Commedy','Sparks fly in all directions as marketing maven Kelly Jones, brought in to fix NASA''s public image, wreaks havoc on Apollo 11 launch director Cole Davis'' already difficult task of putting a man on the moon. When the White House deems the mission too important to fail, Jones is directed to stage a fake moon landing as backup, and the countdown truly begins.','Greg Berlanti,  Rose Gilroy, Bill Kirstein',7.0,'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lb0XDH6LbkYwzbHTqjsUNZTLXMS.jpg','https://image.tmdb.org/t/p/original/8xMR5w9qfpwhTJzjjvfj2ywvIF3.jpg','2024-08-14 16:26:29'),
(55,'Alien: Romulus',2024,119,'Science Fiction, Horror, Thriller','While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.','Fede Álvarez, Dan O''Bannon, Ronald Shusett',7.8,'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg','https://image.tmdb.org/t/p/original/iYqSQaWDttQIQzsxg9xHyg0bttG.jpg','2024-08-14 16:28:06'),
(56,'The Instigators ',2024,101,'Action, Comedy, Crime','Rory and Cobby are unlikely partners thrown together for a heist. But when it goes awry, they team up to outrun police, backward bureaucrats, and a vengeful crime boss.','Doug Liman, Casey Affleck, Chuck MacLean',6.5,'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pIz9csYn1yjrzQi0BuBZNJrTMi0.jpg','https://image.tmdb.org/t/p/original/qnVXjkk7FCkXzC6zgWpvUOfebg4.jpg','2024-08-14 16:29:23'),
(57,'Watchmen: Chapter I',2024,84,'Animation, Mystery, Science Fiction, Action','In 1985, the murder of a government-sponsored superhero draws his outlawed colleagues out of retirement and into a mystery that threatens to upend their personal lives and the world itself.','Brandon Vietti, J. Michael Straczynski',8.3,'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tE2vZ6HdlmKaBh0wpsvHCf7HJKo.jpg','https://image.tmdb.org/t/p/original/4cazJU7Jjb5EukxmT7XRCoO9VnV.jpg','2024-08-14 16:30:25'),
(59,'Deadpool',2016,108,'Action, Adventure, Comedy','The origin story of former Special Forces operative turned mercenary Wade Wilson, who, after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.','Tim Miller, Rhett Reese, Paul Wernick',7.6,'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3E53WEZJqP6aM84D8CckXx4pIHw.jpg','https://image.tmdb.org/t/p/original/en971MEXui9diirXlogOrPKmsEn.jpg','2024-08-14 16:47:02'),
(60,'One Minute Time Machine',2014,1,'Mystery, Comedy, Romance','Every time the beautiful Regina rejects his advances, James pushes a red button and tries again, all the while unaware of the reality and consequences of his actions.','Devon Avery, Sean Crouch',7.3,'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/2JQUM8bNjGFlwilokqmZ0AvvsY4.jpg','https://image.tmdb.org/t/p/original/qiewTS30GsKTFXKTL55soJYuLh4.jpg','2024-08-14 17:10:33');
