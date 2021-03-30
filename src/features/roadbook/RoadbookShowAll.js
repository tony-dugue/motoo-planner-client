import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { findUser, selectUser } from 'features/user/userSlice';
import {RoadbookResumeCard} from "../../components/RoadbookResumeCard/RoadbookResumeCard";

export function RoadbookShowAll() {

    const dispatch = useDispatch()
    const { userProfil, loading, error } = useSelector(selectUser); // on récupère le state

    useEffect(() => {
        const id = sessionStorage.getItem('id')
        const token = sessionStorage.getItem('token')
        dispatch(findUser(id, token)) // requête à l'API pour récupérer un user
    }, [dispatch])

    if (loading) return <div className="container">Chargement en cours ...</div>
    if (error) return <div className="container">Une erreur s'est produite ...</div>

    const roadbookEnCoursItems = (userProfil.roadbooks)
        ? userProfil.roadbooks.map(roadbook => {
            if (roadbook.status === 2) return <RoadbookResumeCard key={roadbook.id} roadbookItem={roadbook} />
        }) : null

    const roadbookFinishItems = (userProfil.roadbooks)
        ? userProfil.roadbooks.map(roadbook => {
            if (roadbook.status === 1) return <RoadbookResumeCard key={roadbook.id} roadbookItem={roadbook} />
        }) : null

    return (
        <div>
            <p>Bonjour {userProfil?.firstName + ' ' + userProfil?.lastName}</p>

            <h2>Mes roadbooks en cours</h2>

            {roadbookEnCoursItems}

            <h2>Mes roadbooks terminés</h2>

            {roadbookFinishItems}

        </div>
    );
}
