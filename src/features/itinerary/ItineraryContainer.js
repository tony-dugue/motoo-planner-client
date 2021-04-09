import React from 'react';
import {ItinerarySeparatorItem} from 'features/itinerary/ItinerarySeparatorItem';
import {ItineraryStepItem} from 'features/itinerary/ItineraryStepItem';

import {faBed, faHome, faMapMarkerAlt, faMonument, faUtensils} from "@fortawesome/free-solid-svg-icons";

const stepData = [
    {id: 1, type: "", title: "Départ de la balade", icon: faHome},
    {id: 2, type: "location", title: "pause étang du canard", icon: faMapMarkerAlt},
    {id: 3, type: "restaurant", title: "Pause repas au restaurant du cap", icon: faUtensils},
    {id: 4, type: "visite", title: "Visite pointe du grouin", icon: faMonument},
    {id: 5, type: "hotel", title: "Hotel de la gare", icon: faBed},
    {id: 6, type: "", title: "fin de la balade", icon: faHome},
]

export function ItineraryContainer() {

    const data = stepData.map( (item, index) => (
        <React.Fragment key= {item.id}>
            {(index !== 0) && <ItinerarySeparatorItem distance={Math.floor(Math.random() * 200) + 1} />}
            <ItineraryStepItem type={item.type} title={item.title} icon={item.icon}/>
        </React.Fragment>
    ))

  return (
   <div className="itinerary__todo-container">

       <ul className="itinerary__step">
           {data}
       </ul>

   </div>
  );
}
