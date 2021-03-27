import React from 'react';
import { Link } from "react-router-dom";
import { UserLogin } from 'features/user/UserLogin';
import './LoginScene.scss';

export function LoginScene() {
    return (
        <div className="container">

            <h2>Veuillez vous connecter</h2>

            <UserLogin />

            <p>Vous n'avez pas de compte? <Link to='/register'>S'enregistrer</Link></p>

        </div>
    );
}


