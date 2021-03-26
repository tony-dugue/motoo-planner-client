import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './RegisterScene.scss';
import axios from "axios";

export function RegisterScene() {

    const [formData, setFormData] = useState({firstName: "", lastName: "", email: "", password: "", passwordConfirm: ""});

    const { firstName, lastName, email, password, passwordConfirm } = formData;

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async e => {
        e.preventDefault();

        if(password !== passwordConfirm) {
            console.log("Les mots de passe ne sont pas identique !!")  // TODO ajouter un affichage en alerte !!
        } else {
            const newUser = { firstName, lastName, email, password };

            try {
                const config = { headers: { "Content-Type": "application/json"} };
                const body = JSON.stringify(newUser);
                const res = await axios.post('http://127.0.0.1:8000/api/users', body, config)
                console.log(res.data)
                (<Redirect push to="/login" />)  // TODO ajouter un affichage en alerte de réussite !!
            } catch (err) {
                console.error(err.response.data);
                // TODO afficher un message d'erreur en alert
            }
        };
    }

    return (
        <div className="container">

            <h2>Créer un compte</h2>

            <form onSubmit={handleSubmit} className="form-wrapper">
                <label>
                    <p>Votre prénom</p>
                    <input type="text" name="firstName" value={firstName} onChange={handleChange}
                           placeholder="Votre prénom" required />
                </label>

                <label>
                    <p>Votre nom</p>
                    <input type="text" name="lastName" value={lastName} onChange={handleChange}
                           placeholder="Votre nom" required />
                </label>
                <label>
                    <p>Votre email</p>
                    <input type="text" name="email" value={email} onChange={handleChange}
                           placeholder="Votre email" required />
                </label>
                <label>
                    <p>Votre mot de passe</p>
                    <input type="password" name="password" value={password} onChange={handleChange}
                           placeholder="Créer un mot de passe" minLength="6" required />
                </label>
                <label>
                    <p>Répéter votre mot de passe</p>
                    <input type="password" name="passwordConfirm" value={passwordConfirm} onChange={handleChange}
                           placeholder="Répéter le mot de passe" minLength="6" required />
                </label>
                <div>
                    <button type="submit">Se connecter</button>
                </div>
            </form>

            <p>Vous avez déjà un compte? <Link to='/login'>Se connecter</Link></p>

        </div>
    );
}


