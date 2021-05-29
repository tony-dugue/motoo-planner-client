import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectSteps, selectRoadbook} from 'features/roadbook/roadbookSlice';
import {getTypes, getLoading, getFailure} from 'features/itinerary/itinerarySlice';
import {findTypes} from 'api/itineraryApi';
import {ItinerarySeparatorItem} from 'features/itinerary/ItinerarySeparatorItem';
import {ItineraryStepItem} from 'features/itinerary/ItineraryStepItem';
import {Map} from 'components/map/Map';
import moment from "moment";


export function ItineraryPlannerScene() {

    const dispatch = useDispatch()
    const stepsTodo = useSelector(selectSteps);
    const roadbook = useSelector(selectRoadbook);

    // url pour voir le roadbook en cours complet lors du retour en arrière
    const roadbookActiveUrl = "/roadbook/" + roadbook.roadbook.id;

    // tri du tableau des étapes par date
    function custom_sort(a, b) {
        return new Date(a.stepDate).getTime() - new Date(b.stepDate).getTime()
    }
    // on récupère ici une copie d'un tableau [...stepsTodo] avant de faire le tri
    const stepsTodoSort = [...stepsTodo].sort(custom_sort);

    const itineraries = stepsTodoSort.map((item, index) => (
        <React.Fragment key={item.id}>

            {(index !== 0) && <ItinerarySeparatorItem diffTime={
                // calcul durée entre étape précédente et l'étape suivante
                moment(item.stepDate).diff(moment(stepsTodoSort[index - 1].stepDate), "hours")
            } />}

            <ItineraryStepItem type={item.type.slug}
                               title={item.title}
                               stepDate={item.stepDate}
                               icon={item.type.icon}
                               description={item.description}
                               stepId={item.id}
            />
        </React.Fragment>
    ))

    // TODO: ranger les étapes par date du plus récent au plus ancien
    // TODO: ouvrir le popup dans la carte lors du clic sur une étape à gauche

    useEffect(() => {
        async function fetchData() {
            dispatch(getLoading())
            const types = await findTypes()
            dispatch(getTypes(types))
        }

        try {
            fetchData();
        } catch (error) {
            dispatch(getFailure(error))
        }
    }, [dispatch])

    return (
        <>
            <div className="itinerary-top">
                <Link to={roadbookActiveUrl} className="btn btn-motoo-outline-blue">Revenir au roadbook</Link>
                <h2 className="itinerary__title">Roadbook : <span>{roadbook.roadbook.title}</span></h2>
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
