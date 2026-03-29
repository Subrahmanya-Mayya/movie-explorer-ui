import { useEffect, useState } from 'react';
import { fetchGenres, fetchMovies } from '../api';
import FilterBar from '../components/FilterBar';
import MovieCard from '../components/MovieCard';
import type { GenreResponse, MovieFilters, MovieListResponse } from '../types';

export default function Movies() {
  const [movies, setMovies] = useState<MovieListResponse[]>([]);
  const [genres, setGenres] = useState<GenreResponse[]>([]);
  const [filters, setFilters] = useState<MovieFilters>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGenres()
      .then(setGenres)
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchMovies(filters)
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [filters]);

  function handleFilter(newFilters: MovieFilters) {
    setLoading(true);
    setError(null);
    setFilters(newFilters);
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Movies</h2>
      <FilterBar genres={genres} onFilter={handleFilter} />

      {loading && <div className="text-center mt-5">Loading...</div>}
      {error && <div className="text-center text-danger mt-3">{error}</div>}

      {!loading && !error && movies.length === 0 && (
        <div className="text-center mt-5 text-muted">
          No movies found for the selected filters.
        </div>
      )}

      {!loading && !error && (
        <div className="row">
          {movies.map((movie) => (
            <div className="col-md-4 mb-4" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}