import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import {selectAuth, authPending, authSuccess, authFail} from 'features/auth/authSlice';
import { userLogin } from 'api/userApi';
import {getUserProfile} from "../auth/userAction";


export function UserLogin() {

    const dispatch = useDispatch()
    const history = useHistory();

    const { isAuth } = useSelector(selectAuth);

    const [formData, setFormData] = useState({username: "", password: ""});

    const { username, password } = formData;

    useEffect( () => {
        sessionStorage.getItem("accessJWT") && history.push("/dashboard")
    }, [history, isAuth])

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async e => {
        e.preventDefault();

        if (!username || !password) toast.warning('Veuillez remplir tout les champs!')

        dispatch(authPending())
        try {
            const isAuth = await userLogin(formData)

            if (isAuth.status !== 200) dispatch(authFail(isAuth.message))

            dispatch(authSuccess())
            dispatch(getUserProfile())

            toast.success('Bienvenue')
            history.push('/dashboard');

        } catch (error) {
            dispatch(authFail(error.message))
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

