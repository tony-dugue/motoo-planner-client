import React from 'react';
import {Link} from 'react-router-dom';
import './cards.scss';

export function ArticleCard({articleItem}) {

    return (
        <div>
            <h2>{articleItem.title}</h2>
            <p>{articleItem.createdAt}</p>
            <p>{articleItem.excerpt}</p>
            <Link to={'/article/' + articleItem.id} className="btn btn-secondary my-2 mx-2">Voir l'article</Link>
        </div>
    );
}

