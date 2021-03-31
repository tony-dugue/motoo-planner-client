import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findSingleRoadbook, selectRoadbook } from 'features/roadbook/roadbookSlice';
import { Link, useLocation } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import { RoadbookDeleteModal } from 'features/roadbook/RoadbookDeleteModal';

export function RoadbookShow() {

    const dispatch = useDispatch()
    const location = useLocation()

    const { roadbook, loading, error } = useSelector(selectRoadbook); // on récupère le state

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
        <React.Fragment>
            <div className="container">

                <Link to='/dashboard' className="btn btn-secondary my-2 mx-2">Revenir au tableau de bord</Link>

                <h2>{roadbook.title}</h2>

                <p>Roadbook terminé ? </p>
                {/* TODO : mettre un champ toggle */}


                <button className="btn btn-danger mx-2 px-3" data-bs-toggle="modal" data-bs-target="#deleteRoadbook">
                    <span><FontAwesomeIcon icon={faPencilAlt} /></span>Supprimer le roadbook
                    {/* TODO : voir pour rafraichissement des roadbooks du dashboard après redirection lors suppression */}
                </button>

                <RoadbookDeleteModal roadbookId={roadbook.id} />

                {/* ========== carte + résumé distance et informations de la balade ============ */}

                <div className="mapVisualization">
                    {/* map */}
                    <p>{roadbook.description}</p>
                    {/* distance totale */}
                    {/* adresse de départ */}
                    {/* date de la balade */}
                </div>

                {/* ========== résumé de l'itinéraire ============ */}

                <div className="itineraire">
                    <h3>Itinéraire</h3>
                    {/* étapes de la balade avec icones */}
                </div>

                {/* ========== informations pratiques (contact et todolist ============ */}

                <div className="informations">
                    <h3>Informations pratiques sur la balade</h3>
                    {/* contact du road captain */}
                    {/* todolist */}
                </div>

            </div>
        </React.Fragment>
    );
}


