import React, {useEffect, useState} from 'react';
import {ApiConnector} from "../Other/ApiConnector";
import {Container, Form, Grid, Message} from "semantic-ui-react";
import {useAuth} from "../Auth/contex";
import {handleLogError} from "../Other/Helpers";
import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import './RoomPage.css';
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import SearchField from "../Search/SearchField";
import {Map} from "@mui/icons-material";
import RoomMap from "./RoomMap";
import RoomMapButton from "./RoomMapButton";
import {Rating} from "@mui/material";



function RoomPage() {


    const cookies = new Cookies()

    const [room, SetRoom] = useState(cookies.get('room'))
    const [startDate,setStartDate]=useState(new Date())
    const [endDate,setEndDate]=useState(new Date())
    const [ppn,setPPN]=useState(0)
    const [role,setRole]=useState('')
    const [isError, setIsError] = useState(false)
    const [submited, setSubmited] = useState(false)
    const [submitedRating, setSubmitedRating] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [rating,setRating]=useState(3)
    const [details,setDetails]=useState('')


    const Auth = useAuth()
    const user = Auth.getUser()

    useEffect(() => {
        const step = Math.floor(Math.random() * 9); // Step between 0 and 8
        const randomNumber = 30 + step * 5; // Random number between 30 and 70 with a step of 5
        setPPN(randomNumber)

        const fetchData2 = async () => {
            if(user !== null || user !== undefined){
                const response2 = await ApiConnector.getRole(user.user)
                setRole(response2.data)
            }
        }

        fetchData2()
            .catch(console.error)
    }, []);


    const handleSubmit = async () => {
        try {
            console.log({
                start: startDate.toLocaleDateString('en-GB'),
                end: endDate.toLocaleDateString('en-GB'),
                ppn: ppn })
            console.log(user, room.id)
            const response = await ApiConnector.createReservation(user.user, {
                start: startDate.toLocaleDateString('en-GB'),
                end: endDate.toLocaleDateString('en-GB'),
                ppn: ppn}, room.id)
            console.log(response)
            setSubmited(true)
        }
        catch (error){
            handleLogError(error)
            if (error.response && error.response.data) {
                const errorData = error.response.data
                let errorMessage = 'Invalid fields'
                if (errorData.status === 409) {
                    errorMessage = errorData.message
                } else if (errorData.status === 400) {
                    errorMessage = errorData.errors[0].defaultMessage
                }
                setIsError(true)
                setErrorMessage(errorMessage)
            }
        }
    }
    const handleSubmitRating = async () => {
        try {
            const response = await ApiConnector.rate(user.user, room.name, {"description": details, "rating": rating})
            console.log(response.data)
            setSubmitedRating(true)
        }
        catch (error){
            handleLogError(error)
            if (error.response && error.response.data) {
                const errorData = error.response.data
                let errorMessage = 'Invalid fields'
                if (errorData.status === 409) {
                    errorMessage = errorData.message
                } else if (errorData.status === 400) {
                    errorMessage = errorData.errors[0].defaultMessage
                }
                setIsError(true)
                setErrorMessage(errorMessage)
            }
        }
    }

    return (
        <div  className={"room-page"}>
            <h1 className={"room-header"}>{room.name}</h1>
            <Container >
                <img src={"https://img.freepik.com/free-photo/elegant-hotel-room-with-big-bed_1203-1494.jpg"} className={"room-image"}/>
            </Container>
            <Grid className={"room-details"}>
                <Grid.Row >
                    <Grid.Column className={"grid-cell"}>
                        <label about={"nob"}  className={"label_special"}>Bedrooms</label>
                        <h4 id={"nob"} className={"section-title-h4"}>{room.numofbedrooms}</h4>
                    </Grid.Column>
                    <Grid.Column className={"grid-cell"}>
                        <label about={"nobd"}  className={"label_special"}>Beds</label>
                        <h4 id={"nobd"} className={"section-title-h4"}>{room.numofbeds}</h4>
                    </Grid.Column>
                    <Grid.Column  className={"grid-cell"}>
                        <label about={"nobt"}  className={"label_special"}>Bathrooms</label>
                        <h4 id={"nobt"} className={"section-title-h4"}>{room.numofbaths}</h4>
                    </Grid.Column>
                    <Grid.Column className={"grid-cell"}>
                        <label about={"area"}  className={"label_special"}>Area</label>
                        <h4 id={"area"} className={"section-title-h4"}>{room.area}</h4>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column className={"grid-cell"}>
                        <label about={"ppn"}  className={"label_special"}>Price Per Night</label>
                        <h4 id={"ppn"} className={"section-title-h4"}>{ppn}</h4>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column className={"grid-cell"}>
                        <label about={"address"}  className={"label_special"}>Address</label>
                        <h4 id={"address"} className={"section-title-h4"}>{room.address}</h4>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Container className={"room-details"}>
                <label about={"description"} >Description</label>
                <p id={"description"} className={"custom"}>{room.description}</p>
            </Container>
            <Grid className={"amenities"}>
                <h2 align={"center"}>Amenities</h2>
                <Grid.Row className={"grid-cell"}>
                    <label className={"else"}> Cooling </label>
                    {room.cooling && <p className={"true"}>Yes</p>}
                    {!room.cooling && <p className={"false"}>No</p>}
                </Grid.Row>
                <Grid.Row className={"grid-cell"}>
                    <label className={"else"}> Heating </label>
                    {room.heating && <p className={"true"}>Yes</p>}
                    {!room.heating && <p className={"false"}>No</p>}
                </Grid.Row>
                <Grid.Row className={"grid-cell"}>
                    <label className={"else"}> Tv </label>
                    {room.tv && <p className={"true"}>Yes</p>}
                    {!room.tv && <p className={"false"}>No</p>}
                </Grid.Row>
                <Grid.Row className={"grid-cell"}>
                    <label className={"else"}> Parking </label>
                    {room.parking && <p className={"true"}>Yes</p>}
                    {!room.parking && <p className={"false"}>No</p>}
                </Grid.Row>
                <Grid.Row className={"grid-cell"}>
                    <label className={"else"}> Living Room </label>
                    {room.livingRoom && <p className={"true"}>Yes</p>}
                    {!room.livingRoom && <p className={"false"}>No</p>}
                </Grid.Row>
                <Grid.Row className={"grid-cell"}>
                    <label className={"else"}> Internet </label>
                    {room.internet && <p className={"true"}>Yes</p>}
                    {!room.internet && <p className={"false"}>No</p>}
                </Grid.Row>
                <Grid.Row className={"grid-cell"}>
                    <label className={"else"}> Kitchen </label>
                    {room.kitchen && <p className={"true"}>Yes</p>}
                    {!room.kitchen && <p className={"false"}>No</p>}
                </Grid.Row>
                <Grid.Row className={"grid-cell"}>
                    <label className={"else"}> Elevator </label>
                    {room.elevator && <p className={"true"}>Yes</p>}
                    {!room.elevator && <p className={"false"}>No</p>}
                </Grid.Row>
            </Grid>

            <Grid className={"rules"} >
                <h2  align={"center"}>Rules</h2>
                <Grid.Row className={"grid-cell"}>
                    <label> Smoking </label>
                    {room.smoking && <p className={"true"}>Allowed</p>}
                    {!room.smoking && <p className={"false"}>Not Allowed</p>}
                </Grid.Row>
                <Grid.Row className={"grid-cell"}>
                    <label> Events </label>
                    {room.events && <p className={"true"}>Allowed</p>}
                    {!room.events && <p className={"false"}>Not Allowed</p>}
                </Grid.Row>
                <Grid.Row className={"grid-cell"}>
                    <label> Pets </label>
                    {room.pets && <p className={"true"}>Allowed</p>}
                    {!room.pets && <p className={"false"}>Not Allowed</p>}
                </Grid.Row>
            </Grid>
            {(role === "client" || role === "landlordclient") && <Container className={"date-container"} >
                <h2 align={"center"}> Booking </h2>
                <input
                    type="date"
                    value={startDate.toISOString().split('T')[0]}
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                />
                <input
                    type="date"
                    value={endDate.toISOString().split('T')[0]}
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                />
                <button type={"submit"} onClick={handleSubmit}>Book Now</button>
            </Container>}
            {isError && !submited && <Message negative>{errorMessage}</Message>}
            {(role === "client" || role === "landlordclient") && submited &&  <Container className={"date-container"} >
                <h2 align={"center"}> Rate Your Experience </h2>
                {/*<label> Give Dates: </label>*/}
                <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
                <input
                    type="text"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                />
                <button type={"submit"} onClick={handleSubmitRating}>Rate Us</button>
            </Container>}
            {submited && submitedRating && <Message positive>Congrats!</Message>}
        </div>
    );
};

export default RoomPage;