import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export function NavigationPublic() {

    return (
        <div className="container">

            <nav className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

                <NavLink
                    exact to='/'
                    className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    Logo
                </NavLink>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">

                    <li><NavLink to='/' className="nav-link px-2 link-secondary">Accueil</NavLink></li>
                    <li><NavLink to='/articles' className="nav-link px-2 link-dark">Articles</NavLink></li>
                    <li><NavLink to='/contact' className="nav-link px-2 link-dark">Nous contacter</NavLink></li>
                </ul>

                <div className="col-md-3 text-end">
                    <Link to='/login' className="btn btn-outline-info me-2">Se connecter</Link>
                </div>
            </nav>
        </div>
    );
}
