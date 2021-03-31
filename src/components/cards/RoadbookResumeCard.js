import React from 'react';
import {Link} from "react-router-dom";

import moment from 'moment';
import localization from 'moment/locale/fr';

moment.locale('fr')

export function RoadbookResumeCard({roadbookItem}) {

    return (
        <div>
            <h5>{roadbookItem.title}</h5>
            <p>{roadbookItem.pictureUrl}</p>
            <p>{roadbookItem.description}</p>
            <p>{moment(roadbookItem.tripStart).locale('fr', localization).format('LL')}</p>

            <Link to={"/roadbook/" + roadbookItem.id}>Modifier le roadbook</Link>
        </div>
    );
}

