import React from 'react';
import './RoomPanel.css';
import {useNavigate} from "react-router-dom";

const RoomPanel = ({ name, description, area, bedrooms, bathrooms, beds }) => {
    const navigate = useNavigate();

    return (
        <button className="room-panel" onClick={() => navigate("/room_page", {
            state :{
                name: name
            }
        })}>
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
