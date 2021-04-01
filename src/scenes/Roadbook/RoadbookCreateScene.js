import React from 'react';
import {Link} from "react-router-dom";
import {RoadbookCreate} from "../../features/roadbook/RoadbookCreate";

export function RoadbookCreateScene() {
  return (
   <div className="container">

        <h2>Créer un nouveau roadbook</h2>

        <RoadbookCreate />

       <Link to='/dashboard'>Revenir au tableau de bord</Link>

   </div>
  );
}
