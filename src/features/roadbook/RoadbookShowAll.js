import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { findUser, selectUser } from 'features/user/userSlice';

export function RoadbookShowAll() {

    const dispatch = useDispatch()
    const { userProfil, loading, error } = useSelector(selectUser); // on récupère le state

    const id = sessionStorage.getItem('id')
    const token = sessionStorage.getItem('token')

    useEffect(() => {
        dispatch(findUser(id, token)) // requête à l'API pour récupérer un user
    }, [dispatch])

    if (loading) return <div className="container">Chargement en cours ...</div>
    if (error) return <div className="container">Une erreur s'est produite ...</div>

    return (
        <div>
            <p>Bonjour {userProfil.firstName + ' ' + userProfil.lastName}</p>

            <h2>Mes roadbooks en cours</h2>
            {/* if(roadbook.status === 1) .... */}

            <h2>Mes roadbooks terminés</h2>

            {/*userProfil.roadbooks?.map( roadbook => (
                <p>{roadbook.title}</p>
            ))*/}

            {/* if(roadbook.status === 2) .... */}

        </div>
    );
}
