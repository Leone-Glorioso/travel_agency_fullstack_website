import {useAuth} from "../Auth/contex";
import React, {useEffect, useState} from "react";
import {ApiConnector} from "../Other/ApiConnector";
import {handleLogError} from "../Other/Helpers";
import {Container} from "semantic-ui-react";
import LandlordTab from "./LandlordTab";


function LandlordPage()
{
    const Auth = useAuth()
    const user = Auth.user.user
    // console.log(Auth.user)

    const [reservations, setReservations] = useState([])
    const [rooms, setRooms] = useState([])
    const [reservationIdSearch, setReservationIdSearch] = useState('')
    const [roomIdSearch, setRoomIdSearch] = useState('')
    const [reservationRoomSearch, setReservationRoomSearch] = useState('')
    const [reservationClientSearch, setReservationClientSearch] = useState('')
    const [isLandlord, setIsLandlord] = useState(true)
    const [isReservationsLoading, setIsReservationsLoading] = useState(false)
    const [isRoomsLoading, setIsRoomsLoading] = useState(false)

    useEffect(() => {
        setIsLandlord(true)
        handleGetReservations()
        handleGetRooms()
    }, [])


    const handleInputChange = (e, { name, value }) => {
        if (name === 'SearchReservationId') {
            setReservationIdSearch(value)
        }
        else if (name === 'SearchReservationClient') {
            setReservationClientSearch(value)
        }
        else if (name === 'SearchReservationRoom') {
            setReservationRoomSearch(value)
        }
        else if (name === 'SearchRoomId') {
            setRoomIdSearch(value)
        }
    }

    const handleGetReservations = async () => {
        setIsReservationsLoading(true)
        try {
            const response = await ApiConnector.getReservationsOfMyRooms(user)
            setReservations(response.data)
        } catch (error) {
            handleLogError(error)
        } finally {
            setIsReservationsLoading(false)
        }
    }

    const handleDeleteReservation = async (id) => {
        try {
            await ApiConnector.deleteReservation(user, id)
            handleGetReservations()
        } catch (error) {
            handleLogError(error)
        }
    }

    const handleSearchReservationId = async () => {
        const id = parseInt(reservationIdSearch)
        try {
            const response = await ApiConnector.getReservationOfMyRooms(user, id)
            // console.log(response.data)
            // const data = response.data
            // const reservations = data instanceof Array ? data : [data]
            setReservations([response.data])
        } catch (error) {
            handleLogError(error)
            setReservations([])
        }
    }

    const handleSearchReservationClient = async () => {
        const name = reservationClientSearch
        try {
            const response = await ApiConnector.getReservationsOfMyRoomsByClient(user, name)
            console.log(response.data)
            const data = response.data
            const reservations = data instanceof Array ? data : [data]
            setReservations(reservations)
        } catch (error) {
            handleLogError(error)
            setReservations([])
        }
    }

    const handleSearchReservationRoom = async () => {
        const id = parseInt(reservationRoomSearch)
        try {
            const response = await ApiConnector.getReservationsOfMyRoom(user, id)
            console.log(response.data)
            const data = response.data
            const reservations = data instanceof Array ? data : [data]
            setReservations(reservations)
        } catch (error) {
            handleLogError(error)
            setReservations([])
        }
    }

    const handleGetRooms = async () => {
        setIsRoomsLoading(true)
        try {
            const response = await ApiConnector.getMyRooms(user)
            // console.log(response.data)
            setRooms(response.data)
        } catch (error) {
            handleLogError(error)
        } finally {
            setIsRoomsLoading(false)
        }
    }

    const handleDeleteRoom = async (id) => {
        try {
            await ApiConnector.deleteRoom(user, id)
            handleGetRooms()
        } catch (error) {
            handleLogError(error)
        }
    }

    const handleSearchRoomId = async () => {
        const id = parseInt(roomIdSearch)
        try {
            const response = await ApiConnector.getRoom(id)
            console.log(response.data)
            const data = response.data
            const rooms = data instanceof Array ? data : [data]
            setRooms(rooms)
        } catch (error) {
            handleLogError(error)
            setRooms([])
        }
    }

    return (
        <Container>
            <LandlordTab
                isRoomsLoading={isRoomsLoading}
                rooms={rooms}
                roomIdSearch={roomIdSearch}
                handleDeleteRoom={handleDeleteRoom}
                handleInputChange={handleInputChange}
                handleSearchRoomId={handleSearchRoomId}
                handleGetRooms={handleGetRooms}
                isReservationsLoading={isReservationsLoading}
                reservations={reservations}
                reservationIdSearch={reservationIdSearch}
                handleInputChange={handleInputChange}
                handleGetReservations={handleGetReservations}
                handleDeleteReservation={handleDeleteReservation}
                handleSearchReservationId={handleSearchReservationId}
                handleSearchReservationClient={handleSearchReservationClient}
                handleSearchReservationRoom={handleSearchReservationRoom}
                reservationClientSearch={reservationClientSearch}
                reservationRoomSearch={reservationRoomSearch}
            />
        </Container>
    )
}

export default LandlordPage;