import React from 'react';
import { Link } from "react-router-dom";
import {Presentation} from 'components/sections/Presentation';

export function PresentationScene() {
  return (

      <div className="content">

          <h2>Petite présentation des fonctionnalités de l'application</h2>

          <Presentation />

          <div className="content__info">
              <p>Prêt à commencer?
                  <Link to='/login'>
                      <button className="btn btn-motoo-outline-blue">Se connecter</button>
                  </Link>
              </p>
          </div>

      </div>
  );
}
