import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { userLogout, selectUser } from 'features/user/userSlice';

export function Navigation() {

    const dispatch = useDispatch();
    const history = useHistory();

    const tokenStorage = sessionStorage.getItem('token');
    const { token } = useSelector(selectUser); // on récupère le state

    const handleClick = () => {
        if(tokenStorage) {
            dispatch(userLogout()) // on se déconnecte
            history.push('/');
        } else {
            history.push('/login');
        }
    }

    return (
        <div className="container">
            <NavLink exact to='/' className="">Accueil</NavLink>
            <NavLink to='/articles' className="">Articles</NavLink>
            <NavLink to='/contact' className="">Nous contacter</NavLink>
            <button onClick={handleClick} className="btn btn-info my-2 mx-2">
                { (token || tokenStorage) ? 'Se déconnecter' : 'Se connecter'}
            </button>
        </div>
    );
}
