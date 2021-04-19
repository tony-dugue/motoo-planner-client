import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectArticle, getAllArticles, getLoading, getFailure} from 'features/article/articleSlice';
import {findAllArticles} from 'api/articleApi';
import {ArticleCard} from 'components/cards/ArticleCard';
import {toast} from "react-toastify";

export function ArticleShowAll() {

    const dispatch = useDispatch()
    const {articles, loading, error} = useSelector(selectArticle);

    useEffect(() => {
        async function fetchData() {
            dispatch(getLoading())
            const articles = await findAllArticles()
            dispatch(getAllArticles(articles))
        }
        try {
            fetchData();
        } catch (error) {
            dispatch(getFailure(error))
            toast.warning("une erreur s'est produite !")
        }
    }, [dispatch])

    if (loading) return <div className="container">Chargement en cours ...</div>
    if (error) return <div className="container">Une erreur s'est produite ...</div>

    let items = articles.map(article => (
        <ArticleCard key={article.id} articleItem={article}/>
    ))

    return (
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
    );
}

