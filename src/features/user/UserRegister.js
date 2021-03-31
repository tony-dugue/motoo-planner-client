import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {useDispatch} from "react-redux";
import { toast } from 'react-toastify';
import { userRegister } from 'features/user/userSlice';

const emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

// mot de passe: minimum de 8 caractères, contient au moins 1 un chiffre, 1 lettre minuscule, 1 lettre majuscule
//               et seulement des lettres et des chiffres

export function UserRegister() {

    const dispatch = useDispatch()
    const history = useHistory();

    const [formData, setFormData] = useState({firstName: "", lastName: "", email: "", password: "", passwordConfirm: ""});

    const { firstName, lastName, email, password, passwordConfirm } = formData;

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async e => {
        e.preventDefault();
        if(!emailValidator.test(email)) {
            toast.warning("Une erreur s'est produite !")
        } else if(password !== passwordConfirm) {
            toast.warning("Les mots de passe ne sont pas identique !")
        } else if (!passwordValidator.test(password)) {
            toast.warning("Le mot de passe ne respecte pas les règles (doit contenir un minimum de 8 caractères et contenir au" +
                " moins 1 chiffre, 1 lettre minusculet et 1 lettre minuscule")
        } else {
            const avatar = `https://eu.ui-avatars.com/api/?name=${firstName}+${lastName}`
            const newUser = { firstName, lastName, email, password, avatar };
            dispatch(userRegister(newUser)); // requête à l'API pour se connecter
            toast.success("Votre compte a été crée")
            history.push('/presentation');
        }
    }

    return (
        <div className="container">
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
                           placeholder="Créer un mot de passe" minLength="8" required />
                </label>
                <label>
                    <p>Répéter votre mot de passe</p>
                    <input type="password" name="passwordConfirm" value={passwordConfirm} onChange={handleChange}
                           placeholder="Répéter le mot de passe" minLength="8" required />
                </label>
                <div>
                    <button type="submit">S'inscrire</button>
                </div>
            </form>
        </div>
    );
}

