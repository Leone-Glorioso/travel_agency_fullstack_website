import React, {useEffect, useState} from 'react';
import {useAuth} from "../Auth/contex";
import {ApiConnector} from "../Other/ApiConnector";
import {handleLogError} from "../Other/Helpers";
import {Navigate} from "react-router-dom";
import {Container} from "semantic-ui-react";
import ClientTab from "./ClientTab";

function ClientPage(){
    const Auth = useAuth()
    const user1 = Auth.getUser()
    const user = user1.user

    const [reservations, setReservations] = useState([])
    const [reservationSearch, setReservationSearch] = useState('')
    const [isClient, setIsClient] = useState(true)
    const [isReservationsLoading, setIsReservationsLoading] = useState(false)

    useEffect(() => {
        setIsClient(true)
        handleGetReservations()
    }, [])


    const handleInputChange = (e, { name, value }) => {
        if (name === 'reservationSearch') {
            setReservationSearch(value)
        }
    }

    const handleGetReservations = async () => {
        setIsReservationsLoading(true)
        try {
            const response = await ApiConnector.getMyReservations(user)
            console.log(response.data)
            setReservations(response.data)
        } catch (error) {
            handleLogError(error)
        } finally {
            setIsReservationsLoading(false)
        }
    }

    const handleSearchReservation = async () => {
        const id = parseInt(reservationSearch)
        try {
            const response = await ApiConnector.getMyReservation(user, id)
            console.log(response.data)
            const data = response.data
            const reservations = data instanceof Array ? data : [data]
            setReservations(reservations)
        } catch (error) {
            handleLogError(error)
            setReservations([])
        }
    }

    return (
        <Container>
            <ClientTab
                reservations={reservations}
                isReservationsLoading={isReservationsLoading}
                reservationIdSearch={reservationSearch}
                // handleDeleteReservation={handleDeleteReservation}
                handleInputChange={handleInputChange}
                handleSearchReservation={handleSearchReservation}
                handleGetReservations={handleGetReservations}
            />
        </Container>
    )
}

export default ClientPage;