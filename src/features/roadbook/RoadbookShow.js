import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import {findSingleRoadbook, selectRoadbook} from 'features/roadbook/roadbookSlice';
import {selectChecklistTodo} from 'features/checklist/checklistSlice';
import {roadbookChangeStatus} from "./roadbookSlice";
import {ChecklistAdd} from "../checklist/ChecklistAdd";
import {ChecklistItem} from "../checklist/ChecklistItem";
import {RoadbookDeleteModal} from 'features/roadbook/RoadbookDeleteModal';
import {Storage} from 'services/storage/storage';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPhoneAlt, faTrashAlt, faMapMarkedAlt, faCalendarAlt, faMotorcycle,
    faMapMarkerAlt, faUtensils, faMonument, faBed, faHome, faEnvelope
} from "@fortawesome/free-solid-svg-icons";

import map from '../../assets/images/map.jpeg';

export function RoadbookShow() {

    const dispatch = useDispatch()
    const location = useLocation()

    const {roadbook, loading, error} = useSelector(selectRoadbook);
    const checklistTodo = useSelector(selectChecklistTodo)

    //récupération du pathname de l'url (ex /roadbooks/xx) et du token
    const urlPath = location.pathname.replace('roadbook', 'roadbooks')
    const token = Storage.get('accessJWT')

    useEffect(() => {
        dispatch(findSingleRoadbook(urlPath, token)) // requête à l'API pour récupérer un roadbook
    }, [dispatch, location, urlPath, token])

    if (loading) return <div className="container">Chargement en cours ...</div>
    if (error) return <div className="container">Une erreur s'est produite ...</div>
    if (!roadbook.title) return (
        <div className="container">
            <p>Ce roadbook n'existe pas ...</p>
            <Link to='/dashboard' className="btn btn-secondary my-2 mx-2">Revenir au tableau de bord</Link>
        </div>
    )

    const handleChangeStatus = () => {
        const roadbookStatus = roadbook.status === 1 ? {'status': 2} : {'status': 1}
        return dispatch(roadbookChangeStatus(roadbookStatus, urlPath, token))
    }

    return (
        <div className="content">
            <div className="roadbook-show">
                <div className="container">

                    <h2 className="roadbook-show__heading">Roadbook : <span>{roadbook.title}</span></h2>

                    <section>
                        <div className="container">
                            <div className="row roadbook-show-gestion">

                                <div className="col-md-6">

                                    <button className="btn btn-outline-danger" data-bs-toggle="modal"
                                            data-bs-target="#deleteRoadbook">
                                        <span><FontAwesomeIcon icon={faTrashAlt}/></span>Supprimer le roadbook
                                        {/* TODO : voir pour rafraichissement des roadbooks du dashboard après redirection lors suppression */}
                                    </button>

                                    <RoadbookDeleteModal roadbookId={roadbook.id}/>

                                </div>

                                <div className="col-md-6 roadbook-show-gestion__check">
                                    <p>Roadbook terminé ?</p>
                                    <form>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="roadbookCheck"
                                                   onClick={handleChangeStatus}
                                                   defaultChecked={roadbook.status === 2 ? 'checked' : ''}/>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </section>

                    {/* ========== carte + résumé distance et informations de la balade ============ */}

                    <section>
                        <div className="container">
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

                                        <p>
                                            <span><FontAwesomeIcon icon={faMotorcycle}/></span>
                                            Distance totale: 230 km
                                        </p>

                                        <p className="roadbook-show-map__resume-item">
                                            <span><FontAwesomeIcon icon={faMapMarkedAlt}/></span>
                                            Départ de la balade:
                                        </p>

                                        <p className="address">rue de la gare</p>
                                        <p className="address">35000 - Rennes</p>

                                        <p className="roadbook-show-map__resume-item">
                                            <span><FontAwesomeIcon icon={faCalendarAlt}/></span>
                                            Le 21 aout 2020 à 09h00
                                        </p>
                                    </div>
                                </div>
                            </div>
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

                                        <div>
                                            <ul className="roadbook-show-itinerary__step">
                                                <li><span><FontAwesomeIcon icon={faHome}/></span>Départ de la balade</li>
                                                <li className="distance"><span className="distance-icon">|</span>45 km</li>
                                                <li><span className="location-icon"><FontAwesomeIcon
                                                    icon={faMapMarkerAlt}/></span>pause étang du canard
                                                </li>
                                                <li className="distance"><span className="distance-icon">|</span>70 km</li>
                                                <li><span className="restaurant-icon"><FontAwesomeIcon icon={faUtensils}/></span>Pause
                                                    repas au restaurant du cap
                                                </li>
                                                <li className="distance"><span className="distance-icon">|</span>110 km</li>
                                                <li><span className="visite-icon"><FontAwesomeIcon icon={faMonument}/></span>Visite
                                                    pointe du grouin
                                                </li>
                                                <li className="distance"><span className="distance-icon">|</span>45 km</li>
                                                <li><span className="hotel-icon"><FontAwesomeIcon icon={faBed}/></span>Hotel de la
                                                    gare
                                                </li>
                                                <li className="distance"><span className="distance-icon">|</span>62 km</li>
                                                <li><span><FontAwesomeIcon icon={faHome}/></span>Fin de la balade</li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>

                                {/* ========== informations pratiques (contact et todolist ============ */}

                                <div className="col-md-6">

                                    <div className="roadbook-show-informations">

                                        <h3 className="roadbook-show__heading-sub">Informations pratiques</h3>

                                        <Link to={"/informations/" + roadbook.id}
                                              className="roadbook-show-informations__link btn btn-motoo-outline">Modifier les
                                            informations</Link>

                                        <p className="roadbook-show-informations__item">Contact: Gérard Dupond</p>

                                        <p>
                                            <FontAwesomeIcon icon={faPhoneAlt}/> 06 56 87 65 56</p>

                                        <p>
                                            <FontAwesomeIcon icon={faEnvelope}/> gerard.dupond@gmail.com</p>

                                        <p className="roadbook-show-informations__item-desc">Un briefing sera effectué 15min avant
                                            le départ. </p>

                                    </div>

                                    <div className="roadbook-show-checklist">

                                        <h3 className="roadbook-show__heading-sub">CHECKLIST</h3>

                                        <p className="roadbook-show-checklist__desc">Liste des choses importantes ...</p>

                                        <div className="checklist__container">

                                            <div className="checklist__todo-container">
                                                {checklistTodo.map(item => (
                                                    <ChecklistItem key={item.id} task={item.task} checked={item.checked}
                                                                   id={item.id}/>
                                                ))}
                                            </div>

                                            <ChecklistAdd/>

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}


