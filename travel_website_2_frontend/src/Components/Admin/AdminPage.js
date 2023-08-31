import React, {useEffect, useState} from 'react';
import {useAuth} from "../Auth/contex";
import {ApiConnector} from "../Other/ApiConnector";
import {handleLogError} from "../Other/Helpers";
import {Navigate} from "react-router-dom";
import AdminTab from "./AdminTab";
import {Container} from "semantic-ui-react";

function AdminPage(){
    const Auth = useAuth()
    const user = Auth.user.user
    // console.log(Auth.user)

    const [users, setUsers] = useState([])
    const [requests, setRequests] = useState([])
    const [rooms, setRooms] = useState([])
    const [userUsernameSearch, setUserUsernameSearch] = useState('')
    const [roomIdSearch, setRoomIdSearch] = useState('')
    const [roomLandlordSearch, setRoomLandlordSearch] = useState('')
    const [isAdmin, setIsAdmin] = useState(true)
    const [isUsersLoading, setIsUsersLoading] = useState(false)
    const [isRequestsLoading, setIsRequestsLoading] = useState(false)
    const [isRoomsLoading, setIsRoomsLoading] = useState(false)

    useEffect(() => {
        setIsAdmin(true)
        handleGetUsers()
        handleGetRequests()
        handleGetRooms()
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
            // console.log(response.data)
            // const data = response.data
            // const users = data instanceof Array ? data : [data]
            setUsers(response.data)
        } catch (error) {
            handleLogError(error)
            setUsers([])
        }
    }

    const handleGetLandlordClients = async () => {
        try {
            const response = await ApiConnector.getLandlordClients(user)
            // console.log(response.data)
            // const data = response.data
            // const users = data instanceof Array ? data : [data]
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
            // console.log(response.data)
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
        } catch (error) {
            handleLogError(error)
        }
    }

    const handleReject = async (username) => {
        try {
            const response = await ApiConnector.rejectRequest(user, username)
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
        const id = roomIdSearch
        try {
            const response = await ApiConnector.getRoom(id)
            setRooms(response.data)
            console.log(response.data)
        } catch (error) {
            handleLogError(error)
            setRooms([])
        }
    }

    const handleSearchRoomLandlord = async () => {
        const landlord = roomLandlordSearch
        try {
            const response = await ApiConnector.getRoomsByLandlord(landlord)
            // const data = response.data
            // const rooms = data instanceof Array ? data : [data]
            setRooms(response.data)
            console.log(response.data)
        } catch (error) {
            handleLogError(error)
            setRooms([])
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
                requests={requests}
                handleGetRequests={handleGetRequests}
                handleGetAccepted={handleGetAccepted}
                handleGetRejected={handleGetRejected}
                handleGetPending={handleGetPending}
                handleAccept={handleAccept}
                handleReject={handleReject}
                rooms={rooms}
                roomIdSearch={roomIdSearch}
                roomLandlordSearch={roomLandlordSearch}
                handleDeleteRoom={handleDeleteRoom}
                handleSearchRoomId={handleSearchRoomId}
                handleSearchRoomLandlord={handleSearchRoomLandlord}
                handleGetRooms={handleGetRooms}
            />
        </Container>
    )
}

export default AdminPage;