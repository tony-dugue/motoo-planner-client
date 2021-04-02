import React from 'react';
import { Link } from "react-router-dom";

export function PresentationScene() {
  return (

      <div className="content">

          <h2>Petite présentation des fonctionnalités de l'application</h2>



          <div className="content__info">
              <p>Prêt à commencer? <Link to='/login'><span>Se connecter</span></Link></p>
          </div>

      </div>
  );
}
