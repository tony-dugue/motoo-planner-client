import React from 'react';
import { Link } from "react-router-dom";
import { UserRegister } from 'features/user/UserRegister';

export function RegisterScene() {
    return (
        <div className="content">

            <h2>Créer un compte</h2>

            <UserRegister />

            <div className="content__info">
                <p>Vous avez déjà un compte? <Link to='/login'><span>Se connecter</span></Link></p>
            </div>

        </div>
    );
}
