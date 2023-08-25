import React, { useEffect, useState } from 'react'
import {ApiConnector} from "../Other/ApiConnector";
import {handleLogError} from "../Other/Helpers";
import { Statistic, Icon, Grid, Container, Image, Segment, Dimmer, Loader } from 'semantic-ui-react'
import WebSitelogo from 'file:///C:/Users/GIGABYTE/Documents/GitHub/travel_website_2/misc/logo_1.png';
import {Link} from "react-router-dom"; // Adjust the path accordingly


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
                    <div className={"GreekTours"}>
                        <header>
                            <h1>
                                Welcome to our Website
                            </h1>
                        </header>
                        <nav>
                            <ul>
                                <li>  <Link to={"/signup"}>Sign Up</Link></li>
                                <li> <Link to={"/login"}> Login </Link></li>
                            </ul>
                        </nav>
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
            <Image src={WebSitelogo}  alt="Web site logo" />
            {/*<Image src={'https://github.com/Leone-Glorioso/travel_website_2/blob/master/misc/logo_1.png'} style={{marginTop: '10px'}} />*/}
            {/*<Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' style={{ marginTop: '2em' }} />*/}
            {/*<Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />*/}
        </Container>

    )


}

export default Home