import React, {useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {NavLink} from "react-router-dom";
import moment from 'moment';
import {toast} from "react-toastify";
import {useDispatch, useSelector} from 'react-redux';
import {selectArticle, getAllArticles, getLoading, getFailure} from 'features/article/articleSlice';
import {findAllArticles} from 'api/articleApi';

export function Footer() {

    const dispatch = useDispatch()

    const {articles} = useSelector(selectArticle);

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

    let showArticles = articles.map( (article, index) => {
        if (index < 3) {
            return <li className="footer-link__menu-item" key={article.id}>
                <NavLink to={"/article/" + article.id}>{article.title}</NavLink>
            </li>
        }
        return null;
    })

    return (
        <footer className="footer">
            <div className="footer__wrapper">

                <div className="footer-link">

                    <div className="footer-link__menu">
                        <p className="footer-link__menu-heading">Les derniers articles</p>
                        <ul>
                            { showArticles }
                        </ul>
                    </div>

                    <div className="footer-link__menu">
                        <p className="footer-link__menu-heading">L'application</p>
                        <ul>
                            <li className="footer-link__menu-item"><NavLink to='/presentation'>Présentation</NavLink></li>
                            <li className="footer-link__menu-item"><NavLink to='/other'>FAQ</NavLink></li>
                        </ul>
                    </div>

                    <div className="footer-link__menu">
                        <p className="footer-link__menu-heading">A propos</p>
                        <ul>
                            <li className="footer-link__menu-item"><NavLink to='/contact'>Nous contacter</NavLink></li>
                            <li className="footer-link__menu-item"><NavLink to='/mentions-legales'>Mentions légales</NavLink></li>
                        </ul>
                    </div>

                    <div className="footer-link__social">
                        <FontAwesomeIcon className="footer-link__social-item twitter" icon={faTwitter}/>
                        <FontAwesomeIcon className="footer-link__social-item facebook" icon={faFacebook}/>
                    </div>

                </div>

                <div className="footer-logo">
                    <NavLink exact to='/'><img src='/logo-light.png' alt="logo Motoo Planner"/></NavLink>
                </div>

                <div className="footer-copyright">
                    <p className="footer-copyright__content">© {moment().format('YYYY')} Motoo Planner. Tous droits réservés.</p>
                </div>

            </div>
        </footer>
    );
}
