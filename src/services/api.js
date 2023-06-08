import axios from 'axios';

export const searchCryptocurrencies = async (query) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);
    return response.data.coins;
  } catch (error) {
    console.error('Error searching cryptocurrencies:', error);
    return [];
  }
};

export const fetchTrendingCryptocurrencies = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/search/trending');
    return response.data.coins;
  } catch (error) {
    console.error('Error fetching trending cryptocurrencies:', error);
    return [];
  }
};
