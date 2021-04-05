import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Button } from 'components/buttons/Button';

export function NavigationPublic() {

    const [navbar, setNavbar] = useState(false);

    // ajout classe active sur la barre de navigation lors du scroll
    const changeBackground = () => (window.scrollY >= 80) ? setNavbar(true) : setNavbar(false);
    window.addEventListener('scroll', changeBackground);

    return (
        <header className={navbar ? 'header active' : 'header'}>

            <nav className="navigation">

                <div className="navigation__brand">

                    <div className="navigation__brand-logo">
                        <NavLink exact to='/'>
                            <img src='/logo-light.png' alt="logo Motoo Planner"/>
                        </NavLink>
                    </div>

                    <div className="navigation__link-auth--mobile">
                        <Button link='/login' type='outline' title='Se connecter'/>
                    </div>
                </div>

                <div className="navigation__link">

                    <ul className="navigation__link-items">
                        <li><NavLink to='/' className="navigation__link-item">Accueil</NavLink></li>
                        <li><NavLink to='/articles' className="navigation__link-item">Articles</NavLink></li>
                        <li><NavLink to='/contact' className="navigation__link-item">Nous contacter</NavLink></li>
                    </ul>

                    <div className="navigation__link-auth">
                        <Button link='/login' type='outline' title='Se connecter'/>
                    </div>

                    <div className="navigation__link-socials">
                        <FontAwesomeIcon className="navigation__link-social twitter" icon={faTwitter}/>
                        <FontAwesomeIcon className="navigation__link-social facebook" icon={faFacebook}/>
                    </div>

                </div>

            </nav>
        </header>
    );
}
