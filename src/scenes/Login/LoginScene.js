import React, { useState } from 'react';
import axios from 'axios';
import './LoginScene.scss';

async function loginUser(credentials) {

    return axios.post('http://127.0.0.1:8000/api/login_check', credentials)
        .then(res => res.data)
}

export function LoginScene({ setToken }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({ username, password });
        setToken(token);
    }

    return (
        <div className="container">

            <h2>Veuillez vous connecter</h2>

            <form onSubmit={handleSubmit} className="form-wrapper">
                <label>
                    <p>Votre email</p>
                    <input type="text" onChange={e => setUsername(e.target.value)} />
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


