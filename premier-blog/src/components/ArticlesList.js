import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleList.css';

function ArticleList({ articles }) {
    return (
        <div className="article-list">
            {articles.map(article => (
                <Link key={article.name} className='article-list-item' to={`/articles/${article.name}`}>
                    <h3>{article.title}</h3>
                    <p>{article.content[0].substring(0, 150)}...</p>
                </Link>
            ))}
        </div>
    );
}

export default ArticleList;
