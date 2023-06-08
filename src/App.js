import React from 'react';
import TrendingCryptocurrencies from './components/TrendingCryptocurrencies';
import SearchCryptocurrencies from './components/SearchCryptocurrencies';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Favorites from './components/Favorites'; 

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
        <Route path="/" element={<SearchCryptocurrencies />} />
        <Route path="/trending" element={<TrendingCryptocurrencies />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;