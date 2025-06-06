import React, {useEffect, useState} from 'react';
import {useAuth} from "./contex";
import {ApiConnector} from "../Other/ApiConnector";
import {handleLogError, parseJwt} from "../Other/Helpers";
import { Button , Form, Grid, Segment, Message, Dropdown} from 'semantic-ui-react'
// import Dropdown from 'react-css-dropdown'
import { NavLink, Navigate } from 'react-router-dom'
import DropdownMenu from "./DropDownMenuRole";
import UploadImage from "../UploadImage/UploadImage";
//import * as PropTypes from "prop-types";


function SingUp() {
    const Auth = useAuth()
    const isLogged = Auth.userIsAuthenticated()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [telephone, setTelephone] = useState('')
    const [country, setCountry] = useState('')
    const [role, setRole] = useState('')
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleInputChange = (e, {name, value}) => {
        if (name === 'username') {
            setUsername(value)
        } else if (name === 'password') {
            setPassword(value)
        } else if (name === 'name') {
            setName(value)
        } else if (name === 'surname') {
            setSurname(value)
        } else if (name === 'email') {
            setEmail(value)
        } else if (name === 'telephone') {
            setTelephone(value)
        } else if (name === 'country') {
            setCountry(value)
        }
        else if (name === 'role') {
            setRole(value)
        }
    }

    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!(username && password && name && surname && email && telephone && country && role)) {
            setIsError(true)
            setErrorMessage('Please,give all fields!')
            return
        }


        const user = {username, password, name, surname, email, telephone, country, role}
        try {
            const resp = await ApiConnector.signUp(user)
            const { accessToken, ...userData } = resp.data; // Assuming user data is in response

            Auth.userLogin(userData, accessToken);

            setUsername('')
            setPassword('')
            setName('')
            setSurname('')
            setEmail('')
            setTelephone('')
            setCountry('')
            // setPhoto(null)
            setRole('')
            setIsError(false)
            setErrorMessage('')
        } catch (error) {
            handleLogError(error)
            if (error.response && error.response.data) {
                const errorData = error.response.data
                let errorMessage = 'Invalid fields'
                if (errorData.status === 409) {
                    errorMessage = errorData.message
                } else if (errorData.status === 400) {
                    errorMessage = errorData.errors[0].defaultMessage
                }
                setIsError(true)
                setErrorMessage(errorMessage)
            }
        }
    }

    if (isLogged){
        return <Navigate to='/'/>
    }

    return (
        <Grid textAlign='center' className={"app"}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form size='large' onSubmit={handleSubmit} className={"login-form"}>
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
                            className={"input-container"}
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
                            className={"input-container"}
                        />
                        <Form.Input
                            fluid
                            name='name'
                            placeholder='Name'
                            value={name}
                            onChange={handleInputChange}
                            className={"input-container"}
                        />
                        <Form.Input
                            fluid
                            name='surname'
                            placeholder='surname'
                            value={surname}
                            onChange={handleInputChange}
                            className={"input-container"}
                        />
                        <Form.Input
                            fluid
                            name='email'
                            icon='at'
                            iconPosition='left'
                            placeholder='Email'
                            value={email}
                            onChange={handleInputChange}
                            className={"input-container"}
                        />
                        <Form.Input
                            fluid
                            name='telephone'
                            icon='phone'
                            iconPosition='left'
                            placeholder='telephone'
                            value={telephone}
                            onChange={handleInputChange}
                            className={"input-container"}
                            />

                        <Form.Input
                            fluid
                            name='country'
                            icon='world'
                            iconPosition='left'
                            placeholder='country'
                            value={country}
                            onChange={handleInputChange}
                            className={"input-container"}
                        />

                        <Form.Field>
                            <label>Select Role</label>
                            <DropdownMenu onSelect={handleRoleChange} />
                        </Form.Field>
                        <Button color='violet' fluid size='large' className={"button-container"}>Signup</Button>
                    </Segment>
                </Form>
                <Message>{`Already have an account? `}
                    <NavLink to="/login" color='violet' as={NavLink}>Login</NavLink>
                </Message>
                {isError && <Message negative>{errorMessage}</Message>}
            </Grid.Column>
        </Grid>
    );
}

export default SingUp;

