import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { findUser, selectUser } from 'features/user/userSlice';
import {RoadbookCard} from "../../components/cards/RoadbookCard";

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
            if (roadbook.status === 1) return (
                <div className="col-md-6 col-lg-4 col-xl-3" key={roadbook.id}>
                    <RoadbookCard roadbookItem={roadbook}/>
                </div>
            )
            else return null
        }) : null

    const roadbookFinishItems = (userProfile.roadbooks)
        ? userProfile.roadbooks.map(roadbook => {
            if (roadbook.status === 2) return (
                <div className="col-md-6 col-lg-4 col-xl-3" key={roadbook.id}>
                    <RoadbookCard roadbookItem={roadbook}/>
                </div>
            )
             else return null
        }) : null

    return (
        <>
        <section className="roadbook-gallery">

            <h2 className="roadbook-gallery__heading">Mes roadbooks en cours</h2>

            <div className="container">
                <div className="row">
                    {roadbookEnCoursItems}
                </div>
            </div>
        </section>

        <section className="roadbook-gallery">

            <h2 className="roadbook-gallery__heading">Mes roadbooks terminés</h2>

            <div className="container">
                <div className="row">
                    {roadbookFinishItems}
                </div>
            </div>
        </section>
        </>
    );
}
