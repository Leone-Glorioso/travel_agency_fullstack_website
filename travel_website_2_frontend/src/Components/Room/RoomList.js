import React,{useEffect,useState} from "react";
import {ApiConnector} from "../Other/ApiConnector";
import {Grid, Segment} from "semantic-ui-react";
import RoomCard from "./RoomCard"
import './RoomList.css'

function RoomList() {
    const [roomsData, setRoomsData] = useState([])

    useEffect(() => {
        const fetchRoomsData = async () => {
            try {
                const response = await ApiConnector.getRooms()
                setRoomsData(response.data)
            } catch (error) {
                console.error(error)
            }
        };
        fetchRoomsData()
    }, [])

    return (
        <Grid className={"RoomList"} columns={2}>
            {roomsData.map((room, index) => (
                <Grid.Column key={index}>
                    <RoomCard room={room} />
                </Grid.Column>
            ))}
        </Grid>
    )
}

export default RoomList