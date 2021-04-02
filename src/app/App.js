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
import {PresentationScene} from 'scenes/Presentation/PresentationScene';
import {ProfileScene} from 'scenes/Profile/ProfileScene';
import {NotFoundScene} from 'scenes/NotFound/NotFoundScene';

import {NavigationPublic} from 'components/layouts/NavigationPublic';
import {NavigationPrivate} from 'components/layouts/NavigationPrivate';
import {ArticleShow} from 'features/article/ArticleShow';
import {RoadbookShow} from 'features/roadbook/RoadbookShow';
import {Footer} from 'components/layouts/Footer';

function App() {

    const tokenStorage = sessionStorage.getItem('token'); // on récupère le token dans le storage
    const { token } = useSelector(selectUser); // on récupère le token dans le store

    return (
        <div className="app">

            {/* ======= navigation ========== */}

            { (tokenStorage || token) ? <NavigationPrivate /> : <NavigationPublic /> }

            <div className="main">

                <Switch>

                    {/* ======= ROUTES PUBLIQUES ========== */}

                    <Route exact path="/" component={LandingPageScene}/>
                    <Route path="/contact" component={ContactScene}/>

                    <Route path="/articles" component={ArticleScene}/>
                    <Route path="/article/:slug" component={ArticleShow}/>

                    <Route path="/login" component={LoginScene}/>
                    <Route path="/presentation" component={PresentationScene}/>

                    {/* ======= ROUTES SECURISEES ========== */}

                    <Route path="/register">
                        { (tokenStorage || token) ? <Redirect push to="/dashboard" /> : <RegisterScene /> }
                    </Route>

                    <Route path="/dashboard">
                        { (tokenStorage || token) ? <DashboardScene /> : <LoginScene /> }
                    </Route>

                    <Route path="/profile">
                        { (tokenStorage || token) ? <ProfileScene /> : <LoginScene /> }
                    </Route>

                    <Route path="/roadbook/new">
                        { (tokenStorage || token) ? <RoadbookCreateScene /> : <LoginScene /> }
                    </Route>

                    <Route path="/roadbook/:slug">
                        { (tokenStorage || token) ? <RoadbookShow /> : <LoginScene /> }
                    </Route>

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
