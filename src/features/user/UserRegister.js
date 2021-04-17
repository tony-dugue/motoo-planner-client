import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {useDispatch} from "react-redux";
import { toast } from 'react-toastify';

import { getLoading, getFailure} from 'features/user/userSlice';
import { userRegistration } from 'api/userApi';

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

        if (!emailValidator.test(email))
            toast.warning("Votre email n'est pas au bon format")
        else if (password !== passwordConfirm)
            toast.warning("Les mots de passe ne sont pas identique !")
        else if (!passwordValidator.test(password))
            toast.warning("Le mot de passe ne respecte pas les règles (doit contenir un minimum de 8 caractères et contenir au" +
            " moins 1 chiffre, 1 lettre majuscule et 1 lettre minuscule")
        else {
            dispatch(getLoading())

            try {
                const avatar = `https://eu.ui-avatars.com/api/?name=${firstName}+${lastName}`;
                const roles = ["ROLE_USER"];
                const newUser = { firstName, lastName, email, password, avatar, roles };

                const registration = await userRegistration(newUser);

                if (registration.status !== 200) dispatch(getFailure(registration.message))

                toast.success("Votre compte a été crée")
                history.push('/presentation');

            } catch (error) {
                dispatch(getFailure(error))
                toast.warning("une erreur s'est produite ! Veuillez vérifier les champs")
            }
        }
    }

    return (
        <div className="content__form">
            <form onSubmit={handleSubmit} className="form-wrapper">

                <div className="form-wrapper__bloc">
                    <label htmlFor="firstnameInput" className="form-label">Votre prénom</label>
                    <input type="text" className="form-control" id="firstnameInput" name="firstName"
                           value={firstName} onChange={handleChange} required />
                </div>

                <div className="form-wrapper__bloc">
                    <label htmlFor="lastnameInput" className="form-label">Votre nom</label>
                    <input type="text" className="form-control" id="lastnameInput" name="lastName"
                           value={lastName} onChange={handleChange} required />
                </div>

                <div className="form-wrapper__bloc">
                    <label htmlFor="emailInput" className="form-label">Votre email</label>
                    <input type="email" className="form-control" id="emailInput" name="email"
                           value={email} onChange={handleChange} required />
                </div>

                <div className="form-wrapper__bloc">
                    <label htmlFor="passwordInput" className="form-label">Votre mot de passe</label>
                    <input type="password" className="form-control" id="passwordInput" name="password"
                           value={password} onChange={handleChange} minLength="8" required />
                </div>

                <div className="form-wrapper__bloc">
                    <label htmlFor="passwordVerifyInput" className="form-label">Répéter le mot de passe</label>
                    <input type="password" className="form-control" id="passwordVerifyInput" name="passwordConfirm"
                           value={passwordConfirm} onChange={handleChange} minLength="8" required />
                </div>

                <button type="submit" className="btn btn-motoo-outline">S'inscrire</button>

            </form>

            <div id="passwordHelpBlock" className="form-text">
                Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule et 1 chiffre.
                Seulement des lettres et chiffres (pas de caractères spéciaux, espaces ou émoji)
            </div>

        </div>
    );
}

