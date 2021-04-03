import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findAllArticles, selectArticle } from 'features/article/articleSlice';
import { ArticleCard } from 'components/cards/ArticleCard';

export function ArticleShowAll() {

    const dispatch = useDispatch()
    const { articles, loading, error } = useSelector(selectArticle); // on récupère le state

    useEffect(() => {
        dispatch(findAllArticles()) // requête à l'API pour récupérer tous les articles
    }, [dispatch])

    if (loading) return <div className="container">Chargement en cours ...</div>
    if (error) return <div className="container">Une erreur s'est produite ...</div>

    let items = articles.map(article => (
        <ArticleCard key={article.id} articleItem={article} />
    ))

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="row">
                            <div className="col-sm-12">
                                {items}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

