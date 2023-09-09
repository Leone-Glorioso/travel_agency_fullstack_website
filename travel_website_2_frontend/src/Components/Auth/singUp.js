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
    // const [photo, setPhoto] = useState()
    // const [photoName, setPhotoName] = useState('')
    // const [photoPreview, setPhotoPreview] = useState()
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
        // else if (name === 'photo') {
        //     setPhoto(value)
        // }
        else if (name === 'role') {
            setRole(value)
        }
    }

    // const handleImageChange = (event) => {
    //     if (event.target.files.length > 0) {
    //         setPhoto(event.target.files[0]);
    //         setPhotoName(event.target.files[0].name);
    //     }
    // }
    // useEffect(() => {
    //     if (!photo) {
    //         setPhotoPreview(undefined)
    //         return
    //     }
    //
    //     const objectUrl = URL.createObjectURL(photo)
    //     setPhotoPreview(objectUrl)
    //
    //     // free memory when ever this component is unmounted
    //     return () => URL.revokeObjectURL(objectUrl)
    // }, [photo])

    // const handleImageChange = e => {
    //     if (!e.target.files || e.target.files.length === 0) {
    //         setPhoto(undefined)
    //         return
    //     }
    //
    //     // I've kept this example simple by using the first image instead of multiple
    //     setPhoto(e.target.files[0])
    //     setPhotoName(e.target.files[0].name)
    // }

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
        return <Navigate to='/profile'/>
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
                            icon='id card'
                            iconPosition='left'
                            placeholder='Name'
                            value={name}
                            onChange={handleInputChange}
                            className={"input-container"}
                        />
                        <Form.Input
                            fluid
                            name='surname'
                            icon='id card outline'
                            iconPosition='left'
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

                        {/*<Form.Input*/}
                        {/*    fluid*/}
                        {/*    name='photo'*/}
                        {/*    icon='photo'*/}
                        {/*    iconPosition='left'*/}
                        {/*    // placeholder='photo'*/}
                        {/*    onChange={handleImageChange}*/}
                        {/*    type={"file"}*/}
                        {/*    // className={"input-container"}*/}
                        {/*/>*/}

                        {/*<UploadImage name={"person"}/>*/}

                        <Form.Field>
                            <label>Select Role</label>
                            <DropdownMenu onSelect={handleRoleChange} />
                        </Form.Field>

                        {/*<Dropdown*/}
                        {/*    placeholder={'Select Role'}*/}
                        {/*    fluid*/}
                        {/*    selection*/}
                        {/*    options={[*/}
                        {/*    {key:'admin',text:'Admin',value:'admin'},*/}
                        {/*    {key:'user',text:'User',value:'user'},*/}
                        {/*    {key:'admin',text:'Admin',value:'admin'}*/}
                        {/*]}*/}
                        {/*    value={role}*/}
                        {/*    onChange={handleRoleChange}*/}
                        {/*/>*/}

                        {/*<Form.Input*/}
                        {/*    fluid*/}
                        {/*    name='role'*/}
                        {/*    icon='world'*/}
                        {/*    iconPosition='left'*/}
                        {/*    placeholder='role'*/}
                        {/*    value={role}*/}
                        {/*    onChange={handleInputChange}*/}
                        {/*    className={"input-container"}*/}
                        {/*/>*/}
                        {/*<Dropdown*/}
                        {/*    floating*/}
                        {/*    selection*/}
                        {/*    fluid*/}
                        {/*    placeholder = 'Role'*/}
                        {/*    value = {role}*/}
                        {/*    options = {roleOptions}*/}
                        {/*    onChange={handleInputChange}>*/}
                        {/*</Dropdown>*/}
                        {/*<Dropdown*/}
                        {/*    placeholder='Select Role(s)'*/}
                        {/*    fluid*/}
                        {/*    selection*/}
                        {/*    options={roleOptions}*/}
                        {/*/>*/}
                        {/*<Dropdown placeholder='Roles' fluid selection options={roleOptions} value={role} className={"test"}/>*/}
                        {/*<Dropdown.Menu>*/}
                        {/*    <Dropdown.Item text='ReactJS' icon='react' />*/}
                        {/*    <Dropdown.Item text='AngularJS' icon='angular'/>*/}
                        {/*    <Dropdown.Item text='HTML5' icon='html5' />*/}
                        {/*    <Dropdown.Item text='JavaScript' icon='js' />*/}
                        {/*    <Dropdown.Item text='NodeJS' icon='node'/>*/}
                        {/*</Dropdown.Menu>*/}
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

