# Cineaura

Cineaura is a full-stack website for managing cinemas, featuring an authentication and booking system.

## Description

The Cineaura website offers several features, including:

- **User Authentication**: Registration and login for users/admins
- **Ticket Booking**: System for selecting movies, showtimes
- **Movie Listings**: Display of available movies with details like plot, cast.

## Requirements

To run the project, make sure you have the following prerequisites:

- Node.js \[[Guide NVM](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)\]
- MySQL \[[Guide](https://dev.mysql.com/doc/refman/8.4/en/linux-installation.html)\]

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Picred/cineaura.git
```

2. Install the dependencies:

```bash
cd cineaura/backend
npm install
```

```bash
cd cineaura/frontend
npm install
```

3. Create the database:

```bash
cd cineaura
sudo mysql < backend/src/db/createDb.sql
```

4. Start both the backend and frontend servers:

```bash
cd cineaura/backend
npm run dev
```

```bash
cd cineaura/frontend
npm run dev
```

5. Access the website at `http://localhost:5173` in your browser.
