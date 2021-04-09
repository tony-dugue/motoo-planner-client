import React from 'react';
import {Link} from "react-router-dom";
import {ItinerarySeparatorItem} from 'features/itinerary/ItinerarySeparatorItem';
import {ItineraryStepItem} from 'features/itinerary/ItineraryStepItem';
import {Map} from 'components/map/Map';

import {faBed, faHome, faMapMarkerAlt, faMonument, faUtensils} from "@fortawesome/free-solid-svg-icons";

const stepData = [
    {id: 1, type: "", title: "Départ de la balade", icon: faHome},
    {id: 2, type: "location", title: "pause étang du canard", icon: faMapMarkerAlt},
    {id: 3, type: "restaurant", title: "Pause repas au restaurant du cap", icon: faUtensils},
    {id: 4, type: "visite", title: "Visite pointe du grouin", icon: faMonument},
    {id: 5, type: "hotel", title: "Hotel de la gare", icon: faBed},
    {id: 6, type: "", title: "fin de la balade", icon: faHome},
]

export function ItineraryPlannerScene() {

    const data = stepData.map((item, index) => (
        <React.Fragment key={item.id}>
            {(index !== 0) && <ItinerarySeparatorItem distance={Math.floor(Math.random() * 200) + 1}/>}
            <ItineraryStepItem type={item.type} title={item.title} icon={item.icon}/>
        </React.Fragment>
    ))

    return (
        <>
            <div className="itinerary-top">
                <Link to='/roadbook/2' className="btn btn-motoo-outline-blue">Revenir au roadbook</Link>
                <h2 className="itinerary__title">Roadbook : <span>xxx</span></h2>
            </div>

        <div className="itinerary-planner">

            <div className="itinerary-planner__desc">

                <div className="roadbook-show-itinerary">
                    <div className="itinerary__todo-container">
                        <ul className="itinerary__step">
                            {data}
                        </ul>

                    </div>
                </div>
            </div>

            <div className="itinerary-planner__map">
                    <Map/>
            </div>

        </div>
            </>
    );
}
