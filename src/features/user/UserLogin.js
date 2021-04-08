import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";

import { setUserLogin, setUserToken, getLoading, getFailure} from 'features/user/userSlice';
import { userLogin, findUser } from 'api/userApi';


export function UserLogin() {

    const dispatch = useDispatch()
    const history = useHistory();

    const [formData, setFormData] = useState({username: "", password: ""});

    const { username, password } = formData;

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async e => {
        e.preventDefault();

        if (!username || !password) toast.warning('Veuillez remplir tout les champs!')

        dispatch(getLoading())
        try {
            const isAuth = await userLogin(formData)
            if (isAuth.status !== 200) dispatch(getFailure(isAuth.message))

            dispatch(setUserToken(isAuth.data.token))
            dispatch(setUserLogin(jwt_decode(isAuth.data.token)))

            const user = await findUser()
            if (user.status !== 200) dispatch(getFailure(user.message))

            toast.success('Bienvenue')
            history.push('/dashboard');

        } catch (error) {
            dispatch(getFailure(error))
            toast.warning("une erreur s'est produite ! Veuillez vérifier votre email et ressaisir votre mot de" +
                " passe")
        }
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

        </div>
    );
}

