import React from 'react';
import { ArticleShow } from 'features/article/ArticleShow';
import {Link} from "react-router-dom";

export function ArticleSingleScene() {
    return (

        <div className="content">
            <div className="article">

                <Link to='/articles' className="article__back btn btn-motoo-outline-blue">Revenir aux articles</Link>

                <ArticleShow />

            </div>
        </div>
    );
}
