import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchActorDetail } from '../api';
import Filmography from '../components/Filmography';
import type { ActorDetailResponse } from '../types';

export default function ActorDetail() {
  const { id } = useParams<{ id: string }>();
  const [actor, setActor] = useState<ActorDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchActorDetail(Number(id))
      .then((data) => {
        setActor(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container mt-5 text-center">Loading...</div>;
  if (error) return <div className="container mt-5 text-center text-danger">{error}</div>;
  if (!actor) return null;

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-secondary btn-sm mb-4">
        Back to Movies
      </Link>

      <h2 className="mb-1">{actor.name}</h2>
      <p className="text-muted mb-3">Actor</p>

      <h5 className="mb-3">Filmography</h5>
      <Filmography movies={actor.movies} />
    </div>
  );
}
