import React from 'react';
import { useTable, usePagination } from 'react-table';
import styles from '../styles.css';
import toggleFavorite from './Home';

const CryptocurrencyTable = ({ cryptocurrencies }) => {
    // Inside CryptocurrencyTable component
    const columns = React.useMemo(
     () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Symbol', accessor: 'symbol' },
      { Header: 'Market Cap Rank', accessor: 'market_cap_rank' },
      { Header: 'Price', accessor: 'current_price' },
      {
        Header: 'Favorite',
        accessor: 'favorite',
        Cell: ({ row }) => (
          <button onClick={() => toggleFavorite(row)}>Toggle Favorite</button>
        ),
      },
    ],
    []
 );
  

  const data = React.useMemo(() => cryptocurrencies, [cryptocurrencies]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <div>
      <table className={styles.table} {...getTableProps()}>
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
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button className={styles.button} onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button className={styles.button} onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CryptocurrencyTable;
