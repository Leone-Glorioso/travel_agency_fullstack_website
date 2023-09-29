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

    // const rows = Math.floor(list.size /3)
    // const newList = []
    // for(let i = 0; i < rows; i++)
    // {
    //     console.log("heya")
    //     console.log(list[3*i])
    //     if((list.size - i*3) >= 3)
    //     {
    //         newList.push([list[3*i], list[3*i+1], list[3*i+2]])
    //     }
    //     else if((list.size - i*3) === 2)
    //         newList.push([list[3*i], list[3*i+1]])
    //     else if((list.size - i*3) === 1)
    //         newList.push([list[3*i]])
    // }


    return (
        <div>
            {/*{console.log("lol", newList)}*/}
            {list}
        </div>
    );
};

export default RoomsPanel;