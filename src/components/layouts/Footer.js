import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {NavLink} from "react-router-dom";
import moment from 'moment';

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer__wrapper">

                <div className="footer-link">

                    <div className="footer-link__menu">
                        <p className="footer-link__menu-heading">Articles</p>
                        <ul>
                            <li className="footer-link__menu-item"><NavLink to='/article/1'>article 1</NavLink></li>
                            <li className="footer-link__menu-item"><NavLink to='/article/2'>article 2</NavLink></li>
                            <li className="footer-link__menu-item"><NavLink to='/article/3'>article 3</NavLink></li>
                        </ul>
                    </div>

                    <div className="footer-link__menu">
                        <p className="footer-link__menu-heading">L'application</p>
                        <ul>
                            <li className="footer-link__menu-item"><NavLink to='/presentation'>Présentation</NavLink></li>
                            <li className="footer-link__menu-item"><NavLink to='/other'>FAQ</NavLink></li>
                        </ul>
                    </div>

                    <div className="footer-link__menu">
                        <p className="footer-link__menu-heading">A propos</p>
                        <ul>
                            <li className="footer-link__menu-item"><NavLink to='/contact'>Nous contacter</NavLink></li>
                            <li className="footer-link__menu-item"><NavLink to='/other'>Mentions légales</NavLink></li>
                        </ul>
                    </div>

                    <div className="footer-link__social">
                        <FontAwesomeIcon className="footer-link__social-item twitter" icon={faTwitter}/>
                        <FontAwesomeIcon className="footer-link__social-item facebook" icon={faFacebook}/>
                    </div>

                </div>

                <div className="footer-logo">
                    <NavLink exact to='/'><img src='/logo-light.png' alt="logo Motoo Planner"/></NavLink>
                </div>

                <div className="footer-copyright">
                    <p className="footer-copyright__content">© {moment().format('YYYY')} Motoo Planner. Tous droits réservés.</p>
                </div>

            </div>
        </footer>
    );
}
