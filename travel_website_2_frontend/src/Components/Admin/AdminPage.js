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
    const [userUsernameSearch, setUserUsernameSearch] = useState('')
    const [isAdmin, setIsAdmin] = useState(true)
    const [isUsersLoading, setIsUsersLoading] = useState(false)

    useEffect(() => {
        setIsAdmin(true)
        handleGetUsers()
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
            />
        </Container>
    )
}

export default AdminPage;