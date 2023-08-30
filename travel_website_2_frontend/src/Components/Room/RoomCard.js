import react, {useEffect, useState} from "react"
import {ApiConnector} from "../Other/ApiConnector";
import {Grid, Segment} from "semantic-ui-react";
import React from "react";

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
            const response =await ApiConnector.getRooms()
            const data=response.data.first()
            console.log(data)

            setNumOfBeds(data.numofbeds)
            setNumOfBaths(data.numofbaths)
            setNumOfBedrooms(data.numofbedrooms)
            setArea(data.area)
            setLivingRoom(data.livingroom)
            setSmoking(data.smoking)
            setPets(data.pets)
            setEvents(data.events)
            setInternet(data.internet)
            setCooling(data.cooling)
            setHeating(data.heating)
            setKitchen(data.kitchen)
            setTv(data.tv)
            setParking(data.parking)
            setElevator(data.elevator)
            setDescription(data.description)
        }
        fetchData().catch(console.error)
    })

    return(
        <Grid className={"roomCard"} >
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
                    <Segment><strong>Living room</strong> {livingRoom}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>Smoking</strong> {smoking}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>pets</strong> {pets}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>events</strong> {events}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>internet</strong> {internet}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>cooling</strong> {cooling}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>heating</strong> {heating}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>kitchen</strong> {kitchen}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>tv</strong> {tv}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>parking</strong> {parking}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>elevator</strong> {elevator}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>description</strong> {description}</Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default RoomCard;