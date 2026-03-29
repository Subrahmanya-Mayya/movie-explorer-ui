import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchMovieDetail, fetchMovieReviews } from '../api';
import GenreBadges from '../components/GenreBadges';
import ReviewList from '../components/ReviewList';
import type { MovieDetailResponse, MovieReviewsResponse } from '../types';

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailResponse | null>(null);
  const [reviews, setReviews] = useState<MovieReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const numId = Number(id);
    Promise.all([fetchMovieDetail(numId), fetchMovieReviews(numId)])
      .then(([movieData, reviewData]) => {
        setMovie(movieData);
        setReviews(reviewData);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container mt-5 text-center">Loading...</div>;
  if (error) return <div className="container mt-5 text-center text-danger">{error}</div>;
  if (!movie) return null;

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-secondary btn-sm mb-4">
        Back to Movies
      </Link>

      <h2 className="mb-1">{movie.title}</h2>
      <p className="text-muted mb-1">{movie.release_year}</p>
      {movie.average_score > 0 && (
        <p className="mb-3">
          <strong>Rating:</strong> {movie.average_score.toFixed(1)} / 10
        </p>
      )}

      <div className="mb-3">
        <GenreBadges genres={movie.genres} />
      </div>

      {movie.synopsis && (
        <p className="mb-3">{movie.synopsis}</p>
      )}

      <div className="mb-3">
        <strong>Director:</strong>{' '}
        {movie.director
          ? <Link to={`/directors/${movie.director.id}`}>{movie.director.name}</Link>
          : <span className="text-muted">Unknown</span>}
      </div>

      <div className="mb-4">
        <strong>Cast:</strong>
        {movie.actors.length === 0 ? (
          <span className="text-muted ms-2">No cast information available.</span>
        ) : (
          <ul className="list-unstyled mt-2 ms-1">
            {movie.actors.map((actor) => (
              <li key={actor.id}>
                <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {reviews && (
        <div>
          <h5 className="mb-3">Reviews</h5>
          <ReviewList reviews={reviews.reviews} />
        </div>
      )}
    </div>
  );
}

