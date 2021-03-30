import React from 'react';

export function RoadbookResumeCard({roadbookItem}) {

    return (
        <div>
            <h5>{roadbookItem.title}</h5>
            <p>{roadbookItem.pictureUrl}</p>
            <p>{roadbookItem.description}</p>
        </div>
    );
}
