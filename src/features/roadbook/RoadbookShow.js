import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import {selectRoadbook, selectSteps, getSingleRoadbook, getLoading, getSuccess, getFailure} from 'features/roadbook/roadbookSlice';
import {findSingleRoadbook} from 'api/roadbookApi';
import {ChecklistContainer} from "features/checklist/ChecklistContainer";
import {InformationContainer} from "features/information/InformationContainer";
import {RoadbookDeleteModal} from 'features/roadbook/RoadbookDeleteModal';
import {RoadbookStatusModal} from 'features/roadbook/RoadbookStatusModal';
import {ItinerarySeparatorItem} from 'features/itinerary/ItinerarySeparatorItem';
import {MapMini} from 'components/map/MapMini';

import moment from 'moment';
import localization from 'moment/locale/fr';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt, faMapMarkedAlt, faCalendarAlt, faMotorcycle, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

import {toast} from "react-toastify";

export function RoadbookShow() {

    const dispatch = useDispatch()
    const location = useLocation()

    // récupération des données dans le store
    const {roadbook, loading} = useSelector(selectRoadbook);
    const stepsTodo = useSelector(selectSteps);

    //récupération du pathname de l'url (ex /roadbooks/xx)
    const urlPath = location.pathname.replace('roadbook', 'roadbooks')

    useEffect(() => {
        async function fetchData() {
            dispatch(getLoading())
            const result = await findSingleRoadbook(urlPath)  // récupération depuis bdd avec requête API
            dispatch(getSingleRoadbook(result))        // récupération depuis le store
            dispatch(getSuccess())
        }
        try {
            fetchData();
        } catch (error) {
            dispatch(getFailure(error))
            toast.warning(<span><span class="toast-icon warning"><FontAwesomeIcon icon={faExclamationTriangle} /></span>Une erreur s'est produite !</span>)
        }
    }, [dispatch, urlPath])


    if (loading) return <div className="container">Chargement en cours ...</div>

    if (!roadbook.title) return (
        <div className="container">
            <p>Ce roadbook n'existe pas ...</p>
            <Link to='/dashboard' className="btn btn-secondary my-2 mx-2">Revenir au tableau de bord</Link>
        </div>
    )

    // tri du tableau des étapes par date
    function custom_sort(a, b) {
        return new Date(a.stepDate).getTime() - new Date(b.stepDate).getTime()
    }
    // on récupère ici une copie d'un tableau [...stepsTodo] avant de faire le tri
    const stepsTodoSort = [...stepsTodo].sort(custom_sort);

    const itineraries = stepsTodoSort.map( (item, index) => (
        <React.Fragment key= {item.id}>
            {(index !== 0) && <ItinerarySeparatorItem diffTime={
                // calcul durée entre étape précédente et l'étape suivante
                moment(item.stepDate).diff(moment(stepsTodoSort[index - 1].stepDate), "hours")
            } />}

            <li className="itinerary__step-item">
                <div className="itinerary__step-item-icon">
                    <span className={item.type.slug + "-icon"}><FontAwesomeIcon icon={item.type.icon} /></span>
                </div>

                <div className="itinerary__step-item-content">
                    <p className="itinerary__step-item-content-date">
                        Le {moment.utc(item.stepDate).locale('fr', localization).format("L à H:mm")}
                    </p>
                    {item.title}
                </div>
            </li>
        </React.Fragment>
    ))

    return (

        <div className="roadbook-show">
            <div className="container">

                <h2 className="roadbook-show__heading">Roadbook : <span>{roadbook.title}</span></h2>

                <section>
                    <div className="container">
                        <div className="roadbook-show-gestion">

                            <div>
                                <button className="btn btn-outline-danger" data-bs-toggle="modal"
                                        data-bs-target="#deleteRoadbook">
                                    <span><FontAwesomeIcon icon={faTrashAlt}/></span>Supprimer le roadbook
                                </button>

                                <RoadbookDeleteModal roadbookId={roadbook.id}/>
                            </div>

                            <RoadbookStatusModal roadbook={roadbook} />

                        </div>
                    </div>
                </section>

                {/* ========== carte + résumé distance et informations de la balade ============ */}

                <section>
                    <div className="container">
                        {roadbook.steps[0] && (
                            <div className="row roadbook-show-map">
                                <div className="col-md-8">
                                    <div className="roadbook-show-map__visualization">

                                        <MapMini />

                                        <p>{roadbook.description}</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="roadbook-show-map__resume">

                                        <p className="roadbook-show-map__resume-item">
                                            <span className="icon"><FontAwesomeIcon icon={faMapMarkedAlt}/></span>Départ de la balade:
                                        </p>

                                        <p className="address">{stepsTodoSort[0].description}</p>


                                        <p className="roadbook-show-map__resume-item">
                                            <span className="icon"><FontAwesomeIcon icon={faCalendarAlt}/></span>
                                            Le {moment(stepsTodoSort[0]?.stepDate).locale('fr', localization).format("L à H:mm")}
                                        </p>

                                        {roadbook.steps[1] && (
                                            <p  className="roadbook-show-map__resume-item">
                                                <span className="icon"><FontAwesomeIcon icon={faMotorcycle}/></span>
                                                Durée estimée:
                                                <span className="time">{
                                                // calcul durée entre étape précédente et l'étape suivante
                                                moment(stepsTodoSort[stepsTodoSort.length -1].stepDate).diff(moment(stepsTodoSort[0].stepDate), "hours")
                                            } heures</span>
                                            </p>)
                                        }

                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </section>

                <section>
                    <div className="container">
                        <div className="row">

                            {/* ========== résumé de l'itinéraire ============ */}

                            <div className="col-md-6">
                                <div className="roadbook-show-itinerary">

                                    <h3 className="roadbook-show__heading-sub">Itinéraire</h3>

                                    <Link to={"/itinerary/" + roadbook.id}
                                          className="roadbook-show-itinerary__link btn btn-motoo-outline">Modifier
                                        l'itinéraire</Link>

                                    {/* étapes de la balade avec icones */}

                                    <ul className="itinerary__step">
                                        {itineraries}
                                    </ul>

                                </div>
                            </div>

                            <div className="col-md-6">

                                {/* ========== informations pratiques ============ */}

                                <div className="roadbook-show-informations">

                                    <h3 className="roadbook-show__heading-sub">Informations pratiques</h3>

                                    <p className="roadbook-show__heading-desc">Personnes à contacter et quelques informations
                                        pratiques</p>

                                    <InformationContainer/>

                                </div>

                                {/* ========== checklist ============ */}

                                <div className="roadbook-show-checklist">

                                    <h3 className="roadbook-show__heading-sub">CHECKLIST</h3>

                                    <p className="roadbook-show__heading-desc">Liste des choses à ne pas oublier pour la
                                        balade</p>

                                    <ChecklistContainer/>

                                    <p className="roadbook-show__heading-desc--info"> Cocher la case pour signaler une chose importante</p>


                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>

    );
}


