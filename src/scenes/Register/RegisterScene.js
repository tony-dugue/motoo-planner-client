import React from 'react';
import { Link } from "react-router-dom";
import { UserRegister } from 'features/user/UserRegister';
import './RegisterScene.scss';

export function RegisterScene() {
    return (
        <div className="container">

            <h2>Créer un compte</h2>

            <UserRegister />

            <p>Vous avez déjà un compte? <Link to='/login'>Se connecter</Link></p>

        </div>
    );
}
