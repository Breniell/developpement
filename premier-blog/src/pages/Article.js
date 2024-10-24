import React from 'react';
import { useParams } from "react-router-dom";
import articles from './ArticleContent';
import NotFoundPage from "./NotFoundPage";
import './Article.css';

function Article() {
    const { articleId } = useParams();
    const article = articles.find(article => article.name === articleId);

    if (!article) {
        return <NotFoundPage />;
    }

    return (
        <div className="article-container">
            <h1>{article.title}</h1>
            {article.content.map((content, index) => (
                <p key={index}>{content}</p>
            ))}
        </div>
    );
}

export default Article;
