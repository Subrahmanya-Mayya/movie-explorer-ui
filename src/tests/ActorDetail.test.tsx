import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ActorDetail from '../pages/ActorDetail';

const mockActor = {
  id: 1,
  name: 'Leonardo DiCaprio',
  movies: [
    { id: 1, title: 'Inception', release_year: 2010 },
    { id: 4, title: 'The Revenant', release_year: 2015 },
  ],
};

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(new Response(JSON.stringify(mockActor))),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function renderActorDetail() {
  return render(
    <MemoryRouter initialEntries={['/actors/1']}>
      <Routes>
        <Route path="/actors/:id" element={<ActorDetail />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ActorDetail page', () => {
  it('renders the actor name', async () => {
    renderActorDetail();
    await waitFor(() => {
      expect(screen.getByText('Leonardo DiCaprio')).toBeInTheDocument();
    });
  });

  it('renders filmography with movie links', async () => {
    renderActorDetail();
    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Inception' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'The Revenant' })).toBeInTheDocument();
      expect(screen.getByText('2010')).toBeInTheDocument();
    });
  });

  it('shows error when actor is not found', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ detail: 'Actor not found' }), { status: 404 }),
      ),
    );
    renderActorDetail();
    await waitFor(() => {
      expect(screen.getByText('Actor not found')).toBeInTheDocument();
    });
  });
});
