import React, {useEffect, useState} from 'react';
import {useAuth} from "../Auth/contex";
import {ApiConnector} from "../Other/ApiConnector";
import {parseJwt} from "../Other/Helpers";
import {Grid, Icon, Segment, Statistic} from "semantic-ui-react";

function Profile() {

    let [userMe, setUserMe] = useState(null)
    let [name, setName] = useState('')
    let [surname, setSurname] = useState('')
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [telephone, setTelephone] = useState(0)
    let [country, setCountry] = useState('')
    let [role, setRole] = useState('')
    const Auth = useAuth()

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

    }, []);


    return (
        <Grid stackable columns={2}>
            <Grid.Row>
                <Grid.Column textAlign='center'>
                    <Segment color='violet'>
                        <Statistic>
                            <Statistic.Label>Name</Statistic.Label>
                            <Statistic.Value><Icon name='user' color='grey' />{name}</Statistic.Value>
                        </Statistic>
                        <Statistic>
                            <Statistic.Label>Surname</Statistic.Label>
                            <Statistic.Value><Icon name='user' color='grey' />{surname}</Statistic.Value>
                        </Statistic>
                        <Statistic>
                            <Statistic.Label>Username</Statistic.Label>
                            <Statistic.Value><Icon name='user' color='grey' />{username}</Statistic.Value>
                        </Statistic>
                        <Statistic>
                            <Statistic.Label>Email</Statistic.Label>
                            <Statistic.Value><Icon name='user' color='grey' />{email}</Statistic.Value>
                        </Statistic>
                        <Statistic>
                            <Statistic.Label>Telephone</Statistic.Label>
                            <Statistic.Value><Icon name='user' color='grey' />{telephone}</Statistic.Value>
                        </Statistic>
                        <Statistic>
                            <Statistic.Label>Country</Statistic.Label>
                            <Statistic.Value><Icon name='user' color='grey' />{country}</Statistic.Value>
                        </Statistic>
                        <Statistic>
                            <Statistic.Label>Role</Statistic.Label>
                            <Statistic.Value><Icon name='user' color='grey' />{role}</Statistic.Value>
                        </Statistic>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Profile;