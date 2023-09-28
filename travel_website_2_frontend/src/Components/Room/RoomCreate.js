import React, {useState} from 'react';
import {Button, Container, Form, Grid, Message, Segment} from "semantic-ui-react";
import DropdownMenu from "../Auth/DropDownMenuRole";
import {NavLink} from "react-router-dom";
import {MapContainer, TileLayer} from "react-leaflet";
import SearchField from "../Search/SearchField";
import './RoomCreateStyle.css';
import {OpenStreetMapProvider} from "leaflet-geosearch";
import NewTileLayer from "../Search/NewTileLayer";
import {ApiConnector} from "../Other/ApiConnector";
import {useAuth} from "../Auth/contex";
import RoomPopup from "./RoomPopUp";
import {handleLogError} from "../Other/Helpers";

const RoomCreate = () => {

    let [numOfBeds,setNumOfBeds]=useState(0)
    let [numOfBaths,setNumOfBaths]=useState(0)
    let [numOfBedrooms,setNumOfBedrooms]=useState(0)
    let [area,setArea]=useState(0)
    let [livingRoom,setLivingRoom]=useState(false)
    let [smoking,setSmoking]=useState(false)
    let [pets,setPets]=useState(false)
    let [events,setEvents]=useState(false)
    let [internet,setInternet]=useState(false)
    let [cooling,setCooling]=useState(false)
    let [heating,setHeating]=useState(false)
    let [kitchen,setKitchen]=useState(false)
    let [tv,setTv]=useState(false);
    let [parking,setParking]=useState(false)
    let [elevator,setElevator]=useState(false)
    let [description,setDescription]=useState("")
    let [name, setName] = useState('')
    let [typeOfRoom, setTypeOfRoom] = useState('')
    const [isError, setIsError] = useState(false)
    const [submited, setSubmited] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const prov = new OpenStreetMapProvider()

    const Auth = useAuth()
    const user = Auth.getUser()
    console.log(Auth.user)
    console.log(user)

    const handleSubmit = async () => {
        const roomRequest = {
            "name": name,
            "description": description,
            "numOfBeds": numOfBeds,
            "numOfBedrooms": numOfBedrooms,
            "numOfBaths": numOfBaths,
            "area": area,
            "livingRoom": livingRoom,
            "internet": internet,
            "events": events,
            "pets": pets,
            "kitchen": kitchen,
            "smoking": smoking,
            "heating": heating,
            "cooling": cooling,
            "tv": tv,
            "elevator": elevator,
            "parking": parking,
            "typeofroom": typeOfRoom
        }
        try {
            console.log(roomRequest)
            const response = await ApiConnector.createRoom(user.user, roomRequest)
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
        <>
            {/*<MapContainer*/}
            {/*    id="map"*/}
            {/*    // className={classes.map}*/}
            {/*    center={[51.505, -0.091]}*/}
            {/*    zoom={13}*/}
            {/*    scrollWheelZoom={false}*/}
            {/*>*/}
            {/*    <SearchField*/}
            {/*        provider={prov}*/}
            {/*        showMarker={true}*/}
            {/*        showPopup={false}*/}
            {/*        popupFormat={({ query, result }) => result.label}*/}
            {/*        maxMarkers={3}*/}
            {/*        retainZoomLevel={false}*/}
            {/*        animateZoom={true}*/}
            {/*        autoClose={false}*/}
            {/*        searchLabel={"Enter address, please"}*/}
            {/*        keepResult={true}*/}
            {/*    />*/}
            {/*</MapContainer>*/}
            <Container className={"one"}>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={"two"}
                    // size={100}
                />
                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={"two"}

                />
                {/*<MapContainer*/}
                {/*    id="map"*/}
                {/*    // className={classes.map}*/}
                {/*    center={[51.505, -0.091]}*/}
                {/*    zoom={13}*/}
                {/*    scrollWheelZoom={false}*/}
                {/*>*/}
                {/*    <NewTileLayer />*/}
                {/*    <SearchField*/}
                {/*        provider={prov}*/}
                {/*        showMarker={true}*/}
                {/*        showPopup={false}*/}
                {/*        popupFormat={({ query, result }) => result.label}*/}
                {/*        maxMarkers={3}*/}
                {/*        retainZoomLevel={false}*/}
                {/*        animateZoom={true}*/}
                {/*        autoClose={false}*/}
                {/*        searchLabel={"Enter address, please"}*/}
                {/*        keepResult={true}*/}
                {/*    />*/}
                {/*</MapContainer>*/}
                <label>Beds</label>
                <input
                    type="number"
                    min={1}
                    max={10}
                    value={numOfBeds}
                    onChange={(e) => setNumOfBeds(e.target.value)}
                    className={"two"}
                />
                <label>Bathrooms</label>
                <input
                    type="number"
                    min={1}
                    max={10}
                    value={numOfBaths}
                    onChange={(e) => setNumOfBaths(e.target.value)}
                    className={"two"}
                />
                <label>Bedrooms</label>
                <input
                    type="number"
                    min={1}
                    max={10}
                    value={numOfBedrooms}
                    onChange={(e) => setNumOfBedrooms(e.target.value)}
                    className={"two"}
                />
                <label>Area</label>
                <input
                    type="number"
                    min={1}
                    max={10}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className={"two"}
                />
                <label htmlFor="livingroom">LivingRoom:</label>
                <select name="livingroom" id="livingroom" onChange={(e) => setLivingRoom(e.target.value)} className={"three"}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="smoking">Smoking:</label>
                <select name="smoking" id="smoking" onChange={(e) => setSmoking(e.target.value)} className={"three"}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="pets">Pets:</label>
                <select name="pets" id="pets" onChange={(e) => setPets(e.target.value)} className={"three"}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="events">Events:</label>
                <select name="events" id="events" onChange={(e) => setEvents(e.target.value)} className={"three"}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="internet">Internet:</label>
                <select name="internet" id="internet" onChange={(e) => setInternet(e.target.value)} className={"three"}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="cooling">Cooling:</label>
                <select name="cooling" id="cooling" onChange={(e) => setCooling(e.target.value)} className={"three"}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="heating">Heating:</label>
                <select name="heating" id="heating" onChange={(e) => setHeating(e.target.value)} className={"three"}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="kitchen">Kitchen:</label>
                <select name="kitchen" id="kitchen" onChange={(e) => setKitchen(e.target.value)} className={"three"}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="tv">Tv:</label>
                <select name="tv" id="tv" onChange={(e) => setTv(e.target.value)} className={"three"}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="parking">Parking:</label>
                <select name="parking" id="parking" onChange={(e) => setParking(e.target.value)} className={"three"}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="elevator">Elevator:</label>
                <select name="elevator" id="elevator" onChange={(e) => setElevator(e.target.value)} className={"three"}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>
                <label htmlFor="typeOfRoom">Choose type of room:</label>
                {/*<select name="typeOfRoom" id="typeOfRoom" onChange={(e) => handleSetTypeOfRoom(e.target.value)} multiple>*/}
                <select name="typeOfRoom" id="typeOfRoom" onChange={(e) => setTypeOfRoom(e.target.value)} size="1">
                    <option value="private_room">Private Room</option>
                    <option value="hostel">Hostel</option>
                    <option value="house">House</option>
                </select>
                <Button color='violet' fluid size='large' className={"button-container"} type={"submit"} onClick={handleSubmit} className={"four"}>Create</Button>
                {isError && <Message negative>{errorMessage}</Message>}
                {submited && <Message positive>Congrats!</Message>}
            </Container>
        </>
    );
};

export default RoomCreate;