import React from 'react';
import { Link } from "react-router-dom";

export function PresentationScene() {
  return (
   <div className="container">
       <h2>Petite présentation des fonctionnalités de l'application</h2>

       <p>Envie de commencer maintenant ? <Link to='/login'>Se connecter</Link></p>
   </div>
  );
}
