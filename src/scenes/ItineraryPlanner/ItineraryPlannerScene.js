import React from 'react';
import {Link} from "react-router-dom";
import {ItinerarySeparatorItem} from 'features/itinerary/ItinerarySeparatorItem';
import {ItineraryStepItem} from 'features/itinerary/ItineraryStepItem';
import {selectSteps} from 'features/roadbook/roadbookSlice';
import {Map} from 'components/map/Map';
import {useSelector} from "react-redux";


export function ItineraryPlannerScene() {

    const stepsTodo = useSelector(selectSteps)

    const itineraries = stepsTodo.map((item, index) => (
        <React.Fragment key={item.id}>
            {(index !== 0) && <ItinerarySeparatorItem distance={Math.floor(Math.random() * 200) + 1}/>}
            <ItineraryStepItem type={item.type.slug} title={item.title} icon={item.type.icon}/>
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
                                {itineraries}
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
