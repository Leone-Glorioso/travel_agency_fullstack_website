import React ,{useState} from 'react'
import {useAuth} from "./contex";
import {ApiConnector} from "../Other/ApiConnector";
import {handleLogError, parseJwt} from "../Other/Helpers";
//import * as PropTypes from "prop-types";
import { NavLink, Navigate } from 'react-router-dom'
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react'

/*function Grid(props) {
    return null;
}

Grid.propTypes = {
    textAlign: PropTypes.string,
    children: PropTypes.node
};*/

function Login(){
    const Auth=useAuth()
    const isLogged=Auth.userIsAuthenticated()

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [isError,setIsError]=useState(false)

    const handleInputChange= (e,{name,value}) => {
        if (name==='username'){
            setUsername(value)
        }else if(name==='password'){
            setPassword(value)
        }
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()

        if(!(username && password)){
            setIsError(true)
            return
        }

        try{
            const resp=await ApiConnector.authenticate(username,password)
            const {accessToken} =resp.data
            const data=parseJwt(accessToken)
            const authUser={data,accessToken}

            Auth.userLogin(authUser)

            setUsername('')
            setPassword('')
            setIsError(false)
        } catch (error){
            handleLogError(error)
            setIsError(true)
        }
    }

    if(isLogged){
        return <Navigate to={'/'} />
    }

    return (
        <Grid textAlign='center'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment>
                        <Form.Input
                            fluid
                            autoFocus
                            name='username'
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                            value={username}
                            onChange={handleInputChange}
                        />
                        <Form.Input
                            fluid
                            name='password'
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={handleInputChange}
                        />
                        <Button color='violet' fluid size='large'>Login</Button>
                    </Segment>
                </Form>
                <Message>{`Don't have already an account? `}
                    <NavLink to="/signup" color='violet' as={NavLink}>Sign Up</NavLink>
                </Message>
                {isError && <Message negative>The username or password provided are incorrect!</Message>}
            </Grid.Column>
        </Grid>
    )
}

export default Login
