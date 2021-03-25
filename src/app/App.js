import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import './App.scss';

import {LandingPageScene} from 'scenes/LandingPage/LandingPageScene';
import {ContactScene} from 'scenes/Contact/ContactScene';
import {ArticleScene} from 'scenes/Article/ArticleScene';
import {LoginScene} from 'scenes/Login/LoginScene';
import {DashboardScene} from 'scenes/Dashboard/DashboardScene';
import {NotFoundScene} from 'scenes/NotFound/NotFoundScene';

import {Navigation} from 'components/layouts/Navigation';

import {ArticleShow} from 'features/article/ArticleShow';

function App() {

    return (
        <div className="app">

            <Navigation/>

            <Switch>
                <Route exact path="/" component={LandingPageScene}/>

                <Route path="/articles" component={ArticleScene}/>
                <Route path="/article/:slug" component={ArticleShow}/>

                <Route path="/login">
                {sessionStorage.getItem('token') ? <Redirect push to="/dashboard" /> : <LoginScene /> }
                </Route>

                <Route path="/dashboard">
                    {sessionStorage.getItem('token') ? <DashboardScene /> : <LoginScene /> }
                </Route>

                <Route path="/contact" component={ContactScene}/>
                <Route component={NotFoundScene}/>
            </Switch>
        </div>
    );
}

export default App;


