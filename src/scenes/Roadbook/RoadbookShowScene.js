import React from 'react';
import {Link} from "react-router-dom";
import {RoadbookShow} from "../../features/roadbook/RoadbookShow";

export function RoadbookShowScene() {
    return (
        <div className="content">

            <div className="roadbooks">

                <Link to='/dashboard' className="roadbooks__back btn btn-motoo-outline-blue">Revenir au tableau de bord</Link>

                <RoadbookShow/>
            </div>

        </div>
    );
}
