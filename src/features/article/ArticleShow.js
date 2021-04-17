import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import {selectArticle, getSingleArticle, getLoading, getFailure} from 'features/article/articleSlice';
import {findSingleArticle} from 'api/articleApi';
import placeholder from "../../assets/images/placeholder.png";

import moment from 'moment';
import localization from 'moment/locale/fr';
import {toast} from "react-toastify";

export function ArticleShow() {

    const dispatch = useDispatch()
    const location = useLocation()

    const {article, loading, error} = useSelector(selectArticle);

    //récupération du pathname de l'url (ex /articles/xx)
    const urlPath = location.pathname.replace('article', 'articles')

    useEffect(() => {
        async function fetchData() {
            dispatch(getLoading())
            const result = await findSingleArticle(urlPath)
            dispatch(getSingleArticle(result))
        }
        try {
            fetchData();
        } catch (error) {
            dispatch(getFailure(error))
            toast.warning("une erreur s'est produite !")
        }
    }, [dispatch, urlPath])

    if (loading) return <div className="container">Chargement en cours ...</div>
    if (error) return <div className="container">Une erreur s'est produite ...</div>
    if (!article.title) return (
        <div className="container">
            <p>Cet article n'existe pas ...</p>
            <Link to='/articles' className="btn btn-secondary my-2 mx-2">Voir tous les articles</Link>
        </div>
    )

    return (
        <div className="container">

            <h2 className="article__title">{article.title}</h2>

            <img src={placeholder} alt="placeholder" className="article__img"/>
            {/*<img src={article.picture} alt=""/>*/}

            <p className="article__date">Publié
                le {moment(article.createdAt).locale('fr', localization).format("Do MMM YY")}</p>

            <p className="article__date">{article.excerpt}</p>

            <p className="article__content">{article.content}</p>
        </div>
    );
}

