import { useState } from 'react';
import type { GenreResponse, MovieFilters } from '../types';

type Props = {
  genres: GenreResponse[];
  onFilter: (filters: MovieFilters) => void;
};

export default function FilterBar({ genres, onFilter }: Props) {
  const [genre, setGenre] = useState('');
  const [actor, setActor] = useState('');
  const [director, setDirector] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const filters: MovieFilters = {};
    if (genre) filters.genre = [genre];
    if (actor.trim()) filters.actor = actor.trim();
    if (director.trim()) filters.director = director.trim();
    onFilter(filters);
  }

  function handleReset() {
    setGenre('');
    setActor('');
    setDirector('');
    onFilter({});
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2 align-items-end">
        <div className="col">
          <label className="form-label">Genre</label>
          <select
            className="form-select"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">All</option>
            {genres.map((g) => (
              <option key={g.id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <label className="form-label">Actor</label>
          <input
            type="text"
            className="form-control"
            placeholder="Actor name"
            value={actor}
            onChange={(e) => setActor(e.target.value)}
          />
        </div>
        <div className="col">
          <label className="form-label">Director</label>
          <input
            type="text"
            className="form-control"
            placeholder="Director name"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
        </div>
        <div className="col-auto d-flex gap-2 align-self-end">
          <button type="submit" className="btn btn-primary">
            Filter
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
}
