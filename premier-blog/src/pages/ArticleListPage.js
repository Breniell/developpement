import React, { useState } from 'react';
import ArticleList from '../components/ArticlesList';
import Pagination from '../components/Pagination';
import articles from './ArticleContent'

function ArticleListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <h1 className="article-list-header">Articles</h1>
      <ArticleList articles={currentArticles} />
      <Pagination
        articlesPerPage={articlesPerPage}
        totalArticles={articles.length}
        paginate={paginate}
      />
    </>
  );
}

export default ArticleListPage;
