import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchDirectorDetail } from '../api';
import Filmography from '../components/Filmography';
import type { DirectorDetailResponse } from '../types';

export default function DirectorDetail() {
  const { id } = useParams<{ id: string }>();
  const [director, setDirector] = useState<DirectorDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchDirectorDetail(Number(id))
      .then((data) => {
        setDirector(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container mt-5 text-center">Loading...</div>;
  if (error) return <div className="container mt-5 text-center text-danger">{error}</div>;
  if (!director) return null;

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-secondary btn-sm mb-4">
        Back to Movies
      </Link>

      <h2 className="mb-1">{director.name}</h2>
      <p className="text-muted mb-3">Director</p>

      <h5 className="mb-3">Filmography</h5>
      <Filmography movies={director.movies} />
    </div>
  );
}
