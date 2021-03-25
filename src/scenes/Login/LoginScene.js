import React from 'react';
import './LoginScene.scss';
import { AuthForm } from 'features/auth/AuthForm';

export function LoginScene() {
    return (
        <div className="container">

            <h2>Veuillez vous connecter</h2>

            <AuthForm />

        </div>
    );
}


