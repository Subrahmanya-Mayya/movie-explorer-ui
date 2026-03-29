import { Link } from 'react-router-dom';
import type { MovieSimpleResponse } from '../types';

type Props = {
  movies: MovieSimpleResponse[];
};

export default function Filmography({ movies }: Props) {
  if (movies.length === 0) {
    return <p className="text-muted">No movies on record.</p>;
  }

  return (
    <ul className="list-group">
      {movies.map((movie) => (
        <li
          key={movie.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          <span className="text-muted">{movie.release_year}</span>
        </li>
      ))}
    </ul>
  );
}
