import React, { useEffect, useState } from 'react'
import {ApiConnector} from "../Other/ApiConnector";
import {handleLogError} from "../Other/Helpers";
import {Statistic, Icon, Grid, Container, Image, Segment, Dimmer, Loader} from 'semantic-ui-react'
import WebSiteLogo from '../../logo_1.png'
//import WebSiteLogo from 'file:///C:/Users/GIGABYTE/Documents/GitHub/travel_website_2/misc/logo_1.png';
import {Link} from "react-router-dom"; // Adjust the path accordingly
import Header from './Header'
import SearchBanner from './SearchBanner'
import Card from "./Card"
import RoomTypes from "./RoomTypes";

function Home(){
    const [numberOfUsers,setNumberOfUsers]=useState(0)
    const [numberOfReservations,setNumberOfReservations]=useState(0)
    const [isLoading,setIsLoading]=useState(0)


    useEffect(() =>{
        async function fetchData(){
            try{
                const respUsers=await ApiConnector.numberOfUsers()
                const numberOfUsers=respUsers.data

                // const respReservations=await ApiConnector.numberOfReservations()
                // const numberOfReservations=respReservations.data

                setNumberOfUsers(numberOfUsers)
                // setNumberOfReservations(numberOfReservations)
            } catch (error){
                handleLogError(error)
            } finally{
                setIsLoading(false)
            }
        }
        fetchData();
    },[])

    if (isLoading){
        return (
            <Segment basic style={{ marginTop: window.innerHeight / 2 }}>
                <Dimmer active inverted>
                    <Loader inverted size='huge'>Loading</Loader>
                </Dimmer>
            </Segment>
        )
    }

    return (
        <Container text>
            <Header/>
            <Grid stackable columns={2}>
                <Grid.Row>
                    <Grid.Column textAlign='center'>
                        <Segment color='violet'>
                            <Statistic>
                                <Statistic.Value><Icon name='user' color='grey' />{numberOfUsers}</Statistic.Value>
                                <Statistic.Label>Users</Statistic.Label>
                            </Statistic>
                        </Segment>
                    </Grid.Column>
                    <div className={"home"}>
                        <div className={"GreekTours"}>
                            <header>
                                <h1>
                                    Welcome to our Website
                                </h1>
                            </header>
                        </div>
                        <SearchBanner/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>


                        <RoomTypes/>
                        <div className={'homes'}>
                            <Card
                            src={"https://plus.unsplash.com/premium_photo-1670076505419-99468d952c61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            }title={"Private Room"} description={"Private room with private bathroom"} price={"30$"}/>
                            <Card src={"https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"}
                            title={"Hostel Room"} description={"Beautiful hostel ideal for teenagers"} price={"20$"} />
                            <Card src={"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdXNlJTIwb3V0ZG9yJTIwbW9kZXJufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"}
                                  title={"Entire House"}
                            description={"Luxury modern House for unforgettable vacations"} price={"1k$"} />
                        </div>
                    </div>




                    {/*<Grid.Column textAlign='center'>*/}
                    {/*    <Segment color='violet'>*/}
                    {/*        <Statistic>*/}
                    {/*            <Statistic.Value><Icon name='laptop' color='grey' />{numberOfReservations}</Statistic.Value>*/}
                    {/*            <Statistic.Label>Reservations</Statistic.Label>*/}
                    {/*        </Statistic>*/}
                    {/*    </Segment>*/}
                    {/*</Grid.Column>*/}
                </Grid.Row>
            </Grid>

            {/*<Image src={'https://github.com/Leone-Glorioso/travel_website_2/blob/master/misc/logo_1.png'} style={{marginTop: '10px'}} />*/}
            {/*<Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' style={{ marginTop: '2em' }} />*/}
            {/*<Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />*/}
        </Container>

    )


}

export default Home