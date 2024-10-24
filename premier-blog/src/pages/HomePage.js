import React from 'react';
import ArticleList from '../components/ArticlesList';
import articles from './ArticleContent';
import './HomePage.css';

function HomePage() {
  return (
    <>
      <section className="hero">
        <h1>Welcome to My Futuristic Blog</h1>
        <p>Your go-to place for insightful articles on technology, lifestyle, and more!</p>
        <button className="cta-button">Explore Now</button>
      </section>

      <section className="recent-articles">
        <h2>Recent Articles</h2>
        <ArticleList articles={articles.slice(0, 3)} />
      </section>
    </>
  );
}

export default HomePage;
