import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectSteps, selectRoadbook} from 'features/roadbook/roadbookSlice';
import {getTypes, getLoading, getFailure} from 'features/itinerary/itinerarySlice';
import {findTypes} from 'api/itineraryApi';
import {ItinerarySeparatorItem} from 'features/itinerary/ItinerarySeparatorItem';
import {ItineraryStepItem} from 'features/itinerary/ItineraryStepItem';
import {Map} from 'components/map/Map';


export function ItineraryPlannerScene() {

    const dispatch = useDispatch()
    const stepsTodo = useSelector(selectSteps);
    const roadbook = useSelector(selectRoadbook);

    // url pour voir le roadbook en cours complet lors du retour en arrière
    const roadbookActiveUrl = "/roadbook/" + roadbook.roadbook.id;

    const itineraries = stepsTodo.map((item, index) => (
        <React.Fragment key={item.id}>
            {(index !== 0) && <ItinerarySeparatorItem distance={Math.floor(Math.random() * 200) + 1}/>}
            <ItineraryStepItem type={item.type.slug} title={item.title} icon={item.type.icon}  stepId={item.id} />
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
