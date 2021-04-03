import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {findSingleRoadbook, selectRoadbook} from 'features/roadbook/roadbookSlice';
import {Link, useLocation} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";
import {faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import {faMotorcycle} from "@fortawesome/free-solid-svg-icons";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {faUtensils} from "@fortawesome/free-solid-svg-icons";
import {faLongArrowAltDown} from "@fortawesome/free-solid-svg-icons";
import {RoadbookDeleteModal} from 'features/roadbook/RoadbookDeleteModal';
import map from '../../images/map.jpeg';

export function RoadbookShow() {

    const dispatch = useDispatch()
    const location = useLocation()

    const {roadbook, loading, error} = useSelector(selectRoadbook); // on récupère le state

    useEffect(() => {

        //récupération du pathname de l'url (ex /roadbooks/xx)
        const urlPath = location.pathname.replace('roadbook', 'roadbooks')
        const token = sessionStorage.getItem('token')

        dispatch(findSingleRoadbook(urlPath, token)) // requête à l'API pour récupérer un roadbook
    }, [dispatch, location])

    if (loading) return <div className="container">Chargement en cours ...</div>
    if (error) return <div className="container">Une erreur s'est produite ...</div>
    if (!roadbook.title) return (
        <div className="container">
            <p>Ce roadbook n'existe pas ...</p>
            <Link to='/dashboard' className="btn btn-secondary my-2 mx-2">Revenir au tableau de bord</Link>
        </div>
    )

    return (
        <div className="content">
            <div className="roadbook-show">
                <div className="container">


                    <h2 className="roadbook-show__title">Roadbook : {roadbook.title}</h2>

                    <button className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteRoadbook">
                        <span><FontAwesomeIcon icon={faTrashAlt}/></span>Supprimer le roadbook
                        {/* TODO : voir pour rafraichissement des roadbooks du dashboard après redirection lors suppression */}
                    </button>

                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="roadbookCheck">Roadbook terminé ? </label>
                        <input className="form-check-input" type="checkbox" id="roadbookCheck"/>
                    </div>

                    <RoadbookDeleteModal roadbookId={roadbook.id}/>

                    {/* ========== carte + résumé distance et informations de la balade ============ */}

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="mapVisualization">
                                {/* map */}
                                <img src={map} alt="placeholder" className="card-article__img" />
                                <p>{roadbook.description}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="resume">
                                <p><span><FontAwesomeIcon icon={faMotorcycle}/></span>Distance totale: 230 km</p>
                                <p><span><FontAwesomeIcon icon={faMapMarkedAlt}/></span>Départ de la balade:</p>
                                <p>rue de la gare</p>
                                <p>35000 - Rennes</p>
                                <p><span><FontAwesomeIcon icon={faCalendarAlt}/></span>Le 21 aout 2020 à 09h00</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">

                        {/* ========== résumé de l'itinéraire ============ */}

                        <div className="col-sm-6">
                            <div className="itineraire">
                                <h3>Itinéraire</h3>

                                <div><FontAwesomeIcon icon={faHome}/>Lorem ipsum</div>
                                <div><FontAwesomeIcon icon={faLongArrowAltDown}/>45 km</div>
                                <div><FontAwesomeIcon icon={faMapMarkerAlt}/>Lorem ipsum</div>
                                <div><FontAwesomeIcon icon={faLongArrowAltDown}/>70 km</div>
                                <div><FontAwesomeIcon icon={faUtensils}/>Lorem ipsum</div>
                                <div><FontAwesomeIcon icon={faLongArrowAltDown}/>110 km</div>
                                <div><FontAwesomeIcon icon={faMapMarkerAlt}/>Lorem ipsum</div>
                                <div><FontAwesomeIcon icon={faLongArrowAltDown}/>45 km</div>
                                <div><FontAwesomeIcon icon={faHome}/>Lorem ipsum</div>








                                {/* étapes de la balade avec icones */}
                            </div>
                        </div>

                        {/* ========== informations pratiques (contact et todolist ============ */}

                            <div className="col-sm-6">
                                <div className="informations">
                                    <h3>Informations pratiques sur la balade</h3>
                                    <p>Nom du road Captain: </p>
                                    <p>Téléphone: 06 56 87 65 56</p>
                                    <p>description ....</p>

                                    <p>CHECKLIST</p>

                                    <p>- lorem fltotttglbr evszplvv</p>
                                    <p>- lorem fltotttglbr evszplvv</p>
                                    <p>- lorem fltotttglbr evszplvv</p>
                                    {/* todolist */}
                                </div>
                            </div>
                    </div>









                    </div>
                </div>
            </div>
            );
            }


