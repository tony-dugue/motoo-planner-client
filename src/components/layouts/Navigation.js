import React from 'react';
import { NavLink } from 'react-router-dom';

export function Navigation() {
    return (
        <div className="container">
            <NavLink exact to='/' className="">Accueil</NavLink>
            <NavLink to='/articles' className="">Articles</NavLink>
            <NavLink to='/contact' className="">Nous contacter</NavLink>
            <NavLink to='/login' className="btn btn-info my-2 mx-2">Se connecter</NavLink>
        </div>
    );
}
