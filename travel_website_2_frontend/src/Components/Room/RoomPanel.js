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
        <div  className="room-card">
            <div>
                <img src={"https://img.freepik.com/free-photo/elegant-hotel-room-with-big-bed_1203-1494.jpg"} className={"card-image"}/>
            </div>
            <div className={"white-box"}>
                <h2  className={"card-name"}>{room.name}</h2>
                {/*<p  className={"card-text"}>Description: {room.description}</p>*/}
                <p  className={"card-text"}>Area: {room.area} sq ft</p>
                <p  className={"card-text"}>Bedrooms: {room.numofbedrooms}</p>
                <p  className={"card-text"}>Bathrooms: {room.numofbaths}</p>
                <p  className={"card-text"}>Beds: {room.numofbeds}</p>
                <button  onClick={() => {cookies.set('room', room);setCheck(true)}} className={"test-button"}>Enter</button>
                {check &&  <Navigate to={'/room_page'} state={room} /> }
            </div>
        </div>

        // <div className="width: 50%; display: table;">
        //     <div className="display: table-row">
        //         <div className="width: 600px; display: table-cell;">
        //             <img src={"https://img.freepik.com/free-photo/elegant-hotel-room-with-big-bed_1203-1494.jpg"} className={"card-image"}/>
        //         </div>
        //         <div className="display: table-cell;">
        //             <h2  className={"card-name"}>{room.name}</h2>
        //             <p  className={"card-text"}>Description: {room.description}</p>
        //              <p  className={"card-text"}>Area: {room.area} sq ft</p>
        //              <p  className={"card-text"}>Bedrooms: {room.numofbedrooms}</p>
        //              <p  className={"card-text"}>Bathrooms: {room.numofbaths}</p>
        //              <p  className={"card-text"}>Beds: {room.numofbeds}</p>
        //            <button  onClick={() => {cookies.set('room', room);setCheck(true)}} className={"card-actions"}>Enter</button>
        //                 {check &&  <Navigate to={'/room_page'} state={room} /> }
        //         </div>
        //     </div>
        // </div>


    // <Grid className="room-card" columns={2}>
        //     <Grid.Row>
        //         <Grid.Column>
        //             <img src={"https://img.freepik.com/free-photo/elegant-hotel-room-with-big-bed_1203-1494.jpg"} className={"card-image"}/>
        //         </Grid.Column>
        //         <Grid.Column>
        //              <h2  className={"card-name"}>{room.name}</h2>
        //              <p  className={"card-text"}>Description: {room.description}</p>
        //              <p  className={"card-text"}>Area: {room.area} sq ft</p>
        //              <p  className={"card-text"}>Bedrooms: {room.numofbedrooms}</p>
        //              <p  className={"card-text"}>Bathrooms: {room.numofbaths}</p>
        //              <p  className={"card-text"}>Beds: {room.numofbeds}</p>
        //              <button  onClick={() => {cookies.set('room', room);setCheck(true)}} className={"card-actions"}>Enter</button>
        //              {check &&  <Navigate to={'/room_page'} state={room} /> }
        //         </Grid.Column>
        //     </Grid.Row>
        // </Grid>
    );
};

export default RoomPanel;
