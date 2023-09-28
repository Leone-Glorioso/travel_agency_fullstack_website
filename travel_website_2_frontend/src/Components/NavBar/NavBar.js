import React from 'react';
import {useAuth} from "../Auth/contex";

const NavBar = () => {

    const Auth = useAuth()
    const user = Auth.getUser();

    return (
        <div className="navbar">
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
            <a href="/profile">Profile</a>
            <a href="/">Page</a>
        </div>
    );
};

export default NavBar;