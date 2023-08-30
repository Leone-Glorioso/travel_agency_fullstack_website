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
    const [latitude,setLatitude]=useState(-30.0)

    const selectionRange={
        startDate:startDate,
        endDate:endDate,
        key:"selection"
    }

    function handleSelect(ranges){
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const handleSearch = async () => {
        const searchRequest = {
            latitude: -50.0,
            longitude: -50.0,
            range: 10,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            typeofroom: "private_room",
            start_numOfBeds: 1,
            end_numOfBeds: 10,
            start_numOfBaths: 1,
            end_numOfBaths: 10,
            start_numOfBedrooms: 1,
            end_numOfBedrooms: 10,
            livingRoom: true,
            start_area: 100,
            end_area: 1000,
            smoking: true,
            pets: true,
            events: true,
            internet: true,
            cooling: true,
            heating: true,
            kitchen: true,
            tv: true,
            parking: true,
            elevator: true,
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
                defaultValue={2}
                type={"number"}
                onChange={(e)=>setNumOfGuests(e.target.value)}
            />

            {/*<button onClick={() => console.log("Latitude:", -50.0)}>Latitude</button>*/}
            {/*<button onClick={() => console.log("Latitude:", -50.0)}>Latitude</button>*/}
            {/*<button onClick={() => console.log("Longitude:", -50.0)}>Longitude</button>*/}
            {/*<button onClick={() => console.log("Range:", 10)}>Range</button>*/}
            {/*<button onClick={() => console.log("Start Date:", startDate.toISOString())}>Start Date</button>*/}
            {/*<button onClick={() => console.log("End Date:", endDate.toISOString())}>End Date</button>*/}
            {/*<button onClick={() => console.log("Type of Room:", "private_room")}>Type of Room</button>*/}
            {/*<button onClick={() => console.log("Start Number of Beds:", 1)}>Start Number of Beds</button>*/}
            {/*<button onClick={() => console.log("End Number of Beds:", 10)}>End Number of Beds</button>*/}
            {/*<button onClick={() => console.log("Start Number of Bathrooms:", 1)}>Start Number of Bathrooms</button>*/}
            {/*<button onClick={() => console.log("End Number of Bathrooms:", 10)}>End Number of Bathrooms</button>*/}
            {/*<button onClick={() => console.log("Start Number of Bedrooms:", 1)}>Start Number of Bedrooms</button>*/}
            {/*<button onClick={() => console.log("End Number of Bedrooms:", 10)}>End Number of Bedrooms</button>*/}
            {/*<button onClick={() => console.log("Living Room:", true)}>Living Room</button>*/}
            {/*<button onClick={() => console.log("Start Area:", 100)}>Start Area</button>*/}
            {/*<button onClick={() => console.log("End Area:", 1000)}>End Area</button>*/}
            {/*<button onClick={() => console.log("Smoking:", true)}>Smoking</button>*/}
            {/*<button onClick={() => console.log("Pets:", true)}>Pets</button>*/}
            {/*<button onClick={() => console.log("Events:", true)}>Events</button>*/}
            {/*<button onClick={() => console.log("Internet:", true)}>Internet</button>*/}
            {/*<button onClick={() => console.log("Cooling:", true)}>Cooling</button>*/}
            {/*<button onClick={() => console.log("Heating:", true)}>Heating</button>*/}
            {/*<button onClick={() => console.log("Kitchen:", true)}>Kitchen</button>*/}
            {/*<button onClick={() => console.log("TV:", true)}>TV</button>*/}
            {/*<button onClick={() => console.log("Parking:", true)}>Parking</button>*/}
            {/*<button onClick={() => console.log("Elevator:", true)}>Elevator</button>*/}
            <IconButton onClick={handleSearch}>Search Room</IconButton>

        </div>
    )
}

export default Search