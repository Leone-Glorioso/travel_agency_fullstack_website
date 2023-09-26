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

    const prov = new OpenStreetMapProvider()

    const Auth = useAuth()

    const handleSubmit = async () => {
        const roomRequest = {

        }
        try {
            const response = await ApiConnector.createRoom(Auth.user.user, roomRequest)
        }
        catch (error){
            console.log(error.message)
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
            <Container>
                <label>Name</label>
                <input
                    type="text"
                    min={1}
                    max={10}
                    value={numOfBeds}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Description</label>
                <input
                    type="text"
                    min={1}
                    max={10}
                    value={numOfBeds}
                    onChange={(e) => setDescription(e.target.value)}
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
                />
                <label>Bathrooms</label>
                <input
                    type="number"
                    min={1}
                    max={10}
                    value={numOfBaths}
                    onChange={(e) => setNumOfBaths(e.target.value)}
                />
                <label>Bedrooms</label>
                <input
                    type="number"
                    min={1}
                    max={10}
                    value={numOfBedrooms}
                    onChange={(e) => setNumOfBedrooms(e.target.value)}
                />
                <label>Area</label>
                <input
                    type="number"
                    min={1}
                    max={10}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                />
                <label htmlFor="livingroom">LivingRoom:</label>
                <select name="livingroom" id="livingroom" onChange={(e) => setLivingRoom(e.target.value)}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="smoking">Smoking:</label>
                <select name="smoking" id="smoking" onChange={(e) => setSmoking(e.target.value)}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="pets">Pets:</label>
                <select name="pets" id="pets" onChange={(e) => setPets(e.target.value)}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="events">Events:</label>
                <select name="events" id="events" onChange={(e) => setEvents(e.target.value)}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="internet">Internet:</label>
                <select name="internet" id="internet" onChange={(e) => setInternet(e.target.value)}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="cooling">Cooling:</label>
                <select name="cooling" id="cooling" onChange={(e) => setCooling(e.target.value)}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="heating">Heating:</label>
                <select name="heating" id="heating" onChange={(e) => setHeating(e.target.value)}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="kitchen">Kitchen:</label>
                <select name="kitchen" id="kitchen" onChange={(e) => setKitchen(e.target.value)}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="tv">Tv:</label>
                <select name="tv" id="tv" onChange={(e) => setTv(e.target.value)}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="parking">Parking:</label>
                <select name="parking" id="parking" onChange={(e) => setParking(e.target.value)}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>

                <label htmlFor="elevator">Elevator:</label>
                <select name="elevator" id="elevator" onChange={(e) => setElevator(e.target.value)}>
                    <option value="true">yes</option>
                    <option value="false">no</option>
                </select>
                <Button color='violet' fluid size='large' className={"button-container"} type={"submit"} onClick={handleSubmit}>Create</Button>
            </Container>
        </>
    );
};

export default RoomCreate;