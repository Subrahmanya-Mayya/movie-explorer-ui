import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ActorDetail from './pages/ActorDetail';
import DirectorDetail from './pages/DirectorDetail';
import MovieDetail from './pages/MovieDetail';
import Movies from './pages/Movies';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/actors/:id" element={<ActorDetail />} />
        <Route path="/directors/:id" element={<DirectorDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;