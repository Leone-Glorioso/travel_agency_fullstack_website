import React from 'react';
import './RoomPanel.css';

const RoomPanel = ({ name, description, area, bedrooms, bathrooms, beds }) => {
    return (
        <button className="room-panel">
            <img src={"https://img.freepik.com/free-photo/elegant-hotel-room-with-big-bed_1203-1494.jpg"}/>
            <h2>{name}</h2>
            <p>Description: {description}</p>
            <p>Area: {area} sq ft</p>
            <p>Bedrooms: {bedrooms}</p>
            <p>Bathrooms: {bathrooms}</p>
            <p>Beds: {beds}</p>
        </button>
    );
};

export default RoomPanel;
