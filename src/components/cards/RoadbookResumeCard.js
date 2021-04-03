import React from 'react';
import {Link} from "react-router-dom";

import moment from 'moment';
import localization from 'moment/locale/fr';
import placeholder from "../../images/placeholder.png";

moment.locale('fr')

export function RoadbookResumeCard({roadbookItem}) {

    return (
        <article className="card-roadbook">
            <img src={placeholder} alt="placeholder" className="card-roadbook__img" />
            <h5 className="card-roadbook__title">{roadbookItem.title}</h5>
            <p className="card-roadbook__date">Balade du {moment(roadbookItem.tripStart).locale('fr', localization).format('LL')}</p>
            <p className="card-roadbook__desc">{roadbookItem.description}</p>

            <p className="card-roadbook__more">
                <Link to={"/roadbook/" + roadbookItem.id} className="btn btn-motoo-dark">Modifier le roadbook</Link>
            </p>

        </article>
    );
}

