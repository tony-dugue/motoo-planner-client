import React from 'react';
import {useSelector} from "react-redux";
import { RoadbookShowAll } from 'features/roadbook/RoadbookShowAll';
import { selectUser } from 'features/user/userSlice';
import {Link} from "react-router-dom";

export function DashboardScene() {

    const { userProfile } = useSelector(selectUser); // on récupère le state

    return (
        <div className="content">

            <div className="roadbooks">

                <p className="roadbooks__welcome">Bonjour {userProfile?.firstName + ' ' + userProfile?.lastName}</p>

                <Link to='/roadbook/new' className="roadbooks__create btn btn-motoo-outline">Créer un nouveau roadbook</Link>

                <RoadbookShowAll />
            </div>

        </div>
    );
}

