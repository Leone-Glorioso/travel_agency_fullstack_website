import React, {useEffect, useState} from 'react';
import {useAuth} from "../Auth/contex";
import {ApiConnector} from "../Other/ApiConnector";
// import {parseJwt} from "../Other/Helpers";
import {Button, Form, Grid, Icon, Image, Input, Segment, Statistic} from "semantic-ui-react";

import "./Profile.css";
import {useNavigate} from "react-router-dom";

function Profile() {

    // let [userMe, setUserMe] = useState(null)
    let [name, setName] = useState('')
    let [surname, setSurname] = useState('')
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [telephone, setTelephone] = useState(0)
    let [country, setCountry] = useState('')
    let [role, setRole] = useState('')
    let [photo, setPhoto] = useState([])
    const Auth = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () =>
        {
            console.log("test 1")
            console.log(Auth.user.user)
            // console.log(parseJwt(Auth.user.user))
            const response = await ApiConnector.getUserMe(Auth.user.user)
            const data = response.data
            setUsername(data.username)
            setName(data.name)
            setSurname(data.surname)
            setEmail(data.email)
            setCountry(data.country)
            setTelephone(data.telephone)
            setRole(data.role)
        }
        fetchData().catch(console.error)

    }, [Auth.user.user]);

    const imageChange = event =>
    {
        setPhoto([event.target.files[0], event.target.files[0].name])
    }

    const submitNewImage = async () =>
    {
        try {
            const formData = new FormData();
            formData.append('file', photo[0])
            formData.append('name', photo[1])
            const response = await ApiConnector.uploadImage(Auth.user.user, { image: photo[0] })

        }
        catch (error)
        {
            console.log(error)
        }
    }


    return (
        // <Grid stackable columns={2}>
        //     <Grid.Row>
        //         <Grid.Column textAlign='center'>
        //             <Segment color='violet'>
        //                 <Statistic>
        //                     <Statistic.Label>Name</Statistic.Label>
        //                     <Statistic.Value><Icon name='user' color='grey' />{name}</Statistic.Value>
        //                 </Statistic>
        //                 <Statistic>
        //                     <Statistic.Label>Surname</Statistic.Label>
        //                     <Statistic.Value><Icon name='user' color='grey' />{surname}</Statistic.Value>
        //                 </Statistic>
        //                 <Statistic>
        //                     <Statistic.Label>Username</Statistic.Label>
        //                     <Statistic.Value><Icon name='user' color='grey' />{username}</Statistic.Value>
        //                 </Statistic>
        //                 <Statistic>
        //                     <Statistic.Label>Email</Statistic.Label>
        //                     <Statistic.Value><Icon name='user' color='grey' />{email}</Statistic.Value>
        //                 </Statistic>
        //                 <Statistic>
        //                     <Statistic.Label>Telephone</Statistic.Label>
        //                     <Statistic.Value><Icon name='user' color='grey' />{telephone}</Statistic.Value>
        //                 </Statistic>
        //                 <Statistic>
        //                     <Statistic.Label>Country</Statistic.Label>
        //                     <Statistic.Value><Icon name='user' color='grey' />{country}</Statistic.Value>
        //                 </Statistic>
        //                 <Statistic>
        //                     <Statistic.Label>Role</Statistic.Label>
        //                     <Statistic.Value><Icon name='user' color='grey' />{role}</Statistic.Value>
        //                 </Statistic>
        //             </Segment>
        //         </Grid.Column>
        //     </Grid.Row>
        // </Grid>

        <Grid className={"app-profile"} >
            <Grid.Row>
                {/*<Grid.Column>*/}
                {/*    <img src={URL.createObjectURL(photo[0])}/>*/}
                {/*</Grid.Column>*/}
                <Grid.Column>
                    <Segment><strong>Username</strong> {username}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>Name</strong> {name}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>Surname</strong> {surname}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>Email</strong> {email}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>Telephone</strong> {telephone}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>Country</strong> {country}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment><strong>Role</strong> {role}</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Form >
                        <Form.Input type={"file"} onChange={imageChange} />
                        <Form.Button type={"submit"} onClick={submitNewImage}>Upload Image</Form.Button>
                    </Form>
                </Grid.Column>
                <Button onClick={() => navigate("/new_room")} />
                {/*<Grid.Column>*/}
                {/*    */}
                {/*</Grid.Column>*/}
            </Grid.Row>
        </Grid>
    );
};

export default Profile;