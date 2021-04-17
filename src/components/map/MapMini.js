import React from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";
import {useSelector} from "react-redux";
import {selectSteps} from 'features/roadbook/roadbookSlice';

import moment from 'moment';
import localization from 'moment/locale/fr';

// sélection de l'icône du marker affiché sur la map
export const icon = new Icon({
    iconUrl: "/icons/icon5.svg",
    iconSize: [45, 45]
});

export const MapMini = () => {

    // récupération des étapes dans le store
    const stepsTodo = useSelector(selectSteps)

    // position du centre de la carte lors de son affichage initial
    // on récupère ici la position de l'étape de départ
    const centerPosition = stepsTodo[0]
        ? [stepsTodo[0].stepLat, stepsTodo[0].stepLong]
        : [48.86877537077828, 2.3367584614300783];  // position de Paris par défaut

    return (
        <div className="map__container-mini">

            <MapContainer center={centerPosition} zoom={8}>

                <TileLayer
                    attribution='&copy; <a href="https://www.mapbox.com/">MapBox</a>'
                    url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2VsdGljc2NvcnBpb24iLCJhIjoiY2toc2NuajhmMXAwODJ1azZxdTdnNG05bCJ9.mlepF2c99ZjypqpuXdZZvg"
                />

                {stepsTodo.map(step => (
                    <Marker key={step.id} position={[step.stepLat, step.stepLong]} icon={icon}>
                    <Popup>
                    <div className="popup">
                    <p className="popup__type">{step.type.slug}</p>
                    <p className="popup__title">{step.title}</p>
                    <p className="popup__date">
                    Le {moment(step.stepDate).locale('fr', localization).format("L à H:mm")}
                    </p>
                    <p className="popup__desc">{step.description}</p>
                    </div>
                    </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};
