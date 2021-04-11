import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { selectUser } from 'features/user/userSlice';
import './App.scss';

import {PrivateRoute} from 'features/auth/PrivateRoute';

import {LandingPageScene} from 'scenes/LandingPage/LandingPageScene';
import {ContactScene} from 'scenes/Contact/ContactScene';
import {ArticleScene} from 'scenes/Article/ArticleScene';
import {LoginScene} from 'scenes/Login/LoginScene';
import {RegisterScene} from 'scenes/Register/RegisterScene';
import {DashboardScene} from 'scenes/Dashboard/DashboardScene';
import {RoadbookCreateScene} from 'scenes/Roadbook/RoadbookCreateScene';
import {ItineraryPlannerScene} from 'scenes/ItineraryPlanner/ItineraryPlannerScene';
import {PresentationScene} from 'scenes/Presentation/PresentationScene';
import {ProfileScene} from 'scenes/Profile/ProfileScene';
import {NotFoundScene} from 'scenes/NotFound/NotFoundScene';

import {NavigationPublic} from 'components/layouts/NavigationPublic';
import {NavigationPrivate} from 'components/layouts/NavigationPrivate';
import {ArticleSingleScene} from 'scenes/Article/ArticleSingleScene';
import {RoadbookShowScene} from 'scenes/Roadbook/RoadbookShowScene';
import {Footer} from 'components/layouts/Footer';

// import global des icones fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faHome, faMapMarkerAlt, faUtensils, faMonument, faBed } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faHome, faMapMarkerAlt, faUtensils, faMonument, faBed)

function App() {

    const tokenStorage = sessionStorage.getItem('accessJWT'); // on récupère le token dans le storage
    const { tokenStore } = useSelector(selectUser); // on récupère le token dans le store

    return (
        <div className="app">

            {/* ======= navigation ========== */}

            { (tokenStorage || tokenStore) ? <NavigationPrivate /> : <NavigationPublic /> }

            <div className="main">

                <Switch>

                    {/* ======= ROUTES PUBLIQUES ========== */}

                    <Route exact path="/" component={LandingPageScene}/>
                    <Route path="/contact" component={ContactScene}/>

                    <Route path="/articles" component={ArticleScene}/>
                    <Route path="/article/:slug" component={ArticleSingleScene}/>

                    <Route path="/login" component={LoginScene}/>
                    <Route path="/presentation" component={PresentationScene}/>

                    <Route path="/register" component={RegisterScene} />

                    {/* ======= ROUTES SECURISEES ========== */}

                    <PrivateRoute path="/dashboard"><DashboardScene /></PrivateRoute>

                    <PrivateRoute path="/profile"><ProfileScene /></PrivateRoute>

                    <PrivateRoute path="/roadbook/new"><RoadbookCreateScene /></PrivateRoute>

                    <PrivateRoute path="/roadbook/:slug"><RoadbookShowScene /></PrivateRoute>

                    <PrivateRoute path="/itinerary/:slug"><ItineraryPlannerScene /></PrivateRoute>

                    {/* TODO: bloquer les roadbook/:slug si c'est pas la personne */}

                    {/* ======= PAGE 404 ========== */}

                    <Route component={NotFoundScene}/>

                </Switch>

            </div>

            <Footer />

            <ToastContainer />

        </div>
    );
}

export default App;
