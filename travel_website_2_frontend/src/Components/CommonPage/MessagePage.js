import React, {useEffect, useState} from 'react';
import {useAuth} from "../Auth/contex";
import MessageTab from "./MessageTab";
import {Container} from "semantic-ui-react";
import {ApiConnector} from "../Other/ApiConnector";
import {handleLogError} from "../Other/Helpers";

const MessagePage = () => {

    const Auth = useAuth()
    const user1 = Auth.getUser()
    const user = user1.user

    const [received, setReceived] = useState([])
    const [sent, setSent] = useState([])
    const [isReceived, setIsReceived] = useState([])
    const [isSent, setIsSent] = useState([])

    useEffect(() => {
        handleGetReceived()
        handleGetSent()
    }, []);


    const handleGetReceived = async () =>{
        setIsReceived(true)
        try {
            const response = await ApiConnector.allMessagesByReceiver(user)
            // console.log(response.data)
            setReceived(response.data)
        } catch (error) {
            handleLogError(error)
        } finally {
            setIsReceived(false)
        }
    }

    const handleGetSent = async () =>{
        setIsSent(true)
        try {
            const response = await ApiConnector.allMessagesBySender(user)
            setSent(response.data)
        } catch (error) {
            handleLogError(error)
        } finally {
            setIsSent(false)
        }
    }

    return (
        <Container >
            <MessageTab
                sent={sent}
                received={received}
                isSent={isSent}
                isReceived={isReceived}
            />
        </Container>
    );
};

export default MessagePage;