export const saveCryptocurrencyToFavorites = (cryptocurrency) => {
  const storedFavorites = getCryptocurrenciesFromLocalStorage();
  const updatedFavorites = [...storedFavorites, cryptocurrency];
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

export const removeCryptocurrencyFromFavorites = (cryptocurrency) => {
  const storedFavorites = getCryptocurrenciesFromLocalStorage();
  const updatedFavorites = storedFavorites.filter((fav) => fav.id !== cryptocurrency.id);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

export const getCryptocurrenciesFromLocalStorage = () => {
  const storedFavorites = localStorage.getItem('favorites');
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

export const updateFavorites = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};
