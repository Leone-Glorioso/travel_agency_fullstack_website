import React, {useState} from 'react';
import {Button, Container} from "semantic-ui-react";
import {ApiConnector} from "../Other/ApiConnector";
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import {Slider, Typography} from "@mui/material";
import TripleToggleSwitch from "./TripleToggleSwitch";
import SearchField from "./SearchField";
import {MapContainer, TileLayer} from "react-leaflet";

// const useStyles = makeStyles(() => ({
//     map: { height: "300px" }
// }));

const FilterWindow = (props) => {
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

    // const classes = useStyles();
    const prov = new OpenStreetMapProvider();


    const labels = {
        left: {
            title: "No",
            value: false
        },
        right: {
            title: "Yes",
            value: true
        },
        center: {
            title: "O",
            value: null
        }
    };

    const rangeBedSelector = (event, newValue) =>
    {
        setStart_numOfBeds(newValue[0])
        setEnd_numOfBeds(newValue[1])
    }

    const rangeBedroomSelector = (event, newValue) =>
    {
        setStart_numOfBedrooms(newValue[0])
        setEnd_numOfBedrooms(newValue[1])
    }

    const rangeBathSelector = (event, newValue) =>
    {
        setStart_numOfBaths(newValue[0])
        setEnd_numOfBaths(newValue[1])
    }

    const rangeAreaSelector = (event, newValue) =>
    {
        setStart_area(newValue[0])
        setEnd_area(newValue[1])
    }

    const handleChangeLivingRoom = (value) =>
    {
        if(value != null)
            setLivingRoom(value)
    }

    const handleChangeCooling = (value) =>
    {
        if(value != null)
            setCooling(value)
    }

    const handleChangeHeating = (value) =>
    {
        if(value != null)
            setHeating(value)
    }

    const handleChangeTV = (value) =>
    {
        if(value != null)
            setTV(value)
    }

    const handleChangeParking = (value) =>
    {
        if(value != null)
            setParking(value)
    }

    const handleChangeSmoking = (value) =>
    {
        if(value != null)
            setSmoking(value)
    }

    const handleChangePets = (value) =>
    {
        if(value != null)
            setPets(value)
    }

    const handleChangeElevator = (value) =>
    {
        if(value != null)
            setElevator(value)
    }

    const handleChangeKitchen = (value) =>
    {
        if(value != null)
            setKitchen(value)
    }

    const handleChangeInternet = (value) =>
    {
        if(value != null)
            setInternet(value)
    }

    const handleChangeEvents = (value) =>
    {
        if(value != null)
            setEvents(value)
    }

    const handleSetTypeOfRoom = (e) =>
    {
        let options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setTypeofroom(value.join(", "));
    };

    const eventHandler = (e) =>
    {
        const marker = e.target.markers[0]
        setLatitude(marker.y)
        setLongitude(marker.x)
    }

    const handleSetRange = (value) =>
    {
        setRange(value)
    }


    const handleSubmit = async () =>
    {
        const first_element=1
        const last_element=20
        const flags="beds, bedrooms, baths, dates, location, area, livingRoom, smoking, pets, events, internet, cooling, heating, kitchen, tv, parking, elevator, typeofroom"

        const searchRequest={
            "latitude": latitude,
            "longitude": longitude,
            "range": range,
            "start": startDate.toLocaleDateString('en-GB'),
            "end": endDate.toLocaleDateString('en-GB'),
            "typeofroom": typeofroom,
            "start_numOfBeds": start_numOfBeds,
            "end_numOfBeds": end_numOfBeds,
            "start_numOfBaths": start_numOfBaths,
            "end_numOfBaths": end_numOfBaths,
            "start_numOfBedrooms": start_numOfBedrooms,
            "end_numOfBedrooms": end_numOfBedrooms,
            "livingRoom": livingRoom,
            "start_area": start_area,
            "end_area": end_area,
            "smoking": smoking,
            "pets": pets,
            "events": events,
            "internet": internet,
            "cooling": cooling,
            "heating": heating,
            "kitchen": kitchen,
            "tv": tv,
            "parking": parking,
            "elevator": elevator,
            "first_element": first_element,
            "last_element": last_element,
            "flags": flags
        }

        try {
            const response = ApiConnector.search(searchRequest);
        }
        catch (error)
        {
            console.log(error)
        }
    }

    return (
        <div>
            {/*<MapContainer*/}
            {/*    id="map"*/}
            {/*    // className={classes.map}*/}
            {/*    center={[51.505, -0.091]}*/}
            {/*    zoom={13}*/}
            {/*    scrollWheelZoom={false}*/}
            {/*>*/}
            {/*    <TileLayer*/}
            {/*        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'*/}
            {/*        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
            {/*    />*/}
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
            {/*        eventHandler={eventHandler}*/}
            {/*    />*/}
            {/*</MapContainer>*/}
            <Typography id="range-sliderBed" gutterBottom>
                Select Range:
            </Typography>
            <Slider
                value={range}
                onChange={handleSetRange}
                valueLabelDisplay="auto"
            />
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
            <h4>
                Number of guests
            </h4>
            <label>Number of guests:</label>
            <input
                min={0}
                value={numOfGuests}
                defaultValue={2}
                type={"number"}
                onChange={(e)=>setNumOfGuests(e.target.value)}
            />
            <label htmlFor="typeOfRoom">Choose type of room:</label>
            {/*<select name="typeOfRoom" id="typeOfRoom" onChange={(e) => handleSetTypeOfRoom(e.target.value)} multiple>*/}
            <select name="typeOfRoom" id="typeOfRoom" onChange={handleSetTypeOfRoom} multiple size="1">
                <option value="private_room">Private Room</option>
                <option value="hostel">Hostel</option>
                <option value="house">House</option>
            </select>
            <Typography id="range-sliderBed" gutterBottom>
                Select Bed Range:
            </Typography>
            <Slider
                value={[start_numOfBeds, end_numOfBeds]}
                onChange={rangeBedSelector}
                valueLabelDisplay="auto"
                max={10}
                min={1}
            />
            <Typography id="range-sliderBedroom" gutterBottom>
                Select Bedroom Range:
            </Typography>
            <Slider
                value={[start_numOfBedrooms, end_numOfBedrooms]}
                onChange={rangeBedroomSelector}
                valueLabelDisplay="auto"
                max={10}
                min={1}
            />
            <Typography id="range-sliderBath" gutterBottom>
                Select Bath Range:
            </Typography>
            <Slider
                value={[start_numOfBaths, end_numOfBaths]}
                onChange={rangeBathSelector}
                valueLabelDisplay="auto"
                max={10}
                min={1}
            />
            <Typography id="range-sliderArea" gutterBottom>
                Select Area Range:
            </Typography>
            <Slider
                value={[start_area, end_area]}
                max={2000}
                min={1}
                onChange={rangeAreaSelector}
                valueLabelDisplay="auto"
            />
            <Typography id="1" gutterBottom>
                Living Room:
            </Typography>
            <TripleToggleSwitch labels={labels} onChange={handleChangeLivingRoom} />
            <Typography id="2" gutterBottom>
                Elevator:
            </Typography>
            <TripleToggleSwitch labels={labels} onChange={handleChangeElevator} />
            <Typography id="3" gutterBottom>
                Smoking:
            </Typography>
            <TripleToggleSwitch labels={labels} onChange={handleChangeSmoking} />
            <Typography id="4" gutterBottom>
                Pets:
            </Typography>
            <TripleToggleSwitch labels={labels} onChange={handleChangePets} />
            <Typography id="5" gutterBottom>
                Heating:
            </Typography>
            <TripleToggleSwitch labels={labels} onChange={handleChangeHeating} />
            <Typography id="6" gutterBottom>
                Cooling:
            </Typography>
            <TripleToggleSwitch labels={labels} onChange={handleChangeCooling} />
            <Typography id="7" gutterBottom>
                TV:
            </Typography>
            <TripleToggleSwitch labels={labels} onChange={handleChangeTV} />
            <Typography id="8" gutterBottom>
                Events:
            </Typography>
            <TripleToggleSwitch labels={labels} onChange={handleChangeEvents} />
            <Typography id="9" gutterBottom>
                Parking:
            </Typography>
            <TripleToggleSwitch labels={labels} onChange={handleChangeParking} />
            <Typography id="10" gutterBottom>
                Internet:
            </Typography>
            <TripleToggleSwitch labels={labels} onChange={handleChangeInternet} />
            <Typography id="11" gutterBottom>
                Kitchen:
            </Typography>
            <TripleToggleSwitch labels={labels} onChange={handleChangeKitchen} />


            <Button type={"submit"} onClick={handleSubmit} />
        </div>
    );
};

export default FilterWindow;