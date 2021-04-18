import React from 'react';
import {useSelector} from "react-redux";
import {selectSteps} from 'features/roadbook/roadbookSlice';
import {ItinerarySeparatorItem} from 'features/itinerary/ItinerarySeparatorItem';
import {ItineraryStepItem} from 'features/itinerary/ItineraryStepItem';
import moment from "moment";

export function ItineraryContainer() {

    const stepsTodo = useSelector(selectSteps);

    const itineraries = stepsTodo.map( (item, index) => (
        <React.Fragment key={item.id}>

            {(index !== 0) && <ItinerarySeparatorItem diffTime={
                // calcul durée entre étape précédente et l'étape suivante
                moment(item.stepDate).diff(moment(stepsTodo[index - 1].stepDate), "hours")
            } />}

            <ItineraryStepItem type={item.type.slug}
                               title={item.title}
                               stepDate={item.stepDate}
                               icon={item.type.icon}
                               description={item.description}
            />
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
