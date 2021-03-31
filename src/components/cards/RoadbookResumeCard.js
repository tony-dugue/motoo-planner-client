import React from 'react';
import {Link} from "react-router-dom";

export function RoadbookResumeCard({roadbookItem}) {

    return (
        <div>
            <h5>{roadbookItem.title}</h5>
            <p>{roadbookItem.pictureUrl}</p>
            <p>{roadbookItem.description}</p>
            <p>{roadbookItem.tripStart}</p>

            <Link to={"/roadbook/" + roadbookItem.id}>Modifier le roadbook</Link>
        </div>
    );
}
