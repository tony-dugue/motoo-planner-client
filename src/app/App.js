import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { selectUser } from 'features/user/userSlice';
import './App.scss';

import {LandingPageScene} from 'scenes/LandingPage/LandingPageScene';
import {ContactScene} from 'scenes/Contact/ContactScene';
import {ArticleScene} from 'scenes/Article/ArticleScene';
import {LoginScene} from 'scenes/Login/LoginScene';
import {RegisterScene} from 'scenes/Register/RegisterScene';
import {DashboardScene} from 'scenes/Dashboard/DashboardScene';
import {RoadbookCreateScene} from 'scenes/Roadbook/RoadbookCreateScene';
import {ItineraryPlannerScene} from 'scenes/ItineraryPlanner/ItineraryPlannerScene';
import {InformationsScene} from 'scenes/Informations/InformationsScene';
import {PresentationScene} from 'scenes/Presentation/PresentationScene';
import {ProfileScene} from 'scenes/Profile/ProfileScene';
import {NotFoundScene} from 'scenes/NotFound/NotFoundScene';
import { Storage } from 'services/storage/storage';

import {NavigationPublic} from 'components/layouts/NavigationPublic';
import {NavigationPrivate} from 'components/layouts/NavigationPrivate';
import {ArticleSingleScene} from 'scenes/Article/ArticleSingleScene';
import {RoadbookShowScene} from 'scenes/Roadbook/RoadbookShowScene';
import {Footer} from 'components/layouts/Footer';

function App() {

    const tokenStorage = Storage.get('token'); // on récupère le token dans le storage
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

                    {/* ======= ROUTES SECURISEES ========== */}

                    <Route path="/register">
                        { (tokenStorage || tokenStore) ? <Redirect push to="/dashboard" /> : <RegisterScene /> }
                    </Route>

                    <Route exact path="/dashboard">
                        { (tokenStorage || tokenStore) ? <DashboardScene /> : <LoginScene /> }
                    </Route>

                    <Route path="/profile">
                        { (tokenStorage || tokenStore) ? <ProfileScene /> : <LoginScene /> }
                    </Route>

                    <Route path="/roadbook/new">
                        { (tokenStorage || tokenStore) ? <RoadbookCreateScene /> : <LoginScene /> }
                    </Route>

                    <Route path="/roadbook/:slug">
                        { (tokenStorage || tokenStore) ? <RoadbookShowScene /> : <LoginScene /> }
                    </Route>

                    <Route path="/itinerary/:slug">
                        { (tokenStorage || tokenStore) ? <ItineraryPlannerScene /> : <LoginScene /> }
                    </Route>

                    <Route path="/informations/:slug">
                        { (tokenStorage || tokenStore) ? <InformationsScene /> : <LoginScene /> }
                    </Route>


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
