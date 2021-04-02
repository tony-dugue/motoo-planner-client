import React from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { userLogout, selectUser } from 'features/user/userSlice';
import {toast} from "react-toastify";

export function NavigationPrivate() {

    const dispatch = useDispatch();
    const history = useHistory();

    const { userProfile } = useSelector(selectUser); // on récupère le state

    const handleLogout = () => {
        dispatch(userLogout()) // on se déconnecte
        toast.info("A bientôt !")
        history.push('/');
    }

    return (
        <header className="header">

            <nav className="navigation">

                <div className="navigation__brand">

                    <div className="navigation__brand-logo">
                        <NavLink exact to='/'>
                            <img src='/logo-light.png' alt="logo Motoo Planner"/>
                        </NavLink>
                    </div>

                    {/* lien avatar en mode mobile */}

                    <Link to='#' className="navigation__link-auth--mobile dropdown-toggle" id="dropdownProfileMobile"
                          data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={userProfile.avatar} alt="avatar" className="navigation__avatar rounded-circle"/>
                    </Link>

                    {/* menu déroulant en mode mobile du bouton avatar */}

                    <ul className="dropdown-menu" aria-labelledby="dropdownProfileMobile">
                        <li><Link className="dropdown-item" to='/profile'>Mon profil</Link></li>

                        <li><hr className="dropdown-divider"/></li>
                        <li onClick={handleLogout} className="dropdown-item">Se déconnecter</li>
                    </ul>

                </div>

                <div className="navigation__link">

                    <ul className="navigation__link-items">
                        <li><NavLink to='/' className="navigation__link-item">Accueil</NavLink></li>
                        <li><NavLink to='/articles' className="navigation__link-item">Articles</NavLink></li>
                        <li><NavLink to='/dashboard' className="navigation__link-item color">Dashboard</NavLink></li>
                        <li><NavLink to='/contact' className="navigation__link-item">Contact</NavLink></li>
                    </ul>

                    {/* lien avatar en mode normale */}

                    <Link to='#' className="navigation__link-auth dropdown-toggle" id="dropdownProfile"
                          data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={userProfile.avatar} alt="avatar" className="navigation__avatar rounded-circle"/>
                    </Link>

                    {/* menu déroulant en mode normale du bouton avatar */}

                    <ul className="dropdown-menu" aria-labelledby="dropdownProfile">
                        <li><Link className="dropdown-item" to='/profile'>Mon profil</Link></li>

                        <li><hr className="dropdown-divider"/></li>
                        <li onClick={handleLogout} className="dropdown-item">Se déconnecter</li>
                    </ul>

                </div>

            </nav>
        </header>


    );
}
