import React, {useEffect, useState} from "react"
import {ApiConnector} from "../Other/ApiConnector";
import {Grid, Segment} from "semantic-ui-react";
import './RoomCard.css'

function RoomCard({room}){
    let [numOfBeds,setNumOfBeds]=useState(0)
    let [numOfBaths,setNumOfBaths]=useState(0)
    let [numOfBedrooms,setNumOfBedrooms]=useState(0)
    let [area,setArea]=useState(0)
    let [livingRoom,setLivingRoom]=useState(false)
    let [smoking,setSmoking]=useState(false)
    let [pets,setPets]=useState(false)
    let [events,setEvents]=useState(false)
    let [internet,setInternet]=useState(false)
    let [cooling,setCooling]=useState(false)
    let [heating,setHeating]=useState(false)
    let [kitchen,setKitchen]=useState(false)
    let [tv,setTv]=useState(false);
    let [parking,setParking]=useState(false)
    let [elevator,setElevator]=useState(false)
    let [description,setDescription]=useState("")


    useEffect(() =>{
        const fetchData=async () =>
        {
            setNumOfBeds(room.numofbeds)
            setNumOfBaths(room.numofbaths)
            setNumOfBedrooms(room.numofbedrooms)
            setArea(room.area)
            setLivingRoom(room.livingroom)
            setSmoking(room.smoking)
            setPets(room.pets)
            setEvents(room.events)
            setInternet(room.internet)
            setCooling(room.cooling)
            setHeating(room.heating)
            setKitchen(room.kitchen)
            setTv(room.tv)
            setParking(room.parking)
            setElevator(room.elevator)
            setDescription(room.description)
        }
        fetchData().catch(console.error)
    })

    return(
        <Grid className={"RoomCard"} >
            <Grid.Row>
                <Grid.Column>
                    <Segment><strong>Beds</strong> {numOfBeds}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>Baths</strong> {numOfBaths}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>BedRooms</strong> {numOfBedrooms}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>Area</strong> {area}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>Living room</strong> {livingRoom ? "yes" : "no"}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>Smoking</strong> {smoking ? "yes" : "no"}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>pets</strong> {pets ? "yes" : "no"}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>events</strong> {events ? "yes" : "no"}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>internet</strong> {internet ? "yes" : "no"}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>cooling</strong> {cooling ? "yes" : "no"}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>heating</strong> {heating ? "yes" : "no"}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>kitchen</strong> {kitchen ? "yes" : "no"}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>tv</strong> {tv ? "yes" : "no"}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>parking</strong> {parking ? "yes" : "no"}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>elevator</strong> {elevator ? "yes" : "no"}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>description</strong> {description}</Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default RoomCard;