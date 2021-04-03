import React from 'react';
import { ArticleShowAll } from 'features/article/ArticleShowAll';

export function ArticleScene() {
    return (

        <div className="content">

            <h2>Les derniers articles ...</h2>

            <ArticleShowAll />

        </div>
    );
}

