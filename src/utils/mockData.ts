export const MOCK_FILMS = [
  {
    id: 53,
    title: "Twisters",
    release_year: 2024,
    duration: 123,
    genre: "Action, Adventure, Drama",
    description: "As storm season intensifies, the paths of former storm chaser Kate Carter and reckless social-media superstar Tyler Owens collide when terrifying phenomena never seen before are unleashed.",
    cast: "Michael Crichton, Lee Isaac Chung, Anne-Marie Martin",
    rating: 7.1,
    img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg",
    coverImg: "https://image.tmdb.org/t/p/original/58D6ZAvOKxlHjyX9S8qNKSBE9Y.jpg"
  },
  {
    id: 54,
    title: "Fly Me to the Moon - Le due facce della Luna",
    release_year: 2024,
    duration: 132,
    genre: "Romance, Commedy",
    description: "Sparks fly in all directions as marketing maven Kelly Jones, brought in to fix NASA's public image, wreaks havoc on Apollo 11 launch director Cole Davis' already difficult task.",
    cast: "Greg Berlanti, Rose Gilroy, Bill Kirstein",
    rating: 7.0,
    img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lb0XDH6LbkYwzbHTqjsUNZTLXMS.jpg",
    coverImg: "https://image.tmdb.org/t/p/original/8xMR5w9qfpwhTJzjjvfj2ywvIF3.jpg"
  },
  {
    id: 55,
    title: "Alien: Romulus",
    release_year: 2024,
    duration: 119,
    genre: "Science Fiction, Horror, Thriller",
    description: "While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.",
    cast: "Fede Álvarez, Dan O'Bannon, Ronald Shusett",
    rating: 7.8,
    img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
    coverImg: "https://image.tmdb.org/t/p/original/iYqSQaWDttQIQzsxg9xHyg0bttG.jpg"
  },
  {
    id: 56,
    title: "The Instigators",
    release_year: 2024,
    duration: 101,
    genre: "Action, Comedy, Crime",
    description: "Rory and Cobby are unlikely partners thrown together for a heist. But when it goes awry, they team up to outrun police, backward bureaucrats, and a vengeful crime boss.",
    cast: "Doug Liman, Casey Affleck, Chuck MacLean",
    rating: 6.5,
    img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pIz9csYn1yjrzQi0BuBZNJrTMi0.jpg",
    coverImg: "https://image.tmdb.org/t/p/original/qnVXjkk7FCkXzC6zgWpvUOfebg4.jpg"
  },
  {
    id: 57,
    title: "Watchmen: Chapter I",
    release_year: 2024,
    duration: 84,
    genre: "Animation, Mystery, Science Fiction, Action",
    description: "In 1985, the murder of a government-sponsored superhero draws his outlawed colleagues out of retirement and into a mystery that threatens to upend their personal lives.",
    cast: "Brandon Vietti, J. Michael Straczynski",
    rating: 8.3,
    img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tE2vZ6HdlmKaBh0wpsvHCf7HJKo.jpg",
    coverImg: "https://image.tmdb.org/t/p/original/4cazJU7Jjb5EukxmT7XRCoO9VnV.jpg"
  },
  {
    id: 59,
    title: "Deadpool",
    release_year: 2016,
    duration: 108,
    genre: "Action, Adventure, Comedy",
    description: "The origin story of former Special Forces operative turned mercenary Wade Wilson, who, after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool.",
    cast: "Tim Miller, Rhett Reese, Paul Wernick",
    rating: 7.6,
    img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3E53WEZJqP6aM84D8CckXx4pIHw.jpg",
    coverImg: "https://image.tmdb.org/t/p/original/en971MEXui9diirXlogOrPKmsEn.jpg"
  },
  {
    id: 60,
    title: "One Minute Time Machine",
    release_year: 2014,
    duration: 1,
    genre: "Mystery, Comedy, Romance",
    description: "Every time the beautiful Regina rejects his advances, James pushes a red button and tries again, all the while unaware of the reality and consequences of his actions.",
    cast: "Devon Avery, Sean Crouch",
    rating: 7.3,
    img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/2JQUM8bNjGFlwilokqmZ0AvvsY4.jpg",
    coverImg: "https://image.tmdb.org/t/p/original/qiewTS30GsKTFXKTL55soJYuLh4.jpg"
  }
];

export const MOCK_USERS = [
  { id: 1, username: "admin", password: "admin", isAdmin: 1 },
  { id: 2, username: "user", password: "user", isAdmin: 0 }
];

export const MOCK_SCHEDULE = [
  { id: 1, film_id: 53, schedule_datetime: new Date(Date.now() + 3600000).toISOString(), capacity: 100 },
  { id: 2, film_id: 55, schedule_datetime: new Date(Date.now() + 7200000).toISOString(), capacity: 80 }
];
