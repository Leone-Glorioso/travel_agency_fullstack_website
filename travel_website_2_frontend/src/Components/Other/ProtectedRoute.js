import React from "react";
import {useAuth} from "../Auth/contex";
import {Navigate} from "react-router-dom";

function ProtectedRoute({children})
{
    const { userIsAuthenticated } = useAuth()
    return userIsAuthenticated() ? children : <Navigate to="/login" />
}

export default ProtectedRoute