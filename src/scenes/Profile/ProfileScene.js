import React from 'react';
import {UserProfile} from 'features/user/UserProfile';
import {Link} from "react-router-dom";

export function ProfileScene() {
    return (
        <div className="profile">

            <Link to='/dashboard' className="profile__back btn btn-motoo-outline-blue">Revenir au tableau de bord</Link>

            <h2>Mon profil</h2>

            <UserProfile/>

        </div>
    );
}

