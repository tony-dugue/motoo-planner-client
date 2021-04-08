import React from 'react';
import {Link} from "react-router-dom";
import {RoadbookCreate} from "../../features/roadbook/RoadbookCreate";

export function RoadbookCreateScene() {
    return (
        <div className="roadbooks">

            <div className="container">
                <Link to='/dashboard' className="btn btn-motoo-outline-blue">Revenir au tableau de bord</Link>
                <h2 className="roadbooks__heading">Créer un nouveau roadbook</h2>
            </div>

            <RoadbookCreate/>

        </div>
    );
}
