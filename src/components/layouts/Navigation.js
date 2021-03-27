import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { userLogout, selectUser } from 'features/user/userSlice';

export function Navigation() {

    const dispatch = useDispatch();
    const history = useHistory();

    const { token } = useSelector(selectUser); // on récupère le state

    const handleClick = () => {
        if(token) {
            dispatch(userLogout()) // on se déconnecte
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
                {token ? 'Se déconnecter' : 'Se connecter'}
            </button>
        </div>
    );
}
