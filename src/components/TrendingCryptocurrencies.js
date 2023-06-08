import React, { useState, useEffect } from 'react';
import '../styles.css';

const TrendingCryptocurrencies = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);

  useEffect(() => {
    const fetchCryptocurrencies = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
        const data = await response.json();
        setCryptocurrencies(data.coins);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCryptocurrencies();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h2>Trending Cryptocurrencies</h2>
      <ul>
        {cryptocurrencies.map((crypto) => (
          <li key={crypto.item.id}>
            <h3>{crypto.item.name}</h3>
            <p>Symbol: {crypto.item.symbol}</p>
            <p>Market Cap Rank: {crypto.item.market_cap_rank}</p>
            <p>Price: {crypto.item.current_price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingCryptocurrencies;
