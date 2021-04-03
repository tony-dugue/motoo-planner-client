import React from 'react';
import {Link} from "react-router-dom";
import {RoadbookCreate} from "../../features/roadbook/RoadbookCreate";

export function RoadbookCreateScene() {
    return (
        <div className="content">

            <div className="roadbooks">

                <Link to='/dashboard' className="roadbooks__back btn btn-motoo-outline-blue">Revenir au tableau de bord</Link>

                <h2>Créer un nouveau roadbook</h2>

                <RoadbookCreate/>
            </div>

        </div>
    );
}
