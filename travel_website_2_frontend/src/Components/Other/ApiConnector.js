import axios from 'axios'
import {config} from "../../Constants";
import {parseJwt} from "./Helpers";

export const ApiConnector={
    authenticate,
    signUp,
    numberOfUsers,
    numberOfReservations,
    getUsers,
    deleteUser,
    getReservations,
    getReservationsByBookerAndRoom,
    getReservation,
    createReservation,
    deleteReservation,
    getMyReservations,
    getReservationsOfClient,
    getMyReservation,
    getReservationOfClient,
    getReservationsOfMyRoom,
    getReservationsOfLandlordRoom,
    getReservationOfMyRoom,
    getReservationOfLandlordRoom,
    getRooms,
    createRoom,
    deleteRoom,
    getRoom,
    getMyRooms,
    getRoomsByLandlord,
    getMyRoom,
    getRoomByLandlord,
    getUserMe
}

function authenticate(username,password){
    return instance.post('/auth/authenticate',{ username, password},{
        headers:{ "Content-type": "application/json"}
    })
}

function signUp(user){
    return instance.post(`/auth/signup`, user, {
        headers: { 'Content-type': 'application/json' }
    })
}

function numberOfUsers() {
    return instance.get('/public/numberOfUsers')
}

function numberOfReservations() {
    return instance.get('/public/numberOfReservations')
}

function getUsers(user, username) {
    const url = username ? `/api/users/${username}` : '/api/users'
    return instance.get(url, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function deleteUser(user, username) {
    return instance.delete(`/api/users/${username}`, {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function getReservations(user) {
    return instance.get('/api/reservations/all', {headers: {'Authorization': bearerAuth(user)}}
    )
}

function getReservationsByBookerAndRoom(user,username,id){
    return instance.get('/api/reservations/search', {username, id},{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function getReservation(user,id){
    return instance.get('/api/reservations/searchID/${id}',{id},{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})

}

function createReservation(user,reservation){
    return instance.post('/api/reservations',reservation,{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function deleteReservation(user,reservation){
    return instance.delete('/api/reservations/{id}',reservation,{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function getMyReservations(user){
    return instance.get('/api/reservations/myReservations',{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function getReservationsOfClient(user,username){
    return instance.get('/api/reservations/client/{username}',{username},{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function getMyReservation(user,id){
    return instance.get('/api/reservations/myReservations/{id}',{id},{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function getReservationOfClient(user,username,id){
    return instance.get('/api/reservations/client/{username}/reservation/{id}',{username,id},{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function getReservationsOfMyRoom(user,id){
    return instance.get('/api/reservations/myRooms/{id}',{id},{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function getReservationsOfLandlordRoom(user,username,id){
    return instance.get('/api/reservations/rooms/{id}',{username,id},{
        headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}
    })
}

function getReservationOfMyRoom(user,roomID,reservationID){
    return instance.get('/api/reservations/myRooms/{roomID}/myReservations/{reservationID}',{roomID,reservationID},{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function getReservationOfLandlordRoom (user,username,roomID,reservationID){
    return instance.get('/api/reservations/rooms/{roomID}/myReservations/{reservationID}',{username, roomID, reservationID},{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function getRooms (){
    return instance.get('/api/rooms/all')
}

function createRoom(user,room){
    return instance.post('/api/rooms',room,{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function deleteRoom(user,room){
    return instance.delete('/api/rooms',room,{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function getRoom(id){
    return instance.get('/api/rooms/search/{id}',{id},{headers: {'Content-type': 'application/json'}})
}

function getMyRooms(user){
    return instance.get('/api/rooms/me',{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function getRoomsByLandlord(user,username){
    return instance.get('/api/rooms/landlord/{username}',{username},{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function getMyRoom(user,id){
    return instance.get('/api/rooms/me/{id}',{id},{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function getRoomByLandlord(user,username,id){
    return instance.get('/api/rooms/landlord/{username}/room/{id}',{username,id},{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}



function getUserMe(user) {
    return instance.get('/api/users/me', {
        headers: { 'Authorization': bearerAuth(user) }
    })
}



const instance = axios.create({
    baseURL: config.url.API_BASE_URL
})

instance.interceptors.request.use(function (config) {
    // Terminates when the login ends
    if (config.headers.Authorization) {
        const token = config.headers.Authorization.split(' ')[1]
        const data = parseJwt(token)
        if (Date.now() > data.exp * 1000) {
            window.location.href = "/login"
        }
    }
    return config
}, function (error) {
    return Promise.reject(error)
})


function bearerAuth(user) {
    return `Bearer ${user.access}`
}