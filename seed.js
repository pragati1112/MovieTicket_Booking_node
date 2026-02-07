const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const Show = require('./models/Show');
const Screen = require('./models/Screen');
const connectDB = require('./config/db');
require('dotenv').config();

const movies = [
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    duration: 148,
    language: 'English',
    releaseDate: new Date('2010-07-16'),
    image: 'https://image.tmdb.org/t/p/original/qmDpIGZwY6ySStUElIXUbDOEZkf.jpg'
  },
  {
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    duration: 169,
    language: 'English',
    releaseDate: new Date('2014-11-07'),
    image: 'https://image.tmdb.org/t/p/original/gEU2QniL6E77AAy5JU41e9MXo9s.jpg'
  },
  {
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    duration: 152,
    language: 'English',
    releaseDate: new Date('2008-07-18'),
    image: 'https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
  },
  {
    title: 'Avatar: The Way of Water',
    description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their home.',
    duration: 192,
    language: 'English',
    releaseDate: new Date('2022-12-16'),
    image: 'https://image.tmdb.org/t/p/original/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg'
  },
  {
    title: 'Spider-Man: Across the Spider-Verse',
    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    duration: 140,
    language: 'English',
    releaseDate: new Date('2023-06-02'),
    image: 'https://image.tmdb.org/t/p/original/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg'
  },
  {
    title: 'Oppenheimer',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    duration: 180,
    language: 'English',
    releaseDate: new Date('2023-07-21'),
    image: 'https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg'
  }
];

const seedData = async () => {
  await connectDB();

  try {
    // Clear existing data
    await Movie.deleteMany({});
    await Show.deleteMany({});
    await Screen.deleteMany({});

    console.log('Cleared existing movies and shows...');

    // Create a default screen
    const screen = await Screen.create({
      name: 'Screen 1',
      capacity: 100,
      type: 'IMAX'
    });

    // Insert Movies
    const createdMovies = await Movie.insertMany(movies);
    console.log(` Added ${createdMovies.length} movies...`);

    // Create Shows for each movie
    const shows = [];
    createdMovies.forEach(movie => {
        shows.push({
            movie: movie._id,
            screen: screen._id,
            time: '10:00 AM',
            price: 250
        });
        shows.push({
            movie: movie._id,
            screen: screen._id,
            time: '01:00 PM',
            price: 300
        });
        shows.push({
            movie: movie._id,
            screen: screen._id,
            time: '06:00 PM',
            price: 450
        });
    });

    await Show.insertMany(shows);
    console.log(` Added ${shows.length} shows...`);

    console.log(' Seeding Complete!');
    process.exit();
  } catch (error) {
    console.error(' Seeding Failed:', error);
    process.exit(1);
  }
};

seedData();
