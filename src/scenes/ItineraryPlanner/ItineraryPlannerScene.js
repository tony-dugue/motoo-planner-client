import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBed, faHome, faMapMarkerAlt, faMonument, faUtensils} from "@fortawesome/free-solid-svg-icons";

export function ItineraryPlannerScene() {
    return (
        <div className="itinerary">
            <div className="container">

                <Link to='/roadbook/2' className="btn btn-motoo-outline-blue">Revenir au roadbook</Link>

                <h2 className="itinerary__title">Roadbook : <span>xxx</span></h2>

                <section>
                    <div className="container">
                        <div className="row">

                            <div className="col-md-6">
                                <div className="col-md-6">
                                    <div className="roadbook-show-itinerary">

                                        <div>
                                            <ul className="roadbook-show-itinerary__step">
                                                <li><span><FontAwesomeIcon icon={faHome}/></span>09h00 - Départ de la balade</li>
                                                <li className="distance"><span className="distance-icon">|</span>45 km</li>
                                                <li><span className="location-icon"><FontAwesomeIcon
                                                    icon={faMapMarkerAlt}/></span>10h15 - pause étang du canard
                                                </li>
                                                <li className="distance"><span className="distance-icon">|</span>70 km</li>
                                                <li><span className="restaurant-icon"><FontAwesomeIcon icon={faUtensils}/></span>12h30
                                                    - Pause repas au restaurant du cap
                                                </li>
                                                <li className="distance"><span className="distance-icon">|</span>110 km</li>
                                                <li><span className="visite-icon"><FontAwesomeIcon icon={faMonument}/></span>16h00
                                                    - Visite pointe du grouin
                                                </li>
                                                <li className="distance"><span className="distance-icon">|</span>45 km</li>
                                                <li><span className="hotel-icon"><FontAwesomeIcon icon={faBed}/></span>18h45 -
                                                    Hotel de la gare
                                                </li>
                                                <li className="distance"><span className="distance-icon">|</span>62 km</li>
                                                <li><span><FontAwesomeIcon icon={faHome}/></span>Fin de la balade</li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <p>map</p>
                            </div>

                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
