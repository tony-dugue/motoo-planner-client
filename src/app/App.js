import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUser } from 'features/user/userSlice';
import './App.scss';

import {LandingPageScene} from 'scenes/LandingPage/LandingPageScene';
import {ContactScene} from 'scenes/Contact/ContactScene';
import {ArticleScene} from 'scenes/Article/ArticleScene';
import {LoginScene} from 'scenes/Login/LoginScene';
import {RegisterScene} from 'scenes/Register/RegisterScene';
import {DashboardScene} from 'scenes/Dashboard/DashboardScene';
import {NotFoundScene} from 'scenes/NotFound/NotFoundScene';

import {Navigation} from 'components/layouts/Navigation';
import {ArticleShow} from 'features/article/ArticleShow';

function App() {

    const { token } = useSelector(selectUser); // on récupère le state

    return (
        <div className="app">

            <Navigation/>

            <Switch>
                <Route exact path="/" component={LandingPageScene}/>

                <Route path="/articles" component={ArticleScene}/>
                <Route path="/article/:slug" component={ArticleShow}/>

                <Route path="/login">
                {token ? <Redirect push to="/dashboard" /> : <LoginScene /> }
                </Route>

                <Route path="/register">
                    {token ? <Redirect push to="/dashboard" /> : <RegisterScene /> }
                </Route>

                <Route path="/dashboard">
                    {token ? <DashboardScene /> : <LoginScene /> }
                </Route>

                <Route path="/contact" component={ContactScene}/>
                <Route component={NotFoundScene}/>
            </Switch>
        </div>
    );
}

export default App;


