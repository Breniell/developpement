import React from 'react';
import './Pagination.css';

function Pagination({ articlesPerPage, totalArticles, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <ul>
        {pageNumbers.map(number => (
          <li key={number} onClick={() => paginate(number)}>
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
