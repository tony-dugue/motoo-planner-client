import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findSingleRoadbook, selectRoadbook } from 'features/roadbook/roadbookSlice';
import { Link, useLocation } from 'react-router-dom';

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
                <h2>{roadbook.title}</h2>
                <img src={roadbook.picture} alt=""/>
                <p>{roadbook.description}</p>
            </div>
        </React.Fragment>
    );
}


