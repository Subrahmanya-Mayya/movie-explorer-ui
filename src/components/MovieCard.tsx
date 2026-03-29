import { useNavigate } from 'react-router-dom';
import GenreBadges from './GenreBadges';
import type { MovieListResponse } from '../types';

type Props = {
  movie: MovieListResponse;
};

export default function MovieCard({ movie }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="card h-100 shadow-sm"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text text-muted mb-1">{movie.release_year}</p>
        {movie.director && (
          <p className="card-text mb-2">
            <strong>{movie.director.name}</strong>
          </p>
        )}
        <GenreBadges genres={movie.genres} />
      </div>
    </div>
  );
}
