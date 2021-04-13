import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";
import {useSelector} from "react-redux";
import {selectSteps} from 'features/roadbook/roadbookSlice';
import {ItineraryAddMarker} from "features/itinerary/ItineraryAddMarker";

import moment from 'moment';
import localization from 'moment/locale/fr';

export const icon = new Icon({
    iconUrl: "/icons/icon5.svg",
    iconSize: [45, 45]
});

export const Map = () => {

    const stepsTodo = useSelector(selectSteps)

    const centerPosition = [48.10938, -1.67608]; // Rennes

    // TODO: tracer des traits entre les étapes sur la carte
    // TODO: afficher les icones sur la carte selon le type ???

    return (
        <div className="map__container">

            <MapContainer center={centerPosition} zoom={8}>

                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2VsdGljc2NvcnBpb24iLCJhIjoiY2toc2NuajhmMXAwODJ1azZxdTdnNG05bCJ9.mlepF2c99ZjypqpuXdZZvg"
                />

                {stepsTodo.map(step => (
                    <Marker
                        key={step.id}
                        position={[step.stepLat, step.stepLong]}
                        icon={icon}
                    >
                        <Popup>
                            <div className="popup">
                                <p className="popup__type">{step.type.slug}</p>

                                <p className="popup__title">{step.title}</p>

                                <p className="popup__date">
                                    Le {moment(step.stepDate).locale('fr', localization).format("L à h:mm")}
                                </p>

                                <p className="popup__desc">{step.description}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                <ItineraryAddMarker />

            </MapContainer>
        </div>
    );
};
