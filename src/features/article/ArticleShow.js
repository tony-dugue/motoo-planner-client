import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticle, selectArticle } from 'features/article/ArticleSlice';
import { Link } from 'react-router-dom';

export function ArticleShow({ location }) {

    const dispatch = useDispatch()
    const { article, loading, error } = useSelector(selectArticle); // on récupère le state

    useEffect(() => {
        //récupération du pathname de l'url (ex /articles/xx)
        const urlPath = location.pathname.replace('article', 'articles')
        dispatch(fetchArticle(urlPath)) // requête à l'API pour récupérer un article
    }, [dispatch])

    if (loading) return <div className="container">Chargement en cours ...</div>
    if (error) return <div className="container">Une erreur s'est produite ...</div>
    if (!article.title) return (
        <div className="container">
            <p>Cet article n'existe pas ...</p>
            <Link to='/articles' className="btn btn-secondary my-2 mx-2">Voir tous les articles</Link>
        </div>
    )

    return (
        <React.Fragment>
            <div className="container">
                <h2>{article.title}</h2>
                <img src={article.picture} alt=""/>
                <p>{article.createdAt}</p>
                <p>{article.excerpt}</p>
                <p>{article.content}</p>
            </div>
        </React.Fragment>
    );
}
