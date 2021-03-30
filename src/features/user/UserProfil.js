import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { findUser, selectUser } from 'features/user/userSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

export function UserProfil() {

    const dispatch = useDispatch()
    const { userProfil, loading, error } = useSelector(selectUser); // on récupère le state

    useEffect(() => {
        const id = sessionStorage.getItem('id')
        const token = sessionStorage.getItem('token')

        dispatch(findUser(id, token)) // requête à l'API pour récupérer un article
    }, [dispatch])

    if (loading) return <div className="container">Chargement en cours ...</div>
    if (error) return <div className="container">Une erreur s'est produite ...</div>

    return (
        <React.Fragment>
            <div className="container">

                <h2>Voir les informations</h2>

                <p>Prénom : {userProfil.firstName}<span><FontAwesomeIcon icon={faPencilAlt} /></span></p>
                <p>Nom : {userProfil.lastName}<span><FontAwesomeIcon icon={faPencilAlt} /></span></p>
                <p>Email : {userProfil.email}<span><FontAwesomeIcon icon={faPencilAlt} /></span></p>

                <h2>Modifier le mot de passe</h2>

                <p>Mettre un nouveau mot de passe</p>

                <h2>Supprimer un compte</h2>

                <p>Vous voulez supprimer votre compte :</p>
                <button className="btn btn-danger">Supprimer le profil</button>

            </div>
        </React.Fragment>
    );
}
