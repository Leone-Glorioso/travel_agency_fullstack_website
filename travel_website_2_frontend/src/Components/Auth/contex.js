

import { createContext, useContext, useEffect, useState } from "react";
// import Cookies from 'react-cookie';
import Cookies from 'universal-cookie';


const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const cookies = new Cookies();

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem("user"));
        if (storedUser) {
            // Check token expiry and update user state accordingly
            if (Date.now() < storedUser.exp * 1000) {
                setUser(storedUser);
            } else {
                userLogout();
            }
        }
    }, []);

    const userIsAuthenticated = () => {
        return user !== null;
    };


    const userLogin = (user, accessToken) => {
        sessionStorage.setItem("user", JSON.stringify({ user, accessToken }));
        // let d = new Date();
        // d.setTime(d.getTime() + (10*60*1000));
        cookies.set('user', JSON.stringify({ user, accessToken }))
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

    const contextValue = {
        user,
        userIsAuthenticated,
        userLogin,
        userLogout,
        getUser
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


// const AuthContext=createContext()
//
// function AuthProvider({children}){
//
//     const [user,setUser]=useState(null)
//
//     useEffect(()=>{
//         const storedUser=JSON.parse(localStorage.getItem('user'))
//         setUser(storedUser)
//     }, [])
//
//     const getUser = () => {
//         return JSON.parse(localStorage.getItem('user'))
//     }
//
//     const userIsAuthenticated = () => {
//         let storedUser=localStorage.getItem('user')
//         console.log(user)
//         if (!storedUser){
//             console.log('cy@')
//             return false
//         }
//         storedUser=JSON.parse(storedUser)
//
//         if (Date.now() > storedUser.data.exp * 1000){
//             userLogout()
//             return false
//         }
//         return true
//     }
//
//     const userLogin=user => {
//         localStorage.setItem('user',JSON.stringify(user))
//         setUser(user)
//     }
//
//     const userLogout=() => {
//         localStorage.removeItem('user')
//         setUser(null)
//     }
//
//     const contextValue = {
//         user,
//         getUser,
//         userIsAuthenticated,
//         userLogin,
//         userLogout,
//     }
//
//     return (
//         <AuthContext.Provider value={contextValue}>
//             {children}
//         </AuthContext.Provider>
//     )
//
// }
//
// export default AuthContext
//
// export function useAuth(){
//     return useContext(AuthContext)
// }
//
// export {AuthProvider}
