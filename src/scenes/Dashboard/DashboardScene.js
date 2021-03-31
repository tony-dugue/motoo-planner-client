import React from 'react';
import {useSelector} from "react-redux";
import { RoadbookShowAll } from 'features/roadbook/RoadbookShowAll';
import { selectUser } from 'features/user/userSlice';
import {Link} from "react-router-dom";

export function DashboardScene() {

    const { userProfile } = useSelector(selectUser); // on récupère le state

    return (
        <div className="container">

            <p>Bonjour {userProfile?.firstName + ' ' + userProfile?.lastName}</p>

            <Link to='/roadbook/new' className="btn btn-primary mx-2 px-3">Créer un nouveau roadbook</Link>

            <RoadbookShowAll />

        </div>
    );
}

