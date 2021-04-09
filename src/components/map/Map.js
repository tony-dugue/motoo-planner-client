import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

export const Map = () => {
    const defaultPosition = [48.864716, 2.349]; // Paris position

    return (
        <div className="map__container">
            <MapContainer center={defaultPosition} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    );
};
