import type {
  ActorDetailResponse,
  DirectorDetailResponse,
  GenreResponse,
  MovieDetailResponse,
  MovieFilters,
  MovieListResponse,
  MovieReviewsResponse,
} from './types';

const BASE_URL = 'http://127.0.0.1:8000/v1';

async function throwApiError(res: Response, fallback: string): Promise<never> {
  if (res.status === 404 || res.status === 422) {
    try {
      const body = await res.json() as { detail: string | { msg: string }[] };
      if (typeof body.detail === 'string') throw new Error(body.detail);
      const msg = body.detail?.map((d) => d.msg).join('; ');
      throw new Error(msg || fallback);
    } catch (e) {
      if (e instanceof Error) throw e;
    }
  }
  throw new Error(fallback);
}

export async function fetchMovies(filters: MovieFilters = {}): Promise<MovieListResponse[]> {
  const params = new URLSearchParams();

  if (filters.genre) {
    filters.genre.forEach((g) => params.append('genre', g));
  }
  if (filters.actor) params.set('actor', filters.actor);
  if (filters.director) params.set('director', filters.director);

  const query = params.toString();
  const url = query ? `${BASE_URL}/movies/?${query}` : `${BASE_URL}/movies/`;
  const res = await fetch(url);
  if (!res.ok) return throwApiError(res, 'Failed to fetch movies');
  return res.json() as Promise<MovieListResponse[]>;
}

export async function fetchMovieDetail(id: number): Promise<MovieDetailResponse> {
  const res = await fetch(`${BASE_URL}/movies/${id}`);
  if (!res.ok) return throwApiError(res, 'Movie not found');
  return res.json() as Promise<MovieDetailResponse>;
}

export async function fetchMovieReviews(id: number): Promise<MovieReviewsResponse> {
  const res = await fetch(`${BASE_URL}/movies/${id}/reviews`);
  if (!res.ok) return throwApiError(res, 'Failed to fetch reviews');
  return res.json() as Promise<MovieReviewsResponse>;
}

export async function fetchGenres(): Promise<GenreResponse[]> {
  const res = await fetch(`${BASE_URL}/genres/`);
  if (!res.ok) return throwApiError(res, 'Failed to fetch genres');
  return res.json() as Promise<GenreResponse[]>;
}

export async function fetchActorDetail(id: number): Promise<ActorDetailResponse> {
  const res = await fetch(`${BASE_URL}/actors/${id}`);
  if (!res.ok) return throwApiError(res, 'Actor not found');
  return res.json() as Promise<ActorDetailResponse>;
}

export async function fetchDirectorDetail(id: number): Promise<DirectorDetailResponse> {
  const res = await fetch(`${BASE_URL}/directors/${id}`);
  if (!res.ok) return throwApiError(res, 'Director not found');
  return res.json() as Promise<DirectorDetailResponse>;
}
