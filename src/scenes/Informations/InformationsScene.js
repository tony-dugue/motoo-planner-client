import React from 'react';
import {Link} from "react-router-dom";

export function InformationsScene() {
    return (
        <div className="informations">
            <div className="container">

                <Link to='/roadbook/2' className="btn btn-motoo-outline-blue">Revenir au roadbook</Link>

                <h2>Je suis la page informations pratiques</h2>

            </div>
        </div>
    );
}
