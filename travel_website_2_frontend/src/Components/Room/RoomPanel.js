import React, {useState} from 'react';
import './RoomPanel.css';
import {Navigate, useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import {Grid} from "semantic-ui-react";

const RoomPanel = ({ room }) => {
    const navigate = useNavigate();
    const cookies = new Cookies();

    const [check, setCheck] = useState(false)

    return (
        <div className="room-card" key={room.id.toString()}>
            <div>
                <img src={"https://img.freepik.com/free-photo/elegant-hotel-room-with-big-bed_1203-1494.jpg"} className={"card-image"}/>
            </div>
            <div className={"white-box"}>
                <h2  className={"card-name"}>{room.name}</h2>
                {/*<p  className={"card-text"}>Description: {room.description}</p>*/}
                <p  className={"card-text"}>Area: {room.area} m<sup>2</sup></p>
                <p  className={"card-text"}>Bedrooms: {room.numofbedrooms}</p>
                <p  className={"card-text"}>Bathrooms: {room.numofbaths}</p>
                <p  className={"card-text"}>Beds: {room.numofbeds}</p>
                <button  onClick={() => {cookies.set('room', room);setCheck(true)}} className={"test-button"}>Enter</button>
                {check &&  <Navigate to={'/room_page'} state={room} /> }
            </div>
        </div>
    );
};

export default RoomPanel;
