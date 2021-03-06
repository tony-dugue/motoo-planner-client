import React from 'react';
import {Link} from 'react-router-dom';
import placeholder from '../../assets/images/placeholder.png';

import moment from 'moment';
import localization from 'moment/locale/fr';
import {faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function ArticleCard({articleItem}) {

    const articleImg = articleItem.picture ? process.env.REACT_APP_PICTURES_URL + articleItem.picture : placeholder;

    return (
        <article className="card-article">
            <div className="row">
                <div className="col-sm-12 col-md-9">

                    <h3 className="card-article__title">
                        <Link to={'/article/' + articleItem.id}>{articleItem.title}</Link>
                    </h3>

                    <img src={articleImg} alt="placeholder" className="card-article__img" />

                    <p className="card-article__desc">{articleItem.excerpt}</p>

                    <p className="card-article__date">
                        <span><FontAwesomeIcon icon={faCalendarAlt} /></span>
                        Le {moment(articleItem.createdAt).locale('fr', localization).format("Do MMM YY")}
                    </p>

                </div>
                <div className="col-sm-12 col-md-3">
                    <p className="card-article__more">
                        <Link to={'/article/' + articleItem.id} className="btn btn-motoo-outline-dark">Voir l'article</Link>
                    </p>
                </div>
            </div>
        </article>
    );
}

