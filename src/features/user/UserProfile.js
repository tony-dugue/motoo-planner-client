import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { findUser, selectUser } from 'features/user/userSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { UserEditModal } from 'features/user/UserEditModal';
import { UserEditPasswordModal } from 'features/user/UserEditPasswordModal';
import { UserDeleteModal } from 'features/user/UserDeleteModal';

export function UserProfile() {

    const dispatch = useDispatch()
    const { userProfile, loading, error } = useSelector(selectUser); // on récupère le state

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

                <img src={userProfile.avatar} alt="mdo" width="60" height="60" className="rounded-circle"/>
                <p>{userProfile.firstName} {userProfile.lastName}</p>
                <p>{userProfile.email}</p>
                <p>**Inscrit depuis mars 2019**</p>

                <button className="btn btn-primary mx-2 px-3" data-bs-toggle="modal" data-bs-target="#editInfoProfile">
                    <span><FontAwesomeIcon icon={faPencilAlt} /></span>Modifier les informations
                </button>

                <UserEditModal />

                <button className="btn btn-dark mx-2 px-3" data-bs-toggle="modal" data-bs-target="#editPasswordProfile">
                    <span><FontAwesomeIcon icon={faPencilAlt} /></span>Modifier le mot de passe
                </button>

                <UserEditPasswordModal />

                <button className="btn btn-danger mx-2 px-3" data-bs-toggle="modal" data-bs-target="#deleteProfile">
                    <span><FontAwesomeIcon icon={faPencilAlt} /></span>Supprimer le profil
                </button>

                <UserDeleteModal />


            </div>
        </React.Fragment>
    );
}
