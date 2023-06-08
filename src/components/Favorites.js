import React, { useEffect, useState } from 'react';
import { getCryptocurrenciesFromLocalStorage } from '../utils/localStorage';
import CryptocurrencyTable from './CryptocurrencyTable';
import '../styles.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = getCryptocurrenciesFromLocalStorage();
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <h2>Favorites</h2>
      <CryptocurrencyTable cryptocurrencies={favorites} />
    </div>
  );
};

export default Favorites;
