import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const RoomMap = ({ room, closeMap }) => {
    return (
        <Popup onClose={closeMap}>
            <div className="map-content">
                <button className="close-button" onClick={closeMap}>Close</button>
                <MapContainer center={[room.latitude, room.longitude]} zoom={15} style={{ height: '300px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[room.latitude, room.longitude]}>
                        <Popup>Your Room Location</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </Popup>
    );
};

export default RoomMap;
