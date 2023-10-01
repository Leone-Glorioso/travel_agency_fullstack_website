import React, {useState} from 'react';
import {Button, Container, Message} from "semantic-ui-react";
import {ApiConnector} from "../Other/ApiConnector";
import {handleLogError} from "../Other/Helpers";
import {useAuth} from "../Auth/contex";
import {Navigate} from "react-router-dom";

const NewMessagePage = () => {
    const [receiver, setReceiver] = useState('')
    const [body, setBody] = useState('')
    const [isError, setIsError] = useState(false)
    const [submited, setSubmited] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const Auth = useAuth()
    const user = Auth.getUser()


    const handleSubmit = async () => {
        const message = {
            "body": body,
            "receiver": receiver
        }
        try {
            // console.log(roomRequest)
            const response = await ApiConnector.sendMessage(user.user, message)
            setSubmited(true)
        }
        catch (error){
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

    return (
        <>
            <Container className={"one"}>
                <label>Name</label>
                <input
                    type="text"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    className={"two"}
                />
                <label>Description</label>
                <input
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className={"two"}

                />
                <Button color='violet' fluid size='large' className={"button-container"} type={"submit"} onClick={handleSubmit} className={"four"}>Create</Button>
                {isError && <Message negative>{errorMessage}</Message>}
                {submited && <Navigate to={"/message_page"}/> }
            </Container>
        </>
    );
};

export default NewMessagePage;