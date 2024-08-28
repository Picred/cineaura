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
cd backend
npm install
```

3. Create the database:

```bash
sudo mysql < backend/src/db/createDb.sql
```

4. Build the frontend:

```bash
cd frontend
npm install
npm run build
```

5. Start the server:

```bash
cd backend
npm start
```

6. Access the website at `http://localhost:8080` in your browser.

## Development

If you want to edit the code, you can run the development server:

Start both the frontend and backend servers with hot-reloading (_Uses nodemon_):

```bash
cd frontend
npm run dev
```

2. Start the backend server:

```bash
cd backend
npm run dev
```
