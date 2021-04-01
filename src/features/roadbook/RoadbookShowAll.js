import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { findUser, selectUser } from 'features/user/userSlice';
import {RoadbookResumeCard} from "../../components/cards/RoadbookResumeCard";

export function RoadbookShowAll() {

    const dispatch = useDispatch()
    const { userProfile, loading, error } = useSelector(selectUser); // on récupère le state

    useEffect(() => {

        const id = sessionStorage.getItem('id')
        const token = sessionStorage.getItem('token')

        if(!userProfile.id) {
            // si state vide (lors rafraichissement du navigateur par ex), on récupère à nouveau les données
            dispatch(findUser(id, token))
        }
    }, [dispatch, userProfile])

    if (loading) return <div className="container">Chargement en cours ...</div>
    if (error) return <div className="container">Une erreur s'est produite ...</div>

    // TODO : voir pour ajouter une logique si le token est périmé (chargement en cours à l'infini)

    const roadbookEnCoursItems = (userProfile.roadbooks)
        ? userProfile.roadbooks.map(roadbook => {
            if (roadbook.status === 1) return <RoadbookResumeCard key={roadbook.id} roadbookItem={roadbook} />
            else return null
        }) : null

    const roadbookFinishItems = (userProfile.roadbooks)
        ? userProfile.roadbooks.map(roadbook => {
            if (roadbook.status === 2) return <RoadbookResumeCard key={roadbook.id} roadbookItem={roadbook} />
            else return null
        }) : null

    return (
        <div>

            <h2>Mes roadbooks en cours</h2>

            {roadbookEnCoursItems}

            <h2>Mes roadbooks terminés</h2>

            {roadbookFinishItems}

        </div>
    );
}
