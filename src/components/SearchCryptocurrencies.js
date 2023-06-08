import React, { useState } from 'react';
import axios from 'axios';
import CryptocurrencyTable from './CryptocurrencyTable';

const SearchCryptocurrencies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${searchQuery}`);
      setSearchResults(response.data.coins);
    } catch (error) {
      console.error('Error searching cryptocurrencies:', error);
    }
  };

  return (
    <div>
      <h2>Search Cryptocurrencies</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter a cryptocurrency name"
      />
      <button onClick={handleSearch}>Search</button>
      <CryptocurrencyTable cryptocurrencies={searchResults} />
    </div>
  );
};

export default SearchCryptocurrencies;
