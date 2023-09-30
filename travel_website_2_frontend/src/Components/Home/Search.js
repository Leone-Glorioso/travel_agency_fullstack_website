import React, {useState} from 'react'
import './Search.css'
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"
import {DateRangePicker} from "react-date-range"
import {IconButton, Slider} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import {ApiConnector} from "../Other/ApiConnector";
import {Form} from "semantic-ui-react";
import RoomList from "../Room/RoomList";
import {NavLink} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import SearchPage from "./SearchPage";
import SearchField from "../Search/SearchField";
import {MapContainer} from "react-leaflet";
import {OpenStreetMapProvider} from "leaflet-geosearch";
import Cookies from "universal-cookie";




function Search(){

    const [startDate,setStartDate]=useState(new Date())
    const [endDate,setEndDate]=useState(new Date())
    const [latitude, setLatitude] = useState(-50.0);
    const [longitude, setLongitude] = useState(-50.0);
    const [range, setRange] = useState(100);
    const [start_numOfBeds, setStart_numOfBeds] = useState(1);
    const [end_numOfBeds, setEnd_numOfBeds] = useState(10);
    const [numOfBeds, setNumOfBeds] = useState(2);
    const navigate=useNavigate()
    const prov = new OpenStreetMapProvider();
    const cookies = new Cookies();

    const marks = [
        {
            value: 10,
            label: '10km',
        },
        {
            value: 50,
            label: '50km',
        },
        {
            value: 100,
            label: '100km',
        },
        {
            value: 200,
            label: '200km',
        },
        {
            value: 500,
            label: '500km',
        },
        {
            value: 1000,
            label: '1000km',
        },
    ];




    const handleSetRange = (event) => {
        setRange(event.target.value);
    };

    const handleSetNumOfBeds = (value) => {
        const parsedValue = parseInt(value, 10);

        // Check if the parsed value is within the allowed range
        if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 10) {
            setNumOfBeds(parsedValue)
            const value2 = (parsedValue > 1 ) ? parsedValue - 1 : parsedValue
            setStart_numOfBeds(value2);
            const value1 = (parsedValue < 10 ) ? parsedValue + 1 : parsedValue
            setEnd_numOfBeds(value1);
        }
    };
    const handleSearch = async () => {
            const first_element=1
            const last_element=20
            const flags="beds, dates, location"

            const searchRequest={
                "latitude": latitude,
                "longitude": longitude,
                "range": range,
                "start": startDate.toLocaleDateString('en-GB'),
                "end": endDate.toLocaleDateString('en-GB'),
                "start_numOfBeds": 1,
                "end_numOfBeds": 3,
                "first_element": first_element,
                "last_element": last_element,
                "flags": flags
            }

        try {
            console.log(searchRequest)
            // const start = startDate.toLocaleDateString('en-GB')
            // const end = endDate.toLocaleDateString('en-GB')
            const response = await ApiConnector.search(searchRequest);
            // console.log("response: ",  response)
            //
            // // Handle the response here
            // if (response && response.data) {
            //     // Handle the search results data
            //     console.log("Search results:", response.data);
            //     // Update your state or UI with the search results
            // } else {
            //     console.log("Empty or invalid search results.");
            //     // Handle empty or invalid search results
            // }
            cookies.set('rooms', response);
            navigate('/search-result')
        } catch (error) {
            console.error("Error searching for rooms: edw", error);
            console.log(error.response)
            // Handle the error appropriately, e.g., show an error message
        }

    };

    const setLat = (value) =>
    {
        setLatitude(value)
    }

    const setLong = (value) =>
    {
        setLongitude(value)
    }

    const pushToFlags = (value) => {
        return null
    }

    return (
        <div className={'search'}>
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

            {/* DateRangePicker component */}
            {/*<DateRangePicker*/}
            {/*    ranges={[selectionRange]}*/}
            {/*    onChange={handleSelect}*/}
            {/*    dateDisplayFormat={'dd/MM/yyyy'}*/}
            {/*></DateRangePicker>*/}
            {/*<DateRangePicker ranges={[selectionRange]} onChange={handleSelect} dateDisplayFormat={"dd/MM/yyyy"}></DateRangePicker>*/}
            {/*<h1>*/}
            {/*    Number of guests*/}
            {/*    <PeopleIcon/>*/}
            {/*</h1>*/}
            {/*<label>Number of guests:</label>*/}
            {/*<input*/}
            {/*    min={0}*/}
            {/*    value={numOfGuests}*/}
            {/*    defaultValue={2}*/}
            {/*    type={"number"}*/}
            {/*    onChange={(e)=>setNumOfGuests(e.target.value)}*/}
            {/*/>*/}
            <div className={'SearchButtons'}>
                <div className={'SearchInputs'}>
                    {/*<label>Latitude:</label>*/}
                    {/*<input*/}
                    {/*    type="number"*/}
                    {/*    step={'0.01'}*/}
                    {/*    value={latitude}*/}
                    {/*    onChange={(e) => handleSetLatitude(e.target.value)}*/}
                    {/*/>*/}
                    {/*<label>Longtitude:</label>*/}
                    {/*<input*/}
                    {/*    type="number"*/}
                    {/*    step={'0.01'}*/}
                    {/*    value={longitude}*/}
                    {/*    onChange={(e) => handleSetLongtitude(e.target.value)}*/}
                    {/*/>*/}

                    <MapContainer
                        id="map"
                        // className={classes.map}
                        // center={[51.505, -0.091]}
                        zoom={13}
                        scrollWheelZoom={false}
                    >
                        {/*<TileLayer*/}
                        {/*    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'*/}
                        {/*    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
                        {/*/>*/}
                        <SearchField
                            provider={prov}
                            showMarker={false}
                            showPopup={false}
                            popupFormat={({ query, result }) => result.label}
                            maxMarkers={3}
                            retainZoomLevel={false}
                            animateZoom={true}
                            autoClose={false}
                            searchLabel={"Enter address, please"}
                            keepResult={true}
                            setLat={setLat}
                            setLong={setLong}
                            setFlags={pushToFlags}
                        />
                    </MapContainer>

                    <label>Range:</label>
                    <Slider
                        value={range}
                        onChange={handleSetRange}
                        valueLabelDisplay="auto"
                        max={1000}
                        min={10}
                        marks={marks}
                        step={null}
                    />

                    {/*<label htmlFor="typeOfRoom">Choose type of room:</label>*/}
                    {/*/!*<select name="typeOfRoom" id="typeOfRoom" onChange={(e) => handleSetTypeOfRoom(e.target.value)} multiple>*!/*/}
                    {/*<select name="typeOfRoom" id="typeOfRoom" onChange={handleSetTypeOfRoom} multiple size="1">*/}
                    {/*    <option value="private_room">Private Room</option>*/}
                    {/*    <option value="hostel">Hostel</option>*/}
                    {/*    <option value="house">House</option>*/}
                    {/*</select>*/}

                    <label>People:</label>
                    <input
                        type="number"
                        min={1}
                        max={10}
                        value={numOfBeds}
                        onChange={(e) => handleSetNumOfBeds(e.target.value)}
                    />

                    {/*<label>End Number Of beds:</label>*/}
                    {/*<input*/}
                    {/*    type="number"*/}
                    {/*    min={1}*/}
                    {/*    max={10}*/}
                    {/*    value={end_numOfBeds}*/}
                    {/*    onChange={(e) => handleSetEndNumOfBeds(e.target.value)}*/}
                    {/*/>*/}

                    {/*<label>Start Number Of Bathrooms:</label>*/}
                    {/*<input*/}
                    {/*    type="number"*/}
                    {/*    min={1}*/}
                    {/*    max={5}*/}
                    {/*    value={start_numOfBaths}*/}
                    {/*    onChange={(e) => handleSetStartNumOfBaths(e.target.value)}*/}
                    {/*/>*/}

                    {/*<label>End Number Of Bathrooms:</label>*/}
                    {/*<input*/}
                    {/*    type="number"*/}
                    {/*    min={1}*/}
                    {/*    max={5}*/}
                    {/*    value={end_numOfBaths}*/}
                    {/*    onChange={(e) => handleSetEndNumOfBaths(e.target.value)}*/}
                    {/*/>*/}

                    {/*<label>Start Number Of Bedrooms:</label>*/}
                    {/*<input*/}
                    {/*    type="number"*/}
                    {/*    min={1}*/}
                    {/*    max={10}*/}
                    {/*    value={start_numOfBedrooms}*/}
                    {/*    onChange={(e) => handleSetStartNumOfBedrooms(e.target.value)}*/}
                    {/*/>*/}

                    {/*<label>End Number Of Bedrooms:</label>*/}
                    {/*<input*/}
                    {/*    type="number"*/}
                    {/*    min={1}*/}
                    {/*    max={10}*/}
                    {/*    value={end_numOfBedrooms}*/}
                    {/*    onChange={(e) => handleSetEndNumOfBedrooms(e.target.value)}*/}
                    {/*/>*/}

                    {/*<label htmlFor="livingroom">LivingRoom:</label>*/}
                    {/*<select name="livingroom" id="livingroom" onChange={(e) => handleSetLivingRoom(e.target.value)}>*/}
                    {/*    <option value="true">yes</option>*/}
                    {/*    <option value="false">no</option>*/}
                    {/*</select>*/}

                    {/*<label>Start area:</label>*/}
                    {/*<input*/}
                    {/*    type="number"*/}
                    {/*    value={start_area}*/}
                    {/*    onChange={(e) => handleSetStartArea(e.target.value)}*/}
                    {/*/>*/}

                    {/*<label>End area:</label>*/}
                    {/*<input*/}
                    {/*    type="number"*/}
                    {/*    value={end_area}*/}
                    {/*    onChange={(e) => handleSetEndArea(e.target.value)}*/}
                    {/*/>*/}

                    {/*<label htmlFor="smoking">Smoking:</label>*/}
                    {/*<select name="smoking" id="smoking" onChange={(e) => handleSetSmoking(e.target.value)}>*/}
                    {/*    <option value="true">yes</option>*/}
                    {/*    <option value="false">no</option>*/}
                    {/*</select>*/}

                    {/*<label htmlFor="pets">Pets:</label>*/}
                    {/*<select name="pets" id="pets" onChange={(e) => handleSetPets(e.target.value)}>*/}
                    {/*    <option value="true">yes</option>*/}
                    {/*    <option value="false">no</option>*/}
                    {/*</select>*/}

                    {/*<label htmlFor="events">Events:</label>*/}
                    {/*<select name="events" id="events" onChange={(e) => handleSetEvents(e.target.value)}>*/}
                    {/*    <option value="true">yes</option>*/}
                    {/*    <option value="false">no</option>*/}
                    {/*</select>*/}

                    {/*<label htmlFor="internet">Internet:</label>*/}
                    {/*<select name="internet" id="internet" onChange={(e) => handleSetInternet(e.target.value)}>*/}
                    {/*    <option value="true">yes</option>*/}
                    {/*    <option value="false">no</option>*/}
                    {/*</select>*/}

                    {/*<label htmlFor="cooling">Cooling:</label>*/}
                    {/*<select name="cooling" id="cooling" onChange={(e) => handleSetCooling(e.target.value)}>*/}
                    {/*    <option value="true">yes</option>*/}
                    {/*    <option value="false">no</option>*/}
                    {/*</select>*/}

                    {/*<label htmlFor="heating">Heating:</label>*/}
                    {/*<select name="heating" id="heating" onChange={(e) => handleSetHeating(e.target.value)}>*/}
                    {/*    <option value="true">yes</option>*/}
                    {/*    <option value="false">no</option>*/}
                    {/*</select>*/}

                    {/*<label htmlFor="kitchen">Kitchen:</label>*/}
                    {/*<select name="kitchen" id="kitchen" onChange={(e) => handleSetKitchen(e.target.value)}>*/}
                    {/*    <option value="true">yes</option>*/}
                    {/*    <option value="false">no</option>*/}
                    {/*</select>*/}

                    {/*<label htmlFor="tv">Tv:</label>*/}
                    {/*<select name="tv" id="tv" onChange={(e) => handleSetTV(e.target.value)}>*/}
                    {/*    <option value="true">yes</option>*/}
                    {/*    <option value="false">no</option>*/}
                    {/*</select>*/}

                    {/*<label htmlFor="parking">Parking:</label>*/}
                    {/*<select name="parking" id="parking" onChange={(e) => handleSetParking(e.target.value)}>*/}
                    {/*    <option value="true">yes</option>*/}
                    {/*    <option value="false">no</option>*/}
                    {/*</select>*/}

                    {/*<label htmlFor="elevator">Elevator:</label>*/}
                    {/*<select name="elevator" id="elevator" onChange={(e) => handleSetElevator(e.target.value)}>*/}
                    {/*    <option value="true">yes</option>*/}
                    {/*    <option value="false">no</option>*/}
                    {/*</select>*/}

                </div>

            </div>
            <IconButton onClick={handleSearch}>Search Room</IconButton>

        </div>
    )
}

export default Search