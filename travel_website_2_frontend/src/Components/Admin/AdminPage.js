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
    const [userUsernameSearch, setUserUsernameSearch] = useState('')
    // const [userRequestsSearch, setUserRequestsSearch] = useState('')
    const [isAdmin, setIsAdmin] = useState(true)
    const [isUsersLoading, setIsUsersLoading] = useState(false)
    const [isRequestsLoading, setIsRequestsLoading] = useState(false)

    useEffect(() => {
        setIsAdmin(true)
        handleGetUsers()
        handleGetRequests()
    }, [])


    const handleInputChange = (e, { name, value }) => {
        if (name === 'userUsernameSearch') {
            setUserUsernameSearch(value)
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
            />
        </Container>
    )
}

export default AdminPage;