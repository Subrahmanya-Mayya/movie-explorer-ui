export type GenreResponse = {
  id: number;
  name: string;
};

export type ActorRef = {
  id: number;
  name: string;
};

export type DirectorRef = {
  id: number;
  name: string;
};

export type MovieSimpleResponse = {
  id: number;
  title: string;
  release_year: number;
};

export type MovieListResponse = {
  id: number;
  title: string;
  release_year: number;
  director: DirectorRef | null;
  genres: string[];
};

export type MovieDetailResponse = {
  id: number;
  title: string;
  release_year: number;
  synopsis: string;
  average_score: number;
  director: DirectorRef | null;
  genres: string[];
  actors: ActorRef[];
};

export type ReviewResponse = {
  id: number;
  reviewer_name: string;
  comment: string;
  score: number;
};

export type MovieReviewsResponse = {
  average_score: number;
  reviews: ReviewResponse[];
};

export type ActorDetailResponse = {
  id: number;
  name: string;
  movies: MovieSimpleResponse[];
};

export type DirectorDetailResponse = {
  id: number;
  name: string;
  movies: MovieSimpleResponse[];
};

export type MovieFilters = {
  genre?: string[];
  actor?: string;
  director?: string;
  release_year?: number;
};
