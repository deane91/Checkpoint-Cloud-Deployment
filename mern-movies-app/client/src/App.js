import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', director: '', year: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/movies', newMovie)
      .then(response => setMovies([...movies, response.data]))
      .catch(error => console.error('Error adding movie:', error));
  };
  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>{movie.title} by {movie.director} ({movie.year})</li>
        ))}
      </ul>
      <h2>Add a new movie</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={newMovie.title} onChange={handleChange} placeholder="Title" required />
        <input type="text" name="director" value={newMovie.director} onChange={handleChange} placeholder="Director" required />
        <input type="number" name="year" value={newMovie.year} onChange={handleChange} placeholder="Year" required />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default App;

