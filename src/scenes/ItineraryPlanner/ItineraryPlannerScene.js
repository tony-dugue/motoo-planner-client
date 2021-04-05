import React from 'react';
import {Link} from "react-router-dom";

export function ItineraryPlannerScene() {
    return (
        <div className="content">
            <div className="itinerary">
                <div className="container">

                    <Link to='/roadbook/2' className="btn btn-motoo-outline-blue">Revenir au roadbook</Link>

                    <h2>Je suis la page planification d'itineraire</h2>

                </div>
            </div>
        </div>
    );
}
