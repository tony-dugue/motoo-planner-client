import React from 'react';
import {useSelector} from "react-redux";
import {selectSteps} from 'features/roadbook/roadbookSlice';
import {ItinerarySeparatorItem} from 'features/itinerary/ItinerarySeparatorItem';
import {ItineraryStepItem} from 'features/itinerary/ItineraryStepItem';

export function ItineraryContainer() {

    const stepsTodo = useSelector(selectSteps);

    const itineraries = stepsTodo.map( (item, index) => (
        <React.Fragment key={item.id}>
            {(index !== 0) && <ItinerarySeparatorItem distance={Math.floor(Math.random() * 200) + 1} />}
            <ItineraryStepItem type={item.type.slug} title={item.title} icon={item.type.icon} />
        </React.Fragment>
    ))

  return (
   <div className="itinerary__todo-container">

       <ul className="itinerary__step">
           {itineraries}
       </ul>

   </div>
  );
}
