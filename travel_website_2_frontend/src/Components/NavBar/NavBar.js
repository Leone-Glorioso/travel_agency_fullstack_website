import React, {useEffect, useState} from 'react';
import {useAuth} from "../Auth/contex";
import {ApiConnector} from "../Other/ApiConnector";
import './NavBar.css';
import {useNavigate} from "react-router-dom";

const NavBar = () => {

    const Auth = useAuth()
    const user = Auth.getUser();
    const [role, setRole] = useState('')
    const authCheck = Auth.userIsAuthenticated()
    const navigate = useNavigate()

    useEffect( () => {
        const fetchData = async () =>
        {
            const response = await ApiConnector.getRole(user.user)
            setRole(response.data)
        }

        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, []);

    const onLogout = () => {
        Auth.userLogout()
        navigate("/")
    }


    return (
        <div className="navbar">
            {!authCheck && <a href="/login">Login</a>}
            {!authCheck && <a href="/signup">Signup</a>}
            {authCheck && <button onClick={onLogout}>Logout</button>}
            {authCheck && <a href="/profile">Profile</a>}
            {authCheck && <a href="/message_page">Message</a>}
            {authCheck && (role === "admin") && <a href="/admin">Page</a>}
            {authCheck && (role === "landlord") && <a href="/landlord">Page</a>}
            {authCheck && (role === "client") && <a href="/client">Page</a>}
            {authCheck && (role === "landlordclient") && <a href="/landlordclient">Page</a>}
        </div>
    );
};


export default NavBar;