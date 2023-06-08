import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';
import { updateFavorites } from '../utils/localStorage';
import '../styles.css';

const Home = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);

  useEffect(() => {
    // Fetch trending cryptocurrencies from API and update state
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
  }, []);

  const addToFavorites = (cryptocurrency) => {
    // Mark the cryptocurrency as a favorite
    const updatedCryptocurrencies = cryptocurrencies.map((coin) =>
      coin.id === cryptocurrency.id ? { ...coin, favorite: !coin.favorite } : coin
    );

    setCryptocurrencies(updatedCryptocurrencies);
    // Update favorites in local storage
    updateFavorites(updatedCryptocurrencies);
  };

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ row }) => (
        <Link to={`/cryptocurrency/${row.original.id}`}>{row.original.name}</Link>
      ),
    },
    {
      Header: 'Symbol',
      accessor: 'symbol',
    },
    {
      Header: 'Market Cap Rank',
      accessor: 'market_cap_rank',
    },
    {
      Header: 'Price',
      accessor: 'current_price',
    },
    {
      Header: 'Favorite',
      accessor: 'favorite',
      Cell: ({ row }) => (
        <button onClick={() => addToFavorites(row.original)}>
          {row.original.favorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      ),
    },
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: cryptocurrencies });

  return (
    <div>
      <h1>Home</h1>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
