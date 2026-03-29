import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Movies from '../pages/Movies';

const mockMovies = [
  { id: 1, title: 'Inception', release_year: 2010, director: { id: 3, name: 'Christopher Nolan' }, genres: ['Sci-Fi'] },
  { id: 2, title: 'The Dark Knight', release_year: 2008, director: { id: 3, name: 'Christopher Nolan' }, genres: ['Action'] },
];

const mockGenres = [
  { id: 1, name: 'Sci-Fi' },
  { id: 2, name: 'Action' },
];

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockImplementation((url: string) => {
      if (url.includes('/genres/')) {
        return Promise.resolve(new Response(JSON.stringify(mockGenres)));
      }
      return Promise.resolve(new Response(JSON.stringify(mockMovies)));
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Movies page', () => {
  it('renders movie cards after loading', async () => {
    render(
      <MemoryRouter>
        <Movies />
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText('Inception')).toBeInTheDocument();
      expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
    });
  });

  it('shows empty state when no movies are returned', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/genres/')) {
          return Promise.resolve(new Response(JSON.stringify(mockGenres)));
        }
        return Promise.resolve(new Response(JSON.stringify([])));
      }),
    );

    render(
      <MemoryRouter>
        <Movies />
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText(/no movies found/i)).toBeInTheDocument();
    });
  });

  it('shows an error message when the fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/genres/')) {
          return Promise.resolve(new Response(JSON.stringify(mockGenres)));
        }
        return Promise.resolve(new Response('error', { status: 500 }));
      }),
    );

    render(
      <MemoryRouter>
        <Movies />
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch movies')).toBeInTheDocument();
    });
  });

  describe('filter bar', () => {
    it('sends actor filter in the fetch URL', async () => {
      render(
        <MemoryRouter>
          <Movies />
        </MemoryRouter>,
      );
      await waitFor(() => expect(screen.getByText('Inception')).toBeInTheDocument());

      fireEvent.change(screen.getByPlaceholderText('Actor name'), { target: { value: 'Hanks' } });
      fireEvent.click(screen.getByRole('button', { name: /^filter$/i }));

      await waitFor(() => {
        expect(vi.mocked(fetch)).toHaveBeenCalledWith(expect.stringContaining('actor=Hanks'));
      });
    });

    it('sends director filter in the fetch URL', async () => {
      render(
        <MemoryRouter>
          <Movies />
        </MemoryRouter>,
      );
      await waitFor(() => expect(screen.getByText('Inception')).toBeInTheDocument());

      fireEvent.change(screen.getByPlaceholderText('Director name'), { target: { value: 'Nolan' } });
      fireEvent.click(screen.getByRole('button', { name: /^filter$/i }));

      await waitFor(() => {
        expect(vi.mocked(fetch)).toHaveBeenCalledWith(expect.stringContaining('director=Nolan'));
      });
    });

    it('sends genre filter in the fetch URL', async () => {
      render(
        <MemoryRouter>
          <Movies />
        </MemoryRouter>,
      );
      await waitFor(() => expect(screen.getByText('Inception')).toBeInTheDocument());

      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Sci-Fi' } });
      fireEvent.click(screen.getByRole('button', { name: /^filter$/i }));

      await waitFor(() => {
        expect(vi.mocked(fetch)).toHaveBeenCalledWith(expect.stringContaining('genre=Sci-Fi'));
      });
    });

    it('clears all filters and refetches without params', async () => {
      render(
        <MemoryRouter>
          <Movies />
        </MemoryRouter>,
      );
      await waitFor(() => expect(screen.getByText('Inception')).toBeInTheDocument());

      fireEvent.change(screen.getByPlaceholderText('Actor name'), { target: { value: 'Hanks' } });
      fireEvent.click(screen.getByRole('button', { name: /^filter$/i }));
      await waitFor(() => {
        expect(vi.mocked(fetch)).toHaveBeenCalledWith(expect.stringContaining('actor=Hanks'));
      });

      fireEvent.click(screen.getByRole('button', { name: /clear/i }));

      await waitFor(() => {
        expect(vi.mocked(fetch)).toHaveBeenLastCalledWith('http://127.0.0.1:8000/v1/movies/');
      });
    });
  });
});
