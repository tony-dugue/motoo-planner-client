import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';

import { LandingPageScene } from '../scenes/LandingPage/LandingPageScene';
import { ContactScene } from '../scenes/Contact/ContactScene';
import { ArticleScene } from '../scenes/Article/ArticleScene';
import { LoginScene } from '../scenes/Login/LoginScene';
import { NotFoundScene } from '../scenes/NotFound/NotFoundScene';

import { Navigation } from '../components/layouts/Navigation';

import { Article } from '../features/article/Article';

function App() {
  return (
    <div className="app">

        <Navigation />

        <Switch>
            <Route exact path="/" component={LandingPageScene} />
            <Route path="/articles" component={ArticleScene} />
            <Route path="/contact" component={ContactScene} />
            <Route path="/login" component={LoginScene} />
            <Route path="/article/:slug" component={Article} />
            <Route component={NotFoundScene} />
        </Switch>
    </div>
  );
}

export default App;


