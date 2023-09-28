import React, {useEffect, useState} from 'react';
import {ApiConnector} from "../Other/ApiConnector";
import {Container, Form, Message} from "semantic-ui-react";
import {useAuth} from "../Auth/contex";
import {handleLogError} from "../Other/Helpers";

const RoomPage = ({room_name}) => {

    const [room, SetRoom] = useState(null)
    const [startDate,setStartDate]=useState(new Date())
    const [endDate,setEndDate]=useState(new Date())
    const [ppn,setPPN]=useState(0)
    const [isError, setIsError] = useState(false)
    const [submited, setSubmited] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const Auth = useAuth()
    const user = Auth.getUser()

    useEffect(async () => {
        try {
            const response = await ApiConnector.getRoomByName(room_name)
            SetRoom(response.data)
            console.log(room)
            const step = Math.floor(Math.random() * 9); // Step between 0 and 8
            const randomNumber = 30 + step * 5; // Random number between 30 and 70 with a step of 5
            setPPN(randomNumber)
        } catch (error){
            console.error(error)
        }
    }, []);


    const handleSubmit = async () => {
        try {
            const response = await ApiConnector.createReservation(user.user, {startDate, endDate, ppn}, room.id)
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

    return (
        <div>
            <Container className={"main-container"}>
                <img src={"https://img.freepik.com/free-photo/elegant-hotel-room-with-big-bed_1203-1494.jpg"}/>
            </Container>
            <Container className={"main-container"}>
                <label about={"name"} className={"label_special"}>Name</label>
                <h2 id={"name"} className={"section-title-h2"}>{room.name}</h2>
                <label about={"nob"}  className={"label_special"}>Bedrooms</label>
                <h4 id={"nob"} className={"section-title-h4"}>{room.numOfBedrooms}</h4>
                <label about={"nobd"}  className={"label_special"}>Beds</label>
                <h4 id={"nobd"} className={"section-title-h4"}>{room.numOfBeds}</h4>
                <label about={"nobt"}  className={"label_special"}>Bathrooms</label>
                <h4 id={"nobt"} className={"section-title-h4"}>{room.numOfBaths}</h4>
                <label about={"area"}  className={"label_special"}>Area</label>
                <h4 id={"area"} className={"section-title-h4"}>{room.area}</h4>
                <label about={"type"}  className={"label_special"}>Type</label>
                <h4 id={"type"} className={"section-title-h4"}>{room.typeofroom}</h4>
                <label about={"ppn"}  className={"label_special"}>Price Per Night</label>
                <h4 id={"ppn"} className={"section-title-h4"}>{ppn}</h4>
            </Container>
            <Container className={"main-container"}>
                <label about={"description"}  className={"label_special"}>Description</label>
                <p id={"name"} className={"section-title-h4"}>{room.description}</p>
            </Container>
            <Container className={"main-container"}>
                <p> Cooling </p>
                {room.cooling && <p color={"green"}>Yes</p>}
                {!room.cooling && <p color={"red"}>No</p>}
                <p> Heating </p>
                {room.heating && <p color={"green"}>Yes</p>}
                {!room.heating && <p color={"red"}>No</p>}
                <p> Tv </p>
                {room.tv && <p color={"green"}>Yes</p>}
                {!room.tv && <p color={"red"}>No</p>}
                <p> Parking </p>
                {room.parking && <p color={"green"}>Yes</p>}
                {!room.parking && <p color={"red"}>No</p>}
                <p> Living Room </p>
                {room.livingRoom && <p color={"green"}>Yes</p>}
                {!room.livingRoom && <p color={"red"}>No</p>}
                <p> Internet </p>
                {room.internet && <p color={"green"}>Yes</p>}
                {!room.internet && <p color={"red"}>No</p>}
                <p> Kitchen </p>
                {room.kitchen && <p color={"green"}>Yes</p>}
                {!room.kitchen && <p color={"red"}>No</p>}
                <p> Elevator </p>
                {room.elevator && <p color={"green"}>Yes</p>}
                {!room.elevator && <p color={"red"}>No</p>}
            </Container>
            <Container  className={"main-container"}>
                <p> Smoking </p>
                {room.smoking && <p color={"green"}>Allowed</p>}
                {!room.smoking && <p color={"red"}>Not Allowed</p>}
                <p> Events </p>
                {room.events && <p color={"green"}>Allowed</p>}
                {!room.events && <p color={"red"}>Not Allowed</p>}
                <p> Pets </p>
                {room.pets && <p color={"green"}>Allowed</p>}
                {!room.pets && <p color={"red"}>Not Allowed</p>}
            </Container>
            <Container className={"main-container"} >
                <label> Give Dates: </label>
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
            </Container>
            {isError && <Message negative>{errorMessage}</Message>}
            {submited && <Message positive>Congrats!</Message>}
        </div>
    );
};

export default RoomPage;