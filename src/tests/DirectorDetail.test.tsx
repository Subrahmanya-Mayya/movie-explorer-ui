import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DirectorDetail from '../pages/DirectorDetail';

const mockDirector = {
  id: 3,
  name: 'Christopher Nolan',
  movies: [
    { id: 1, title: 'Inception', release_year: 2010 },
    { id: 2, title: 'Interstellar', release_year: 2014 },
  ],
};

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(new Response(JSON.stringify(mockDirector))),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function renderDirectorDetail() {
  return render(
    <MemoryRouter initialEntries={['/directors/3']}>
      <Routes>
        <Route path="/directors/:id" element={<DirectorDetail />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('DirectorDetail page', () => {
  it('renders the director name', async () => {
    renderDirectorDetail();
    await waitFor(() => {
      expect(screen.getByText('Christopher Nolan')).toBeInTheDocument();
    });
  });

  it('renders filmography with movie links', async () => {
    renderDirectorDetail();
    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Inception' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Interstellar' })).toBeInTheDocument();
      expect(screen.getByText('2014')).toBeInTheDocument();
    });
  });

  it('shows error when director is not found', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ detail: 'Director not found' }), { status: 404 }),
      ),
    );
    renderDirectorDetail();
    await waitFor(() => {
      expect(screen.getByText('Director not found')).toBeInTheDocument();
    });
  });
});
