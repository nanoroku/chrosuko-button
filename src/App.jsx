import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import HeartPage from './components/HeartPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heart" element={<HeartPage />} />
      </Routes>
    </>
  );
}

export default App;
