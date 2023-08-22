import React, {useEffect, useState} from 'react';
import {useAuth} from "../Auth/contex";
import {ApiConnector} from "../Other/ApiConnector";
import {parseJwt} from "../Other/Helpers";
import {Grid, Icon, Segment, Statistic} from "semantic-ui-react";

function Profile() {

    let [userMe, setUserMe] = useState(null)
    const Auth = useAuth()

    useEffect(() => {
        const fetchData = async () =>
        {
            console.log("test 1")
            console.log(Auth.user.user)
            const response = await ApiConnector.getUserMe(Auth.user.user)
            console.log(response)
            console.log("test 2")
            const {access} = response.data
            console.log("test 3")
            const token = parseJwt(access)
            console.log("test 4")
            setUserMe(token)
        }
        fetchData().catch(console.error)

    }, []);


    return (
        <Grid stackable columns={2}>
            <Grid.Row>
                <Grid.Column textAlign='center'>
                    <Segment color='violet'>
                        <Statistic>
                            <Statistic.Value><Icon name='user' color='grey' />{userMe}</Statistic.Value>
                            <Statistic.Label>User</Statistic.Label>
                        </Statistic>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Profile;