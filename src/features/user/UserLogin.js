import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { userLogin } from 'features/user/userSlice';

export function UserLogin() {

    const dispatch = useDispatch()
    const history = useHistory();

    const [formData, setFormData] = useState({username: "", password: ""});

    const { username, password } = formData;

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(userLogin(formData)); // requête à l'API pour se connecter
        history.push('/dashboard');
    }

    return (
        <div className="content__form">
            <form onSubmit={handleSubmit} className="form-wrapper">

                <div className="form-wrapper__bloc">
                    <label htmlFor="emailInput" className="form-label">Votre email</label>
                    <input type="email" className="form-control" id="emailInput" name="username"
                           value={username} onChange={handleChange} required />
                </div>

                <div className="form-wrapper__bloc">
                    <label htmlFor="passwordInput" className="form-label">Votre mot de passe</label>
                    <input type="password" className="form-control" id="passwordInput" name="password"
                           value={password} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-motoo-outline">Se connecter</button>

            </form>

            <div id="passwordHelpBlock" className="form-text">
                Le mot de passe doit contenir au moins 8 caractères, contenir au moins 1 majuscule, 1 minuscule et 1 chiffre.
                Seulement des lettres et chiffres (pas de caractères spéciaux, espaces ou émoji)
            </div>

        </div>
    );
}

