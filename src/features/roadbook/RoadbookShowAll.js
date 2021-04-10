import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { selectUser, setUserProfile, getLoading, getFailure } from 'features/user/userSlice';
import { findUser } from 'api/userApi';
import {RoadbookCard} from "../../components/cards/RoadbookCard";
import {toast} from "react-toastify";

export function RoadbookShowAll() {

    const dispatch = useDispatch()
    const { userProfile, loading } = useSelector(selectUser); // on récupère le state

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
            toast.warning("une erreur s'est produite !")
        }
    }, [dispatch])

    if (loading) return <div className="container">Chargement en cours ...</div>

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
