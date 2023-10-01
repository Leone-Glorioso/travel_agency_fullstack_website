import React, {useEffect, useState} from 'react';
import {useAuth} from "../Auth/contex";
import {ApiConnector} from "../Other/ApiConnector";
import {handleLogError} from "../Other/Helpers";
import {Navigate} from "react-router-dom";
import AdminTab from "./AdminTab";
import {Container} from "semantic-ui-react";

function AdminPage(){
    const Auth = useAuth()
    const user1 = Auth.getUser()
    const user = user1.user

    const [users, setUsers] = useState([])
    const [requests, setRequests] = useState([])
    const [ratings, setRatings] = useState([])
    const [rooms, setRooms] = useState([])
    const [reservations, setReservations] = useState([])
    const [userUsernameSearch, setUserUsernameSearch] = useState('')
    const [roomIdSearch, setRoomIdSearch] = useState('')
    const [roomLandlordSearch, setRoomLandlordSearch] = useState('')
    const [reservationIdSearch, setReservationIdSearch] = useState('')
    const [reservationRoomSearch, setReservationRoomSearch] = useState('')
    const [reservationClientSearch, setReservationClientSearch] = useState('')
    const [reservationLandlordSearch, setReservationLandlordSearch] = useState('')
    const [ratingIdSearch, setRatingIdSearch] = useState('')
    const [ratingRoomSearch, setRatingRoomSearch] = useState('')
    const [ratingClientSearch, setRatingClientSearch] = useState('')
    const [isAdmin, setIsAdmin] = useState(true)
    const [isUsersLoading, setIsUsersLoading] = useState(false)
    const [isRequestsLoading, setIsRequestsLoading] = useState(false)
    const [isRoomsLoading, setIsRoomsLoading] = useState(false)
    const [isRatingsLoading, setIsRatingsLoading] = useState(false)
    const [isReservationsLoading, setIsReservationsLoading] = useState(false)

    useEffect(() => {
        setIsAdmin(true)
        handleGetUsers()
        handleGetRequests()
        handleGetRooms()
        handleGetReservations()
        handleGetRatings()
    }, [])


    const handleInputChange = (e, { name, value }) => {
        if (name === 'userUsernameSearch') {
            setUserUsernameSearch(value)
        }
        else if (name === 'SearchRoomId') {
            setRoomIdSearch(value)
        }
        else if (name === 'SearchRoomLandlord') {
            setRoomLandlordSearch(value)
        }
        else if (name === 'SearchReservationId') {
            setReservationIdSearch(value)
        }
        else if (name === 'SearchReservationRoom') {
            setReservationRoomSearch(value)
        }
        else if (name === 'SearchReservationClient') {
            setReservationClientSearch(value)
        }
        else if (name === 'SearchReservationLandlord') {
            setReservationLandlordSearch(value)
        }
        else if (name === 'SearchRatingId') {
            setRatingIdSearch(value)
        }
        else if (name === 'SearchRatingRoom') {
            setRatingRoomSearch(value)
        }
        else if (name === 'SearchRatingClient') {
            setRatingClientSearch(value)
        }
    }

    const handleGetUsers = async () => {
        setIsUsersLoading(true)
        try {
            const response = await ApiConnector.getUsers(user)
            console.log(response.data)
            setUsers(response.data)
        } catch (error) {
            handleLogError(error)
        } finally {
            setIsUsersLoading(false)
        }
    }

    const handleDeleteUser = async (username) => {
        try {
            await ApiConnector.deleteUser(user, username)
            handleGetUsers()
        } catch (error) {
            handleLogError(error)
        }
    }

    const handleSearchUser = async () => {
        const username = userUsernameSearch
        try {
            const response = await ApiConnector.getUser(user, username)
            console.log(response.data)
            const data = response.data
            const users = data instanceof Array ? data : [data]
            setUsers(users)
        } catch (error) {
            handleLogError(error)
            setUsers([])
        }
    }

    const handleGetLandlords = async () => {
        try {
            const response = await ApiConnector.getLandlords(user)
            // console.log(response.data)
            // const data = response.data
            // const users = data instanceof Array ? data : [data]
            setUsers(response.data)
        } catch (error) {
            handleLogError(error)
            setUsers([])
        }
    }

    const handleGetClients = async () => {
        try {
            const response = await ApiConnector.getClients(user)
            setUsers(response.data)
        } catch (error) {
            handleLogError(error)
            setUsers([])
        }
    }

    const handleGetLandlordClients = async () => {
        try {
            const response = await ApiConnector.getLandlordClients(user)
            setUsers(response.data)
        } catch (error) {
            handleLogError(error)
            setUsers([])
        }
    }

    const handleGetRequests = async () => {
        setIsRequestsLoading(true)
        try {
            const response = await ApiConnector.allRequests(user)
            setRequests(response.data)
        } catch (error) {
            handleLogError(error)
        } finally {
            setIsRequestsLoading(false)
        }
    }

    const handleGetAccepted = async () => {
        try {
            const response = await ApiConnector.allAcceptedRequests(user)
            setRequests(response.data)
        } catch (error) {
            handleLogError(error)
            setRequests([])
        }
    }

    const handleGetRejected = async () => {
        try {
            const response = await ApiConnector.allRejectedRequests(user)
            setRequests(response.data)
        } catch (error) {
            handleLogError(error)
            setRequests([])
        }
    }

    const handleGetPending = async () => {
        try {
            const response = await ApiConnector.allPendingRequests(user)
            setRequests(response.data)
        } catch (error) {
            handleLogError(error)
            setRequests([])
        }
    }

    const handleAccept = async (username) => {
        try {
            const response = await ApiConnector.acceptRequest(user, username)
            handleGetRequests()
        } catch (error) {
            handleLogError(error)
        }
    }

    const handleReject = async (username) => {
        try {
            const response = await ApiConnector.rejectRequest(user, username)
            handleGetRequests()
        } catch (error) {
            handleLogError(error)
        }
    }

    const handleGetRooms = async () => {
        setIsRoomsLoading(true)
        try {
            const response = await ApiConnector.getRooms(user)
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

    const handleSearchRoomLandlord = async () => {
        const landlord = roomLandlordSearch
        try {
            const response = await ApiConnector.getRoomsByLandlord(user, landlord)
            const data = response.data
            const rooms = data instanceof Array ? data : [data]
            setRooms(rooms)
        } catch (error) {
            handleLogError(error)
            setRooms([])
        }
    }

    const handleGetReservations = async () => {
        setIsReservationsLoading(true)
        try {
            const response = await ApiConnector.getReservations(user)
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
            const response = await ApiConnector.getReservation(user, id)
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
            const response = await ApiConnector.getReservationsOfRoomId(user, id)
            const data = response.data
            const reservations = data instanceof Array ? data : [data]
            setReservations(reservations)
        } catch (error) {
            handleLogError(error)
            setReservations([])
        }
    }

    const handleSearchReservationClient = async () => {
        const name = reservationClientSearch
        try {
            const response = await ApiConnector.getReservationsOfClient(user, name)
            const data = response.data
            const reservations = data instanceof Array ? data : [data]
            setReservations(reservations)
        } catch (error) {
            handleLogError(error)
            setReservations([])
        }
    }

    const handleSearchReservationLandlord = async () => {
        const name = reservationLandlordSearch
        try {
            const response = await ApiConnector.getReservationsOfLandlordRoom(user, name)
            const data = response.data
            const reservations = data instanceof Array ? data : [data]
            setReservations(reservations)
        } catch (error) {
            handleLogError(error)
            setReservations([])
        }
    }

    const handleSearchRatingId = async () => {
        const id = parseInt(ratingIdSearch)
        try {
            const response = await ApiConnector.getRating(user, id)
            const data = response.data
            const ratings = data instanceof Array ? data : [data]
            setRatings(ratings)
        } catch (error) {
            handleLogError(error)
            setRatings([])
        }
    }
    const handleSearchRatingRoom = async () => {
        const name = ratingRoomSearch
        try {
            const response = await ApiConnector.allRatingOfRoom(name)
            const data = response.data
            const ratings = data instanceof Array ? data : [data]
            setRatings(ratings)
        } catch (error) {
            handleLogError(error)
            setRatings([])
        }
    }

    const handleSearchRatingClient = async () => {
        const name = ratingClientSearch
        try {
            const response = await ApiConnector.allRatingsByUser(user, name)
            const data = response.data
            const ratings = data instanceof Array ? data : [data]
            setRatings(ratings)
        } catch (error) {
            handleLogError(error)
            setRatings([])
        }
    }

    const handleGetRatings = async () => {
        setIsRatingsLoading(true)
        try {
            const response = await ApiConnector.allRatings(user)
            console.log(response.data)
            setRatings(response.data)
        } catch (error) {
            handleLogError(error)
        } finally {
            setIsRatingsLoading(false)
        }
    }

    const handleDeleteRating = async (id) => {
        try {
            await ApiConnector.deleteRating(user, id)
            handleGetRatings()
        } catch (error) {
            handleLogError(error)
        }
    }



    if (!isAdmin) {
        return <Navigate to='/' />
    }

    return (
        <Container>
            <AdminTab
                isUsersLoading={isUsersLoading}
                users={users}
                userUsernameSearch={userUsernameSearch}
                handleDeleteUser={handleDeleteUser}
                handleSearchUser={handleSearchUser}
                handleInputChange={handleInputChange}
                handleGetLandlords={handleGetLandlords}
                handleGetClients={handleGetClients}
                handleGetLandlordClients={handleGetLandlordClients}
                handleGetUsers={handleGetUsers}
                isRequestsLoading={isRequestsLoading}
                requests={requests}
                handleGetRequests={handleGetRequests}
                handleGetAccepted={handleGetAccepted}
                handleGetRejected={handleGetRejected}
                handleGetPending={handleGetPending}
                handleAccept={handleAccept}
                handleReject={handleReject}
                isRoomsLoading={isRoomsLoading}
                rooms={rooms}
                roomIdSearch={roomIdSearch}
                roomLandlordSearch={roomLandlordSearch}
                handleDeleteRoom={handleDeleteRoom}
                handleSearchRoomId={handleSearchRoomId}
                handleSearchRoomLandlord={handleSearchRoomLandlord}
                handleGetRooms={handleGetRooms}
                isReservationsLoading={isReservationsLoading}
                reservations={reservations}
                reservationIdSearch={reservationIdSearch}
                reservationClientSearch={reservationClientSearch}
                reservationLandlordSearch={reservationLandlordSearch}
                reservationRoomSearch={reservationRoomSearch}
                handleDeleteReservation={handleDeleteReservation}
                handleSearchReservationId={handleSearchReservationId}
                handleSearchReservationClient={handleSearchReservationClient}
                handleSearchReservationLandlord={handleSearchReservationLandlord}
                handleSearchReservationRoom={handleSearchReservationRoom}
                handleGetReservations={handleGetReservations}
                isRatingsLoading={isRatingsLoading}
                ratings={ratings}
                ratingClientSearch={ratingClientSearch}
                ratingIdSearch={ratingIdSearch}
                ratingRoomSearch={ratingRoomSearch}
                handleDeleteRating={handleDeleteRating}
                handleGetRatings={handleGetRatings}
                handleSearchRatingClient={handleSearchRatingClient}
                handleSearchRatingId={handleSearchRatingId}
                handleSearchRatingRoom={handleSearchRatingRoom}
            />
        </Container>
    )
}

export default AdminPage;