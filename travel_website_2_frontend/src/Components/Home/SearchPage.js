import React, { useState, useEffect } from 'react';
import {useLocation} from "react-router-dom";
import Card from "./Card"
import FilterWindow from "../Search/FilterWindow";
import RoomsPanel from "../Search/RoomsPanel";
import {Grid} from "semantic-ui-react";
import Cookies from "universal-cookie";
function SearchPage () {

    const [rooms, SetRooms] = useState([])
    const cookies = new Cookies();

    useEffect(() => {
        SetRooms(cookies.get('rooms'))
        // cookies.remove('rooms')
    }, []);

    return (
        <div className={"float-container"}>
            <FilterWindow SetRooms={SetRooms}/>
            <RoomsPanel rooms={rooms}/>
        </div>

    );
}

export default SearchPage;