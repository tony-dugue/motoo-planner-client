import React from 'react';
import { Link } from "react-router-dom";
import { UserLogin } from 'features/user/UserLogin';

export function LoginScene() {
    return (
        <div className="content">

            <h2>Se connecter</h2>

            <UserLogin />

            <div className="content__info">
                <p>Vous n'avez pas encore de compte? <Link to='/register'><span>S'inscrire</span></Link></p>

                {/* TODO : mot de passe perdu ? ... (envoi d'un mail !!) */}
            </div>

        </div>
    );
}


