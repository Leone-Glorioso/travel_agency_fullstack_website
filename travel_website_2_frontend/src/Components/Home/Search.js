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
import {useAuth} from "../Auth/contex";




function Search(){

    const [startDate,setStartDate]=useState(new Date())
    const [endDate,setEndDate]=useState(new Date())
    const [latitude, setLatitude] = useState(-50.0);
    const [longitude, setLongitude] = useState(-50.0);
    const [range, setRange] = useState(100);
    // const [start_numOfBeds, setStart_numOfBeds] = useState(1);
    const [people, setPeople] = useState(2);
    const [numOfBeds, setNumOfBeds] = useState(2);
    const navigate=useNavigate()
    const prov = new OpenStreetMapProvider();
    const cookies = new Cookies();

    const Auth = useAuth()

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

    // const handleSetNumOfBeds = (value) => {
    //     const parsedValue = parseInt(value, 10);
    //
    //     // Check if the parsed value is within the allowed range
    //     if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 10) {
    //         setNumOfBeds(parsedValue)
    //         const value2 = (parsedValue > 1 ) ? parsedValue - 1 : parsedValue
    //         setStart_numOfBeds(value2);
    //         const value1 = (parsedValue < 10 ) ? parsedValue + 1 : parsedValue
    //         setEnd_numOfBeds(value1);
    //     }
    // };
    const handleSearch = async () => {
        try {
            const first_element=1
            const last_element=20
            const flags="beds, dates, location"

            const searchRequest={
                "latitude": latitude,
                "longitude": longitude,
                "range": range,
                "start": startDate.toLocaleDateString('en-GB'),
                "end": endDate.toLocaleDateString('en-GB'),
                "start_numOfBeds": people,
                "end_numOfBeds": people+1,
                "first_element": first_element,
                "last_element": last_element,
                "flags": flags
            }
            console.log(searchRequest)
            let response = []
            if(Auth.userIsAuthenticated())
                response = await ApiConnector.searchAuth(searchRequest, Auth.getUser().user);
            else
                response = await ApiConnector.search(searchRequest)
            cookies.set('rooms', response);
            console.log(response)
            navigate('/search-result')
        } catch (error) {
            console.error("Error searching for rooms: edw", error);
            console.log(error.response)
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
            <div className={'SearchButtons'}>
                <div className={'SearchInputs'}>

                    <MapContainer
                        id="map"
                        zoom={13}
                        scrollWheelZoom={false}
                    >
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


                    <label>People:</label>
                    <input
                        type="number"
                        min={1}
                        max={10}
                        value={numOfBeds}
                        onChange={(e) => setPeople(e.target.value)}
                    />


                </div>

            </div>
            <IconButton onClick={handleSearch}>Search Room</IconButton>

        </div>
    )
}

export default Search