import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";

export const icon = new Icon({
    iconUrl: "/icons/icon5.svg",
    iconSize: [45, 45]
});

const stepData = [
    {
        id: 1,
        geometry: {type: "Point", coordinates: [51.515741079282144, -0.07208065437061122]},
        title: "Départ de la balade",
        description: "",
        stepDate: Date.now(),
        type: ""
    },
    {
        id: 2,
        geometry: {type: "Point", coordinates: [51.55290094275423, -0.020582240809887825]},
        title: "Pause étang du canard",
        description: "",
        stepDate: Date.now(),
        type: "location"
    },
    {
        id: 3,
        geometry: {type: "Point", coordinates: [51.492233558976686, -0.19773678345877627]},
        title: "Pause repas au restaurant du cap",
        description: "",
        stepDate: Date.now(),
        type: "restaurant"
    },
    {
        id: 4,
        geometry: {type: "Point", coordinates: [51.49180603726442, -0.1029797025070452]},
        title: "Visite pointe du grouin",
        description: "",
        stepDate: Date.now(),
        type: "visite"
    },
    {
        id: 5,
        geometry: {type: "Point", coordinates: [51.49039481905978, -0.14296178791120143]},
        title: "Hotel de la gare",
        description: "",
        stepDate: Date.now(),
        type: "hotel"
    },
    {
        id: 6,
        geometry: {type: "Point", coordinates: [51.52218029656741, -0.07088274280915542]},
        title: "fin de la balade",
        description: "",
        stepDate: Date.now(),
        type: ""
    },
]

export const Map = () => {

    const centerPosition = [51.51702295890256, -0.1276989410161924]; // Londres position

    return (
        <div className="map__container">
            <MapContainer center={centerPosition} zoom={13}>

                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2VsdGljc2NvcnBpb24iLCJhIjoiY2toc2NuajhmMXAwODJ1azZxdTdnNG05bCJ9.mlepF2c99ZjypqpuXdZZvg"
                />

                {stepData.map(step => (
                    <Marker
                        key={step.id}
                        position={[step.geometry.coordinates[0], step.geometry.coordinates[1]]}
                        icon={icon}
                    >
                        <Popup>
                            <div className="popup">
                                <p className="popup__title">{step.title}</p>
                                <p className="popup__price">{step.stepDate}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

            </MapContainer>
        </div>
    );
};
