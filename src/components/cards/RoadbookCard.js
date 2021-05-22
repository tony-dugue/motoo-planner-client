import React from 'react';
import {Link} from "react-router-dom";
import {BikeAnimation} from 'components/animations/BikeAnimation';

import moment from 'moment';
import localization from 'moment/locale/fr';

moment.locale('fr')

export function RoadbookCard({roadbookItem, status}) {

    return (
        <article className="card-roadbook">

            <BikeAnimation status={status} />

            <h5 className="card-roadbook__title">{roadbookItem.title}</h5>
            <p className="card-roadbook__date">Balade du {moment(roadbookItem.tripStart).locale('fr', localization).format('LL')}</p>
            <p className="card-roadbook__desc">{roadbookItem.description}</p>

            <p className="card-roadbook__more">
                <Link to={"/roadbook/" + roadbookItem.id} className="btn btn-motoo-outline-dark">Modifier le roadbook</Link>
            </p>

        </article>
    );
}

