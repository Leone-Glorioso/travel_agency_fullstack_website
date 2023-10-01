

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'universal-cookie';


const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [rooms, setRooms] = useState([]);
    const cookies = new Cookies();

    const userIsAuthenticated = () => {
        return cookies.get('user') !== undefined;
    };


    const userLogin = (user, accessToken) => {
        sessionStorage.setItem("user", JSON.stringify({ user, accessToken }));
        cookies.set('user', JSON.stringify({ user, accessToken }), {
            expires: new Date(Date.now() + 1000000)
        })
        setUser({ user, accessToken });
    };


    const getUser = () => {
        return cookies.get('user')
    }


    const userLogout = () => {
        // Clear the user data from local storage
        sessionStorage.removeItem("user");
        cookies.remove('user')
        setUser(null);
    };

    const roomsSetter = (room) => {
        cookies.set('rooms', JSON.stringify(room))
        setRooms(room);
    };


    const roomsGetter = () => {
        return JSON.parse(cookies.get('rooms'));
    };

    const roomsExists = () => {
        return cookies.get('rooms') !== undefined;
    };

    const contextValue = {
        user,
        userIsAuthenticated,
        userLogin,
        userLogout,
        getUser,
        rooms,
        roomsSetter,
        roomsGetter,
        roomsExists
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

export function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider };

