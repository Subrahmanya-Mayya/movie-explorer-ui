import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MovieDetail from '../pages/MovieDetail';

const mockMovie = {
  id: 1,
  title: 'Inception',
  release_year: 2010,
  synopsis: 'A thief who steals corporate secrets through dream-sharing technology.',
  average_score: 8.2,
  director: { id: 3, name: 'Christopher Nolan' },
  genres: ['Sci-Fi', 'Thriller'],
  actors: [
    { id: 1, name: 'Leonardo DiCaprio' },
    { id: 2, name: 'Joseph Gordon-Levitt' },
  ],
};

const mockReviews = {
  average_score: 8.2,
  reviews: [
    { id: 1, reviewer_name: 'Alice', comment: 'Great film.', score: 8.5 },
  ],
};

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockImplementation((url: string) => {
      if (url.includes('/reviews')) {
        return Promise.resolve(new Response(JSON.stringify(mockReviews)));
      }
      return Promise.resolve(new Response(JSON.stringify(mockMovie)));
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function renderMovieDetail() {
  return render(
    <MemoryRouter initialEntries={['/movies/1']}>
      <Routes>
        <Route path="/movies/:id" element={<MovieDetail />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('MovieDetail page', () => {
  it('renders the movie title and release year', async () => {
    renderMovieDetail();
    await waitFor(() => {
      expect(screen.getByText('Inception')).toBeInTheDocument();
      expect(screen.getByText('2010')).toBeInTheDocument();
    });
  });

  it('renders genre badges', async () => {
    renderMovieDetail();
    await waitFor(() => {
      expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
      expect(screen.getByText('Thriller')).toBeInTheDocument();
    });
  });

  it('renders synopsis', async () => {
    renderMovieDetail();
    await waitFor(() => {
      expect(screen.getByText(mockMovie.synopsis)).toBeInTheDocument();
    });
  });

  it('renders director link and cast links', async () => {
    renderMovieDetail();
    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Christopher Nolan' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Leonardo DiCaprio' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Joseph Gordon-Levitt' })).toBeInTheDocument();
    });
  });

  it('renders reviews', async () => {
    renderMovieDetail();
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Great film.')).toBeInTheDocument();
    });
  });

  it('shows a fallback when fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(() =>
        Promise.resolve(
          new Response(JSON.stringify({ detail: 'Movie not found' }), { status: 404 }),
        ),
      ),
    );

    renderMovieDetail();
    await waitFor(() => {
      expect(screen.getByText('Movie not found')).toBeInTheDocument();
    });
  });
});

