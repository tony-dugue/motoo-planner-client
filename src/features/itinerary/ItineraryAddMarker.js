import React, {useState} from 'react';
import { useMapEvents } from "react-leaflet";
import {ItineraryAddModal} from 'features/itinerary/ItineraryAddModal';

export function ItineraryAddMarker() {

    const [position, setPosition] = useState(null);
    const [open, setOpen] = React.useState(false);

    useMapEvents({
        click: (e) => {
            setPosition(e.latlng); // ajout de la position dans le state
            setOpen(true);  // ouverture de la modal
        },
    });

    const handleClose = () => setOpen(false);

    const handleValid = () => {
        /* ajout dans base de donnée via api */
        /* ajout dans le store */
        setOpen(false);
    }

    return position === null ? null : (
        <ItineraryAddModal handleClose={handleClose} handleValid={handleValid} open={open} position={position} />
    );
}
