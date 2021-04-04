import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { findUser, selectUser } from 'features/user/userSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UserEditModal } from 'features/user/UserEditModal';
import { UserEditPasswordModal } from 'features/user/UserEditPasswordModal';
import { UserDeleteModal } from 'features/user/UserDeleteModal';

import moment from 'moment';
import localization from 'moment/locale/fr';

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
            <div className="content">
                <div className="profile-content">

                    {
                        userProfile.avatar
                        ? <img src={userProfile.avatar} alt="avatar" className="profile-content__img rounded-circle"/>
                        : null
                    }

                    <p className="profile-content__name">
                        Prénom et nom : <span>{userProfile.firstName} {userProfile.lastName}</span>
                    </p>

                    <p className="profile-content__email">Email : <span>{userProfile.email}</span></p>

                    <p className="profile-content__date">Inscrit {moment(userProfile.createdAt).locale('fr', localization).fromNow()}</p>

                    <button className="btn btn-motoo-outline-dark" data-bs-toggle="modal" data-bs-target="#editInfoProfile">
                        <span><FontAwesomeIcon icon={faPencilAlt} /></span>Modifier les informations
                    </button>

                    <UserEditModal />

                    <button className="btn btn-motoo-outline-dark" data-bs-toggle="modal" data-bs-target="#editPasswordProfile">
                        <span><FontAwesomeIcon icon={faPencilAlt} /></span>Modifier le mot de passe
                    </button>

                    <UserEditPasswordModal />

                    <div className="profile-content__delete-btn">

                    <button className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteProfile">
                        <span><FontAwesomeIcon icon={faTrashAlt} /></span>Supprimer le profil
                    </button>

                    <UserDeleteModal />

                    </div>
                </div>
            </div>
    );
}
