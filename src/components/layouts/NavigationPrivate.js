import React from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { userLogout } from 'features/user/userSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { selectUser } from 'features/user/userSlice';
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
        <div className="container">

            <nav className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

                <NavLink
                    exact to='/'
                    className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <img src='/logo-light.png' alt="logo Motoo Planner"/>
                </NavLink>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">

                    <li>
                        <NavLink to='/' className="nav-link px-2 link-secondary">
                            <FontAwesomeIcon icon={faHome}/>Accueil
                        </NavLink>
                    </li>
                    <li><NavLink to='/articles' className="nav-link px-2 link-dark">Articles</NavLink></li>
                    <li><NavLink to='/dashboard' className="nav-link px-2 link-dark">Dashboard</NavLink></li>
                    <li><NavLink to='/contact' className="nav-link px-2 link-dark">Nous contacter</NavLink></li>
                </ul>

                <div className="dropdown text-end">

                    <Link to='#' className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={userProfile.avatar} alt="mdo" width="32" height="32" className="rounded-circle"/>
                    </Link>

                    <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                        <li><Link className="dropdown-item" to='/profile'>Mon profil</Link></li>

                        <li><hr className="dropdown-divider"/></li>
                        <li onClick={handleLogout} className="dropdown-item">Se déconnecter</li>
                    </ul>

                </div>

            </nav>
        </div>
    );
}
