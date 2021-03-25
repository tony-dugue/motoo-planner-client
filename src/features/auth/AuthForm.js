import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { setToken } from 'features/auth/AuthSlice';

export function AuthForm() {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(setToken(email, password));  // requête à l'API pour récupérer un token
    }

    //<Redirect push to="/Dashboard" />

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form-wrapper">
                <label>
                    <p>Votre email</p>
                    <input type="text" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <p>Votre mot de passe</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Se connecter</button>
                </div>
            </form>
        </div>
    );
}
