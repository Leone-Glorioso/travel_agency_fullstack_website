import React from 'react';
import RoomPanel from "../Room/RoomPanel";
import {Button, Container} from "semantic-ui-react";

const RoomsPanel = ({rooms}) => {

    console.log(rooms)

    if (rooms === undefined || rooms.size === 0)
        return null;

    const list = rooms.map(room => {
        return ( <RoomPanel name={room.name} area={room.area} beds={room.numOfBeds} bathrooms={room.numOfBaths} bedrooms={room.numOfBedrooms} description={room.description}/> )
    })

    return (
        <Container >
            {list}
        </Container>
    );
};

export default RoomsPanel;