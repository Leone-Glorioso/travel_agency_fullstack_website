import React from 'react';
import RoomPanel from "../Room/RoomPanel";
import {Button} from "semantic-ui-react";

const RoomsPanel = ({rooms}) => {

    const list = rooms.map(room => {
        return ( <RoomPanel name={room.name} area={room.area} beds={room.numOfBeds} bathrooms={room.numOfBaths} bedrooms={room.numOfBedrooms} description={room.description}/> )
    })

    return (
        {list}
    );
};

export default RoomsPanel;