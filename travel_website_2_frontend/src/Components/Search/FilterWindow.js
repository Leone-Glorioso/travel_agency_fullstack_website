import React, {useState} from 'react';
import {Button, Container, Table} from "semantic-ui-react";
import {ApiConnector} from "../Other/ApiConnector";
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import {Slider, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import TripleToggleSwitch from "./TripleToggleSwitch";
import SearchField from "./SearchField";
import {MapContainer, TileLayer} from "react-leaflet";
import './filterComponent.css';
import './toggle.css';
import './toggle_2.css'
import TableOfChosenElements from "./TableOfChosenElements";

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
    const [flags, setFlags] = useState([]);



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
            title: "",
            value: null
        }
    };

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

    const handleSetRanges = (event, newValue) =>{
        setRange(newValue)
    }

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

    const handleChangeLivingRoom = (event) =>
    {
        if(event.target.value !== 'none')
        {
            setLivingRoom(event.target.value === 'true')
            if(flags.includes('livingRoom') == false)
                flags.push('livingRoom')
        }
        else
        {
            if(flags.includes('livingRoom') == true)
                flags.splice(flags.indexOf('livingRoom'), 1)
        }
        console.log("entered")
        console.log(flags)
        console.log(livingRoom)
    }

    const handleChangeCooling = (event) =>
    {
        if(event.target.value !== 'none')
        {
            setCooling(event.target.value === 'true')
            if(flags.includes('cooling') == false)
                flags.push('cooling')
        }
        else
        {
            if(flags.includes('cooling') == true)
                flags.splice(flags.indexOf('cooling'), 1)
        }
    }

    const handleChangeHeating = (event) =>
    {
        if(event.target.value !== 'none')
        {
            setHeating(event.target.value === 'true')
            if(flags.includes('heating') == false)
                flags.push('heating')
        }
        else
        {
            if(flags.includes('heating') == true)
                flags.splice(flags.indexOf('heating'), 1)
        }
    }

    const handleChangeTV = (event) =>
    {
        if(event.target.value !== 'none')
        {
            setTV(event.target.value === 'true')
            if(flags.includes('tv') == false)
                flags.push('tv')
        }
        else
        {
            if(flags.includes('tv') == true)
                flags.splice(flags.indexOf('tv'), 1)
        }
    }

    const handleChangeParking = (event) =>
    {
        if(event.target.value !== 'none')
        {
            setParking(event.target.value === 'true')
            if(flags.includes('parking') == false)
                flags.push('parking')
        }
        else
        {
            if(flags.includes('parking') == true)
                flags.splice(flags.indexOf('parking'), 1)
        }
    }

    const handleChangeSmoking = (event) =>
    {
        if(event.target.value !== 'none')
        {
            setSmoking(event.target.value === 'true')
            if(flags.includes('smoking') == false)
                flags.push('smoking')
        }
        else
        {
            if(flags.includes('smoking') == true)
                flags.splice(flags.indexOf('smoking'), 1)
        }
    }

    const handleChangePets = (event) =>
    {
        if(event.target.value !== 'none')
        {
            setPets(event.target.value === 'true')
            if(flags.includes('pets') == false)
                flags.push('pets')
        }
        else
        {
            if(flags.includes('pets') == true)
                flags.splice(flags.indexOf('pets'), 1)
        }
    }

    const handleChangeElevator = (event) =>
    {
        if(event.target.value !== 'none')
        {
            setElevator(event.target.value === 'true')
            if(flags.includes('elevator') == false)
                flags.push('elevator')
        }
        else
        {
            if(flags.includes('elevator') == true)
                flags.splice(flags.indexOf('elevator'), 1)
        }
    }

    const handleChangeKitchen = (event) =>
    {
        if(event.target.value !== 'none')
        {
            setKitchen(event.target.value === 'true')
            if(flags.includes('kitchen') == false)
                flags.push('kitchen')
        }
        else
        {
            if(flags.includes('kitchen') == true)
                flags.splice(flags.indexOf('kitchen'), 1)
        }
    }

    const handleChangeInternet = (event) =>
    {
        if(event.target.value !== 'none')
        {
            setInternet(event.target.value === 'true')
            if(flags.includes('internet') == false)
                flags.push('internet')
        }
        else
        {
            if(flags.includes('internet') == true)
                flags.splice(flags.indexOf('internet'), 1)
        }
    }

    const handleChangeEvents = (event) =>
    {
        if(event.target.value !== 'none')
        {
            setEvents(event.target.value === 'true')
            if(flags.includes('events') === false)
                flags.push('events')
        }
        else
        {
            if(flags.includes('events') === true)
                flags.splice(flags.indexOf('events'), 1)
        }
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
        const flags_2= flags.join(', ')

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
            "flags": flags_2
        }

        try {
            const response = ApiConnector.search(searchRequest);
            console.log(searchRequest)
        }
        catch (error)
        {
            console.log(error)
        }
    }

   let dictionary = {
        'smoking': smoking,
        'pets': pets,
        'events': events,
        'internet': internet,
        'cooling': cooling,
        'heating': heating,
        'kitchen': kitchen,
        'tv': tv,
        'parking': parking,
        'elevator': elevator,
        'livingRoom': livingRoom
    }

    const update = () => {
        dictionary = {
            'smoking': smoking,
            'pets': pets,
            'events': events,
            'internet': internet,
            'cooling': cooling,
            'heating': heating,
            'kitchen': kitchen,
            'tv': tv,
            'parking': parking,
            'elevator': elevator,
            'livingRoom': livingRoom
        }
    }

    return (
        <div className="window">
            <MapContainer
                id="map"
                // className={classes.map}
                center={[51.505, -0.091]}
                zoom={13}
                scrollWheelZoom={false}
            >
                {/*<TileLayer*/}
                {/*    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'*/}
                {/*    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
                {/*/>*/}
                <SearchField
                    provider={prov}
                    showMarker={true}
                    showPopup={false}
                    popupFormat={({ query, result }) => result.label}
                    maxMarkers={3}
                    retainZoomLevel={false}
                    animateZoom={true}
                    autoClose={false}
                    searchLabel={"Enter address, please"}
                    keepResult={true}
                    eventHandler={eventHandler}
                />
            </MapContainer>
            <Typography id="range-sliderBed" gutterBottom>
                Select Range:
            </Typography>
            <Slider
                value={range}
                onChange={handleSetRanges}
                valueLabelDisplay="auto"
                max={1000}
                min={10}
                marks={marks}
                step={null}
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
            {/*<label>Number of guests:</label>*/}
            {/*<input*/}
            {/*    min={0}*/}
            {/*    value={numOfGuests}*/}
            {/*    defaultValue={2}*/}
            {/*    type={"number"}*/}
            {/*    onChange={(e)=>setNumOfGuests(e.target.value)}*/}
            {/*/>*/}
            <label htmlFor="typeOfRoom">Choose type of room:</label>
            {/*<select name="typeOfRoom" id="typeOfRoom" onChange={(e) => handleSetTypeOfRoom(e.target.value)} multiple>*/}
            <select name="typeOfRoom" id="typeOfRoom" onChange={handleSetTypeOfRoom} multiple size="1">
                <option value="private_room">Private Room</option>
                <option value="hostel">Hostel</option>
                <option value="house">House</option>
            </select>
            <Typography id="range-sliderBed">
                Select Bed Range:
            </Typography>
            <Slider
                value={[start_numOfBeds, end_numOfBeds]}
                onChange={rangeBedSelector}
                valueLabelDisplay="auto"
                max={10}
                min={1}
            />
            <Typography id="range-sliderBedroom">
                Select Bedroom Range:
            </Typography>
            <Slider
                value={[start_numOfBedrooms, end_numOfBedrooms]}
                onChange={rangeBedroomSelector}
                valueLabelDisplay="auto"
                max={10}
                min={1}
            />
            <Typography id="range-sliderBath">
                Select Bath Range:
            </Typography>
            <Slider
                value={[start_numOfBaths, end_numOfBaths]}
                onChange={rangeBathSelector}
                valueLabelDisplay="auto"
                max={10}
                min={1}
            />
            <Typography id="range-sliderArea">
                Select Area Range:
            </Typography>
            <Slider
                value={[start_area, end_area]}
                max={2000}
                min={1}
                onChange={rangeAreaSelector}
                valueLabelDisplay="auto"
            />
            <Typography id="1" gutterBottom={true}>
                Living Room:
            </Typography>
            {/*<label>Living Room:</label>*/}
            {/*<TripleToggleSwitch labels={labels} onChange={handleChangeLivingRoom} />*/}
            <ToggleButtonGroup
                // value={livingRoom}
                // exclusive
                onChange={handleChangeLivingRoom}
                aria-label="text alignment"
                className={"toggle-btn-group"}
                color={"primary"}
            >
                <ToggleButton value={false} aria-label="left aligned" className={"toggle-btn"}>
                    No
                </ToggleButton>
                <ToggleButton value={"none"} aria-label="centered" className={"toggle-btn"}>
                    O
                </ToggleButton>
                <ToggleButton value={true} aria-label="right aligned" className={"toggle-btn"}>
                    Yes
                </ToggleButton>
            </ToggleButtonGroup>
            <Typography id="6" gutterBottom={true}>
                Cooling:
            </Typography>
            <ToggleButtonGroup
                // value={livingRoom}
                exclusive
                onChange={handleChangeCooling}
                aria-label="text alignment"
                className={"toggle-btn-group"}
                color={"primary"}
            >
                <ToggleButton value={false} aria-label="left aligned" className={"toggle-btn"}>
                    No
                </ToggleButton>
                <ToggleButton value={"none"} aria-label="centered" className={"toggle-btn"}>
                    O
                </ToggleButton>
                <ToggleButton value={true} aria-label="right aligned" className={"toggle-btn"}>
                    Yes
                </ToggleButton>
            </ToggleButtonGroup>
            <Typography id="2" gutterBottom={true}>
                Elevator:
            </Typography>
            <ToggleButtonGroup
                // value={livingRoom}
                exclusive
                onChange={handleChangeElevator}
                aria-label="text alignment"
                className={"toggle-btn-group"}
                color={"primary"}
            >
                <ToggleButton value={false} aria-label="left aligned" className={"toggle-btn"}>
                    No
                </ToggleButton>
                <ToggleButton value={"none"} aria-label="centered" className={"toggle-btn"}>
                    O
                </ToggleButton>
                <ToggleButton value={true} aria-label="right aligned" className={"toggle-btn"}>
                    Yes
                </ToggleButton>
            </ToggleButtonGroup>
            <Typography id="3" gutterBottom={true}>
                Smoking:
            </Typography>
            <ToggleButtonGroup
                // value={livingRoom}
                exclusive
                onChange={handleChangeSmoking}
                aria-label="text alignment"
                className={"toggle-btn-group"}
                color={"primary"}
            >
                <ToggleButton value={false} aria-label="left aligned" className={"toggle-btn"}>
                    No
                </ToggleButton>
                <ToggleButton value={"none"} aria-label="centered" className={"toggle-btn"}>
                    O
                </ToggleButton>
                <ToggleButton value={true} aria-label="right aligned" className={"toggle-btn"}>
                    Yes
                </ToggleButton>
            </ToggleButtonGroup>
            <Typography id="4" gutterBottom={true}>
                Pets:
            </Typography>
            <ToggleButtonGroup
                // value={livingRoom}
                exclusive
                onChange={handleChangePets}
                aria-label="text alignment"
                className={"toggle-btn-group"}
                color={"primary"}
            >
                <ToggleButton value={false} aria-label="left aligned" className={"toggle-btn"}>
                    No
                </ToggleButton>
                <ToggleButton value={"none"} aria-label="centered" className={"toggle-btn"}>
                    O
                </ToggleButton>
                <ToggleButton value={true} aria-label="right aligned" className={"toggle-btn"}>
                    Yes
                </ToggleButton>
            </ToggleButtonGroup>
            <Typography id="5" gutterBottom={true}>
                Heating:
            </Typography>
            <ToggleButtonGroup
                // value={livingRoom}
                exclusive
                onChange={handleChangeHeating}
                aria-label="text alignment"
                className={"toggle-btn-group"}
                color={"primary"}
            >
                <ToggleButton value={false} aria-label="left aligned" className={"toggle-btn"}>
                    No
                </ToggleButton>
                <ToggleButton value={"none"} aria-label="centered" className={"toggle-btn"}>
                    O
                </ToggleButton>
                <ToggleButton value={true} aria-label="right aligned" className={"toggle-btn"}>
                    Yes
                </ToggleButton>
            </ToggleButtonGroup>
            <Typography id="7" gutterBottom={true}>
                TV:
            </Typography>
            <ToggleButtonGroup
                // value={livingRoom}
                exclusive
                onChange={handleChangeTV}
                aria-label="text alignment"
                className={"toggle-btn-group"}
                color={"primary"}
            >
                <ToggleButton value={false} aria-label="left aligned" className={"toggle-btn"}>
                    No
                </ToggleButton>
                <ToggleButton value={"none"} aria-label="centered" className={"toggle-btn"}>
                    O
                </ToggleButton>
                <ToggleButton value={true} aria-label="right aligned" className={"toggle-btn"}>
                    Yes
                </ToggleButton>
            </ToggleButtonGroup>
            <Typography id="8" gutterBottom={true}>
                Events:
            </Typography>
            <ToggleButtonGroup
                // value={livingRoom}
                exclusive
                onChange={handleChangeEvents}
                aria-label="text alignment"
                className={"toggle-btn-group"}
                color={"primary"}
            >
                <ToggleButton value={false} aria-label="left aligned" className={"toggle-btn"}>
                    No
                </ToggleButton>
                <ToggleButton value={"none"} aria-label="centered" className={"toggle-btn"}>
                    O
                </ToggleButton>
                <ToggleButton value={true} aria-label="right aligned" className={"toggle-btn"}>
                    Yes
                </ToggleButton>
            </ToggleButtonGroup>
            <Typography id="9" gutterBottom={true}>
                Parking:
            </Typography>
            <ToggleButtonGroup
                // value={livingRoom}
                exclusive
                onChange={handleChangeParking}
                aria-label="text alignment"
                className={"toggle-btn-group"}
                color={"primary"}
            >
                <ToggleButton value={false} aria-label="left aligned" className={"toggle-btn"}>
                    No
                </ToggleButton>
                <ToggleButton value={"none"} aria-label="centered" className={"toggle-btn"}>
                    O
                </ToggleButton>
                <ToggleButton value={true} aria-label="right aligned" className={"toggle-btn"}>
                    Yes
                </ToggleButton>
            </ToggleButtonGroup>
            <Typography id="10" gutterBottom={true}>
                Internet:
            </Typography>
            <ToggleButtonGroup
                // value={livingRoom}
                exclusive
                onChange={handleChangeInternet}
                aria-label="text alignment"
                className={"toggle-btn-group"}
                color={"primary"}
            >
                <ToggleButton value={false} aria-label="left aligned" className={"toggle-btn"}>
                    No
                </ToggleButton>
                <ToggleButton value={"none"} aria-label="centered" className={"toggle-btn"}>
                    O
                </ToggleButton>
                <ToggleButton value={true} aria-label="right aligned" className={"toggle-btn"}>
                    Yes
                </ToggleButton>
            </ToggleButtonGroup>
            <Typography id="11" gutterBottom={true}>
                Kitchen:
            </Typography>
            <ToggleButtonGroup
                // value={livingRoom}
                exclusive
                onChange={handleChangeKitchen}
                aria-label="text alignment"
                className={"toggle-btn-group"}
                color={"primary"}
            >
                <ToggleButton value={false} aria-label="left aligned" className={"toggle-btn"}>
                    No
                </ToggleButton>
                <ToggleButton value={"none"} aria-label="centered" className={"toggle-btn"}>
                    O
                </ToggleButton>
                <ToggleButton value={true} aria-label="right aligned" className={"toggle-btn"}>
                    Yes
                </ToggleButton>
            </ToggleButtonGroup>

            <Button type={"submit"} onClick={handleSubmit} className={"submit"}>Submit</Button>
            <TableOfChosenElements flags={flags} dict={dictionary} />
        </div>
    );
};

export default FilterWindow;