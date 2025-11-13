import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import PatternDetailPage from './pages/pattern-detail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pattern/:id" element={<PatternDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
