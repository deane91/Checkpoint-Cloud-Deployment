// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri = 'mongodb://localhost:27017/test';
mongoose.connect(uri).then(
  () => { console.log('MongoDB database connection established successfully'); },
  err => { console.error('Connection error', err); }
);

// Movie schema and model
const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  year: Number,
});

const Movie = mongoose.model('Movie', movieSchema);

// Routes
app.get('/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.post('/movies', async (req, res) => {
  const newMovie = new Movie(req.body);
  await newMovie.save();
  res.json(newMovie);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
