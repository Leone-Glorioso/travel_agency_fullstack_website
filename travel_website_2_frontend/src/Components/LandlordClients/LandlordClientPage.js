import {useAuth} from "../Auth/contex";
import React, {useEffect, useState} from "react";
import {ApiConnector} from "../Other/ApiConnector";
import {handleLogError} from "../Other/Helpers";
import {Container} from "semantic-ui-react";
import LandlordTab from "../Landlord/LandlordTab";
import LandlordClientTab from "./LandlordClientTab";

function LandlordClientPage()
{
    const Auth = useAuth()
    const user1 = Auth.getUser()
    const user = user1.user

    const [reservations, setReservations] = useState([])
    const [rooms, setRooms] = useState([])
    const [reservationIdSearch, setReservationIdSearch] = useState('')
    const [roomIdSearch, setRoomIdSearch] = useState('')
    const [reservationRoomSearch, setReservationRoomSearch] = useState('')
    const [reservationClientSearch, setReservationClientSearch] = useState('')
    const [isLandlordClient, setIsLandlordClient] = useState(true)
    const [isReservationsLoading, setIsReservationsLoading] = useState(false)
    const [isRoomsLoading, setIsRoomsLoading] = useState(false)
    const [reservations_from, setReservationsFrom] = useState([])
    const [reservationSearch, setReservationSearch] = useState('')
    const [isReservationsFromLoading, setIsReservationsFromLoading] = useState(false)

    useEffect(() => {
        setIsLandlordClient(true)
        handleGetReservations()
        handleGetRooms()
        handleGetReservations_from()
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
        else if (name === 'reservationSearch') {
            setReservationSearch(value)
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
            const data = response.data
            const rooms = data instanceof Array ? data : [data]
            setRooms(rooms)
        } catch (error) {
            handleLogError(error)
            setRooms([])
        }
    }

    const handleGetReservations_from = async () => {
        setIsReservationsFromLoading(true)
        try {
            const response = await ApiConnector.getMyReservations(user)
            setReservationsFrom(response.data)
        } catch (error) {
            handleLogError(error)
        } finally {
            setIsReservationsFromLoading(false)
        }
    }

    const handleSearchReservation_from = async () => {
        const id = parseInt(reservationSearch)
        try {
            const response = await ApiConnector.getMyReservation(user, id)
            const data = response.data
            const reservations = data instanceof Array ? data : [data]
            setReservationsFrom(reservations)
        } catch (error) {
            handleLogError(error)
            setReservationsFrom([])
        }
    }




    return (
        <Container>
            <LandlordClientTab
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
                handleGetReservations={handleGetReservations}
                handleDeleteReservation={handleDeleteReservation}
                handleSearchReservationId={handleSearchReservationId}
                handleSearchReservationClient={handleSearchReservationClient}
                handleSearchReservationRoom={handleSearchReservationRoom}
                reservationClientSearch={reservationClientSearch}
                reservationRoomSearch={reservationRoomSearch}
                reservations_from={reservations_from}
                reservationIdSearch_from={reservationSearch}
                handleSearchReservation_from={handleSearchReservation_from}
                handleGetReservations_from={handleGetReservations_from}
            />
        </Container>
    )
}

export default LandlordClientPage;