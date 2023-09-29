import React, { useState } from 'react';
import RoomMap from './RoomMap'; // Import the RoomMap component

const RoomMapButton = ({ room }) => {
    const [showMap, setShowMap] = useState(false);

    const toggleMap = () => {
        setShowMap(!showMap);
    };

    return (
        <div>
            <button onClick={toggleMap}>Show Location</button>
            {showMap && <RoomMap room={room} closeMap={toggleMap} />}
        </div>
    );
};

export default RoomMapButton;