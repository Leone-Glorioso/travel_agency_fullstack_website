import {useMap} from "react-leaflet";
import {useEffect} from "react";
import * as L from 'leaflet';

function NewTileLayer() {
    const map = useMap();

    useEffect(() => {
        new L.TileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                tileSize: 16,
                dragging: false
            }
        ).addTo(map);
    }, []);

    return null;
}

export default NewTileLayer;