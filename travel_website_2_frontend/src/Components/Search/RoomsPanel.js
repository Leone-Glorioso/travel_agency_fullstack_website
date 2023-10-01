import React, {useEffect} from 'react';
import RoomPanel from "../Room/RoomPanel";
import {Button, Container} from "semantic-ui-react";

const RoomsPanel = ({rooms}) => {

    console.log(rooms)

    if (rooms === undefined || rooms.size === 0)
        return null;

    const list = rooms.map(room => {
        return ( <RoomPanel room={room}/> )
    })


    return (
        <div>
            {list}
        </div>
    );
};

export default RoomsPanel;