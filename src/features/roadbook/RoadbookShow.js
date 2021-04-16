import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import {selectRoadbook, getSingleRoadbook, getLoading, getSuccess, getFailure} from 'features/roadbook/roadbookSlice';
import {findSingleRoadbook} from 'api/roadbookApi';
import {ChecklistContainer} from "features/checklist/ChecklistContainer";
import {InformationContainer} from "features/information/InformationContainer";
import {RoadbookDeleteModal} from 'features/roadbook/RoadbookDeleteModal';
import {RoadbookStatusModal} from 'features/roadbook/RoadbookStatusModal';
import {selectSteps} from 'features/roadbook/roadbookSlice';
import {ItinerarySeparatorItem} from 'features/itinerary/ItinerarySeparatorItem';

import moment from 'moment';
import localization from 'moment/locale/fr';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTrashAlt, faMapMarkedAlt, faCalendarAlt, faMotorcycle
} from "@fortawesome/free-solid-svg-icons";

import map from '../../assets/images/map.jpeg';
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
            toast.warning("une erreur s'est produite !")
        }
    }, [dispatch, urlPath])


    if (loading) return <div className="container">Chargement en cours ...</div>

    if (!roadbook.title) return (
        <div className="container">
            <p>Ce roadbook n'existe pas ...</p>
            <Link to='/dashboard' className="btn btn-secondary my-2 mx-2">Revenir au tableau de bord</Link>
        </div>
    )

    const itineraries = stepsTodo.map( (item, index) => (
        <React.Fragment key= {item.id}>
            {(index !== 0) && <ItinerarySeparatorItem distance={Math.floor(Math.random() * 200) + 1} />}
            <li>
                <span className={item.type.slug + "-icon"}><FontAwesomeIcon icon={item.type.icon} /></span>
                {item.title}
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

                            <div className="roadbook-show-gestion__check">
                                <p>Roadbook terminé ?</p>

                                <RoadbookStatusModal roadbook={roadbook}/>

                            </div>

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
                                        {/* map */}
                                        <img src={map} alt="placeholder" className="card-article__img"/>
                                        <p>{roadbook.description}</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="roadbook-show-map__resume">

                                        {roadbook.steps[1] && (
                                            <p>
                                            <span><FontAwesomeIcon icon={faMotorcycle}/></span>
                                            Distance estimée:
                                        </p>)
                                        }

                                        <p className="roadbook-show-map__resume-item">
                                            <span><FontAwesomeIcon icon={faMapMarkedAlt}/></span>
                                            Départ de la balade:
                                        </p>

                                        <p className="address">{roadbook.steps[0].description}</p>


                                        <p className="roadbook-show-map__resume-item">
                                            <span><FontAwesomeIcon icon={faCalendarAlt}/></span>
                                            Le {moment(roadbook.steps[0]?.stepDate).locale('fr', localization).format("L à H:mm")}
                                        </p>
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

                                    <p className="roadbook-show__heading-desc--info"> * Cocher la case pour une chose importante</p>


                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>

    );
}


