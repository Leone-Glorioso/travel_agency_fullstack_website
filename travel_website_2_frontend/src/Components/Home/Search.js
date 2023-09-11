import React, {useState} from 'react'
import './Search.css'
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"
import {DateRangePicker} from "react-date-range"
import {IconButton} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import {ApiConnector} from "../Other/ApiConnector";
import {Form} from "semantic-ui-react";
import RoomList from "../Room/RoomList";



function Search(){

    const [startDate,setStartDate]=useState(new Date())
    const [endDate,setEndDate]=useState(new Date())
    const [numOfGuests,setNumOfGuests]=useState(2)
    const [latitude, setLatitude] = useState(-50.0);
    const [longitude, setLongitude] = useState(-50.0);
    const [range, setRange] = useState(10);
    const [typeofroom, setTypeofroom] = useState("private_room");
    const [start_numOfBeds, setStart_numOfBeds] = useState(1);
    const [end_numOfBeds, setEnd_numOfBeds] = useState(10);
    const [start_numOfBaths, setStart_numOfBaths] = useState(1);
    const [end_numOfBaths, setEnd_numOfBaths] = useState(5);
    const [start_numOfBedrooms, setStart_numOfBedrooms] = useState(1);
    const [end_numOfBedrooms, setEnd_numOfBedrooms] = useState(10);
    const [livingRoom, setLivingRoom] = useState(true);
    const [start_area, setStart_area] = useState(100);
    const [end_area, setEnd_area] = useState(1000);
    const [smoking, setSmoking] = useState(true);
    const [pets, setPets] = useState(true);
    const [events, setEvents] = useState(true);
    const [internet, setInternet] = useState(true);
    const [cooling, setCooling] = useState(true);
    const [heating, setHeating] = useState(true);
    const [kitchen, setKitchen] = useState(true);
    const [tv, setTV] = useState(true);
    const [parking, setParking] = useState(true);
    const [elevator, setElevator] = useState(true);



    const selectionRange={
        startDate:new Date(),
        endDate:new Date(),
        key:"selection"
    }

    function handleSelect(ranges){
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const handleSetLatitude=(value) => {
        console.log(value)
        setLatitude(value)
    }

    const handleSetLongtitude=(value) =>{
        console.log(value)
        setLongitude(value)
    }

    const handleSetRange = (value) => {
        setRange(value);
    };

    const handleSetTypeOfRoom = (value) => {
        setTypeofroom(value);
    };

    const handleSetStartNumOfBeds = (value) => {
        const parsedValue = parseInt(value, 10);

        // Check if the parsed value is within the allowed range
        if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 10) {
            setStart_numOfBeds(parsedValue);
        }
    };

    const handleSetEndNumOfBeds = (value) => {
        const parsedValue = parseInt(value, 10);

        // Check if the parsed value is within the allowed range
        if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 10) {
            setEnd_numOfBeds(parsedValue);
        }
    };

    const handleSetStartNumOfBaths = (value) => {
        const parsedValue = parseInt(value, 10);

        // Check if the parsed value is within the allowed range
        if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 5) {
            setStart_numOfBaths(parsedValue);
        }
    };

    const handleSetEndNumOfBaths = (value) => {
        const parsedValue = parseInt(value, 10);

        // Check if the parsed value is within the allowed range
        if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 5) {
            setEnd_numOfBaths(parsedValue);
        }
    };

    const handleSetStartNumOfBedrooms = (value) => {
        const parsedValue = parseInt(value, 10);

        // Check if the parsed value is within the allowed range
        if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 10) {
            setStart_numOfBedrooms(parsedValue);
        }
    };

    const handleSetEndNumOfBedrooms = (value) => {
        const parsedValue = parseInt(value, 10);

        // Check if the parsed value is within the allowed range
        if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 10) {
            setEnd_numOfBedrooms(parsedValue);
        }
    };

    const handleSetLivingRoom = (value) => {
        setLivingRoom(value);
    };

    const handleSetStartArea = (value) => {
        setStart_area(value);
    };

    const handleSetEndArea = (value) => {
        setEnd_area(value);
    };

    const handleSetSmoking = (value) => {
        setSmoking(value);
    };

    const handleSetPets = (value) => {
        setPets(value);
    };

    const handleSetEvents = (value) => {
        setEvents(value);
    };

    const handleSetInternet = (value) => {
        setInternet(value);
    };

    const handleSetCooling = (value) => {
        setCooling(value);
    };

    const handleSetHeating = (value) => {
        setHeating(value);
    };

    const handleSetKitchen = (value) => {
        setKitchen(value);
    };

    const handleSetTV = (value) => {
        setTV(value);
    };

    const handleSetParking = (value) => {
        setParking(value);
    };

    const handleSetElevator = (value) => {
        setElevator(value);
    };


    const handleSearch = async () => {
        // const searchRequest = {
        //     latitude: latitude,
        //     longitude: longitude,
        //     range:range,
        //     start: startDate.toISOString(),
        //     end: endDate.toISOString(),
        //     typeofroom: typeOfRoom,
        //     start_numOfBeds: startNumOfBeds,
        //     end_numOfBeds:endNumOfBeds,
        //     start_numOfBaths: startNumOfBaths,
        //     end_numOfBaths: endNumOfBaths,
        //     start_numOfBedrooms: startNumOfBedrooms,
        //     end_numOfBedrooms:endNumOfBedrooms,
        //     livingRoom:livingRoom,
        //     start_area: startArea,
        //     end_area: endArea,
        //     smoking: smoking,
        //     pets: pets,
        //     events: events,
        //     internet: internet,
        //     cooling: cooling,
        //     heating: heating,
        //     kitchen: kitchen,
        //     tv: tv,
        //     parking: parking,
        //     elevator: elevator,
        //     first_element: 1,
        //     last_element: 20,
        //     flags: "beds, bedrooms, baths, dates, location, area, livingRoom, smoking, pets, events, internet, cooling, heating, kitchen, tv, parking, elevator"
        // };
            const first_element=1
            const last_element=20
            const flags="beds, bedrooms, baths, dates, location, area, livingRoom, smoking, pets, events, internet, cooling, heating, kitchen, tv, parking, elevator"

            const searchRequest={
                    latitude,
                    longitude,
                    range,
                    start:startDate.toLocaleDateString('en-GB'),
                    end:endDate.toLocaleDateString('en-GB'),
                    typeofroom,
                    start_numOfBeds,
                    end_numOfBeds,
                    start_numOfBaths,
                    end_numOfBaths,
                    start_numOfBedrooms,
                    end_numOfBedrooms,
                    livingRoom,
                    start_area,
                    end_area,
                    smoking,
                    pets,
                    events,
                    internet,
                    cooling,
                    heating,
                    kitchen,
                    tv,
                    parking,
                    elevator,
                    first_element,
                    last_element,
                    flags
            }

        try {
            console.log(1)
            console.log(searchRequest)
            const response = await ApiConnector.search( searchRequest);


            // Handle the response here
            if (response && response.data) {
                // Handle the search results data
                console.log("Search results:", response.data);
                // Update your state or UI with the search results
            } else {
                console.log("Empty or invalid search results.");
                // Handle empty or invalid search results
            }
        } catch (error) {
            console.error("Error searching for rooms: edw", error);
            console.log(error.response)
            // Handle the error appropriately, e.g., show an error message
        }

    };

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
            <h1>
                Number of guests
                <PeopleIcon/>
            </h1>
            <label>Number of guests:</label>
            <input
                min={0}
                value={numOfGuests}
                defaultValue={2}
                type={"number"}
                onChange={(e)=>setNumOfGuests(e.target.value)}
            />
            <div className={'SearchButtons'}>
                <div className={'SearchInputs'}>
                    <label>Latitude:</label>
                    <input
                        type="number"
                        step={'0.01'}
                        value={latitude}
                        onChange={(e) => handleSetLatitude(e.target.value)}
                    />
                    <label>Longtitude:</label>
                    <input
                        type="number"
                        step={'0.01'}
                        value={longitude}
                        onChange={(e) => handleSetLongtitude(e.target.value)}
                    />
                    <label>Range:</label>
                    <input
                        type="number"
                        value={range}
                        onChange={(e) => handleSetRange(e.target.value)}
                    />

                    <label htmlFor="typeOfRoom">Choose type of room:</label>
                    <select name="typeOfRoom" id="typeOfRoom" onChange={(e) => handleSetTypeOfRoom(e.target.value)}>
                        <option value="private_room">Private Room</option>
                        <option value="hostel">Hostel</option>
                        <option value="hotel">Hotel</option>
                    </select>

                    <label>Start Number Of beds:</label>
                    <input
                        type="number"
                        min={1}
                        max={10}
                        value={start_numOfBeds}
                        onChange={(e) => handleSetStartNumOfBeds(e.target.value)}
                    />

                    <label>End Number Of beds:</label>
                    <input
                        type="number"
                        min={1}
                        max={10}
                        value={end_numOfBeds}
                        onChange={(e) => handleSetEndNumOfBeds(e.target.value)}
                    />

                    <label>Start Number Of Bathrooms:</label>
                    <input
                        type="number"
                        min={1}
                        max={5}
                        value={start_numOfBaths}
                        onChange={(e) => handleSetStartNumOfBaths(e.target.value)}
                    />

                    <label>End Number Of Bathrooms:</label>
                    <input
                        type="number"
                        min={1}
                        max={5}
                        value={end_numOfBaths}
                        onChange={(e) => handleSetEndNumOfBaths(e.target.value)}
                    />

                    <label>Start Number Of Bedrooms:</label>
                    <input
                        type="number"
                        min={1}
                        max={10}
                        value={start_numOfBedrooms}
                        onChange={(e) => handleSetStartNumOfBedrooms(e.target.value)}
                    />

                    <label>End Number Of Bedrooms:</label>
                    <input
                        type="number"
                        min={1}
                        max={10}
                        value={end_numOfBedrooms}
                        onChange={(e) => handleSetEndNumOfBedrooms(e.target.value)}
                    />

                    <label htmlFor="livingroom">LivingRoom:</label>
                    <select name="livingroom" id="livingroom" onChange={(e) => handleSetLivingRoom(e.target.value)}>
                        <option value="true">yes</option>
                        <option value="false">no</option>
                    </select>

                    <label>Start area:</label>
                    <input
                        type="number"
                        value={start_area}
                        onChange={(e) => handleSetStartArea(e.target.value)}
                    />

                    <label>End area:</label>
                    <input
                        type="number"
                        value={end_area}
                        onChange={(e) => handleSetEndArea(e.target.value)}
                    />

                    <label htmlFor="smoking">Smoking:</label>
                    <select name="smoking" id="smoking" onChange={(e) => handleSetSmoking(e.target.value)}>
                        <option value="true">yes</option>
                        <option value="false">no</option>
                    </select>

                    <label htmlFor="pets">Pets:</label>
                    <select name="pets" id="pets" onChange={(e) => handleSetPets(e.target.value)}>
                        <option value="true">yes</option>
                        <option value="false">no</option>
                    </select>

                    <label htmlFor="events">Events:</label>
                    <select name="events" id="events" onChange={(e) => handleSetEvents(e.target.value)}>
                        <option value="true">yes</option>
                        <option value="false">no</option>
                    </select>

                    <label htmlFor="internet">Internet:</label>
                    <select name="internet" id="internet" onChange={(e) => handleSetInternet(e.target.value)}>
                        <option value="true">yes</option>
                        <option value="false">no</option>
                    </select>

                    <label htmlFor="cooling">Cooling:</label>
                    <select name="cooling" id="cooling" onChange={(e) => handleSetCooling(e.target.value)}>
                        <option value="true">yes</option>
                        <option value="false">no</option>
                    </select>

                    <label htmlFor="heating">Heating:</label>
                    <select name="heating" id="heating" onChange={(e) => handleSetHeating(e.target.value)}>
                        <option value="true">yes</option>
                        <option value="false">no</option>
                    </select>

                    <label htmlFor="kitchen">Kitchen:</label>
                    <select name="kitchen" id="kitchen" onChange={(e) => handleSetKitchen(e.target.value)}>
                        <option value="true">yes</option>
                        <option value="false">no</option>
                    </select>

                    <label htmlFor="tv">Tv:</label>
                    <select name="tv" id="tv" onChange={(e) => handleSetTV(e.target.value)}>
                        <option value="true">yes</option>
                        <option value="false">no</option>
                    </select>

                    <label htmlFor="parking">Parking:</label>
                    <select name="parking" id="parking" onChange={(e) => handleSetParking(e.target.value)}>
                        <option value="true">yes</option>
                        <option value="false">no</option>
                    </select>

                    <label htmlFor="elevator">Elevator:</label>
                    <select name="elevator" id="elevator" onChange={(e) => handleSetElevator(e.target.value)}>
                        <option value="true">yes</option>
                        <option value="false">no</option>
                    </select>

                </div>

            </div>
            <IconButton onClick={handleSearch}>Search Room</IconButton>

        </div>
    )
}

export default Search