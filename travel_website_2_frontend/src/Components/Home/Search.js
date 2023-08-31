import React, {useState} from 'react'
import './Search.css'
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"
import {DateRangePicker} from "react-date-range"
import {IconButton} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import {ApiConnector} from "../Other/ApiConnector";



function Search(){

    const [startDate,setStartDate]=useState(new Date())
    const [endDate,setEndDate]=useState(new Date())
    const [numOfGuests,setNumOfGuests]=useState(2)
    const [latitude, setLatitude] = useState(-50.0);
    const [longitude, setLongitude] = useState(-50.0);
    const [range, setRange] = useState(10);
    const [typeOfRoom, setTypeOfRoom] = useState("private_room");
    const [startNumOfBeds, setStartNumOfBeds] = useState(1);
    const [endNumOfBeds, setEndNumOfBeds] = useState(10);
    const [startNumOfBaths, setStartNumOfBaths] = useState(1);
    const [endNumOfBaths, setEndNumOfBaths] = useState(10);
    const [startNumOfBedrooms, setStartNumOfBedrooms] = useState(1);
    const [endNumOfBedrooms, setEndNumOfBedrooms] = useState(10);
    const [livingRoom, setLivingRoom] = useState(true);
    const [startArea, setStartArea] = useState(100);
    const [endArea, setEndArea] = useState(1000);
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
        startDate:startDate,
        endDate:endDate,
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
        setTypeOfRoom(value);
    };

    const handleSetStartNumOfBeds = (value) => {
        setStartNumOfBeds(value);
    };

    const handleSetEndNumOfBeds = (value) => {
        setEndNumOfBeds(value);
    };

    const handleSetStartNumOfBaths = (value) => {
        setStartNumOfBaths(value);
    };

    const handleSetEndNumOfBaths = (value) => {
        setEndNumOfBaths(value);
    };

    const handleSetStartNumOfBedrooms = (value) => {
        setStartNumOfBedrooms(value);
    };

    const handleSetEndNumOfBedrooms = (value) => {
        setEndNumOfBedrooms(value);
    };

    const handleSetLivingRoom = (value) => {
        setLivingRoom(value);
    };

    const handleSetStartArea = (value) => {
        setStartArea(value);
    };

    const handleSetEndArea = (value) => {
        setEndArea(value);
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
        const searchRequest = {
            latitude: latitude,
            longitude: longitude,
            range:range,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            typeofroom: typeOfRoom,
            start_numOfBeds: startNumOfBeds,
            end_numOfBeds:endNumOfBeds,
            start_numOfBaths: startNumOfBaths,
            end_numOfBaths: endNumOfBaths,
            start_numOfBedrooms: startNumOfBedrooms,
            end_numOfBedrooms:endNumOfBedrooms,
            livingRoom:livingRoom,
            start_area: startArea,
            end_area: endArea,
            smoking: smoking,
            pets: pets,
            events: events,
            internet: internet,
            cooling: cooling,
            heating: heating,
            kitchen: kitchen,
            tv: tv,
            parking: parking,
            elevator: elevator,
            first_element: 1,
            last_element: 1,
            flags: "beds,bedrooms,baths,dates,location,area,livingRoom,smoking,pets,events,internet,cooling,heating,kitchen,tv,parking,elevator"
        };

        try {
            console.log(1)
            console.log(searchRequest)
            const response = await ApiConnector.search(searchRequest);

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
            console.error("Error searching for rooms:", error);
            // Handle the error appropriately, e.g., show an error message
        }
    };

    return (
        <div className={'search'}>
            <DateRangePicker ranges={[selectionRange]} onChange={handleSelect}></DateRangePicker>
            <h1>
                Number of guests
                <PeopleIcon/>
            </h1>
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
                        value={latitude}
                        onChange={(e) => handleSetLatitude(e.target.value)}
                    />
                    <input
                        type="number"
                        value={longitude}
                        onChange={(e) => handleSetLongtitude(e.target.value)}
                    />
                </div>

                <button onClick={() => console.log("Range:", 10)}>Range</button>
                <button onClick={() => console.log("Start Date:", startDate.toISOString())}>Start Date</button>
                <button onClick={() => console.log("End Date:", endDate.toISOString())}>End Date</button>
                <button onClick={() => console.log("Type of Room:", "private_room")}>Type of Room</button>
                <button onClick={() => console.log("Start Number of Beds:", 1)}>Start Number of Beds</button>
                <button onClick={() => console.log("End Number of Beds:", 10)}>End Number of Beds</button>
                <button onClick={() => console.log("Start Number of Bathrooms:", 1)}>Start Number of Bathrooms</button>
                <button onClick={() => console.log("End Number of Bathrooms:", 10)}>End Number of Bathrooms</button>
                <button onClick={() => console.log("Start Number of Bedrooms:", 1)}>Start Number of Bedrooms</button>
                <button onClick={() => console.log("End Number of Bedrooms:", 10)}>End Number of Bedrooms</button>
                <button onClick={() => console.log("Living Room:", true)}>Living Room</button>
                <button onClick={() => console.log("Start Area:", 100)}>Start Area</button>
                <button onClick={() => console.log("End Area:", 1000)}>End Area</button>
                <button onClick={() => console.log("Smoking:", true)}>Smoking</button>
                <button onClick={() => console.log("Pets:", true)}>Pets</button>
                <button onClick={() => console.log("Events:", true)}>Events</button>
                <button onClick={() => console.log("Internet:", true)}>Internet</button>
                <button onClick={() => console.log("Cooling:", true)}>Cooling</button>
                <button onClick={() => console.log("Heating:", true)}>Heating</button>
                <button onClick={() => console.log("Kitchen:", true)}>Kitchen</button>
                <button onClick={() => console.log("TV:", true)}>TV</button>
                <button onClick={() => console.log("Parking:", true)}>Parking</button>
                <button onClick={() => console.log("Elevator:", true)}>Elevator</button>
            </div>
            <IconButton onClick={handleSearch}>Search Room</IconButton>

        </div>
    )
}

export default Search