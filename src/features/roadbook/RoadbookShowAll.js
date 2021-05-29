import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { selectUser, setUserProfile, getLoading, getFailure } from 'features/user/userSlice';
import { findUser } from 'api/userApi';
import {RoadbookCard} from "components/cards/RoadbookCard";
import {toast} from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export function RoadbookShowAll() {

    const dispatch = useDispatch()

    // récupération des données de l'utilisateur et de ses roadbooks dans le store
    const { userProfile, loading } = useSelector(selectUser);

    useEffect(() => {
        async function fetchData() {
            dispatch(getLoading())
            const user = await findUser()
            dispatch(setUserProfile(user))
        }

        try {
            fetchData();
        } catch (error) {
            dispatch(getFailure(error))
            toast.warning(<span><span class="toast-icon warning"><FontAwesomeIcon icon={faExclamationTriangle} /></span>Une erreur s'est produite !</span>)
        }
    }, [dispatch])

    if (loading) return <div className="container">Chargement en cours ...</div>

    // TODO : voir pour ajouter une logique si le token est périmé (chargement loading en cours à l'infini)

    const roadbookEnCoursItems = (userProfile.roadbooks)
        ? userProfile.roadbooks.map(roadbook => {
            if (roadbook.status === 1) return (
                <div className="col-md-6 col-lg-4" key={roadbook.id}>
                    <RoadbookCard roadbookItem={roadbook} status="inprogress" />
                </div>
            )
            else return null
        }) : null

    const roadbookFinishItems = (userProfile.roadbooks)
        ? userProfile.roadbooks.map(roadbook => {
            if (roadbook.status === 2) return (
                <div className="col-md-6 col-lg-4" key={roadbook.id}>
                    <RoadbookCard roadbookItem={roadbook} status="finish"/>
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
