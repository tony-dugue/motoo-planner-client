import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticle, selectArticle } from './ArticleSlice';
import { Link } from 'react-router-dom';

export function Article(props) {

    const dispatch = useDispatch()
    const { article, loading, error } = useSelector(selectArticle); // on récupère le state

    useEffect(() => {
        //récupération du pathname de l'url (ex /articles/xx)
        const urlPath = props.location.pathname.replace('article', 'articles')
        console.log(urlPath)
        dispatch(fetchArticle(urlPath))
    }, [dispatch])

    if (loading) return <div className="container">Chargement en cours ...</div>
    if (error) return <div className="container">Une erreur s'est produite ...</div>
    if (!article.slug) return (
        <div className="container">
            <p>Cet article n'existe pas ...</p>
            <Link to='/articles' className="btn btn-secondary my-2 mx-2">Voir tous les articles</Link>
        </div>
    )

    return (
        <React.Fragment>
            <div className="container">
                <h2>Titre de l'article</h2>
                <p>Description</p>
            </div>
        </React.Fragment>
    );
}

