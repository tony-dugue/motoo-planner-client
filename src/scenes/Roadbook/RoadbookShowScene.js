import React from 'react';
import {Link} from "react-router-dom";
import {RoadbookShow} from "../../features/roadbook/RoadbookShow";

export function RoadbookShowScene() {
    return (
        <div className="roadbooks">

            <div className="container">
                <Link to='/dashboard' className="btn btn-motoo-outline-blue">Revenir au tableau de bord</Link>
            </div>

            <RoadbookShow/>

        </div>
    );
}
