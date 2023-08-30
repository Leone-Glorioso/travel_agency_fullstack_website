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
    getUserMe,
    getLandlords,
    getClients,
    getLandlordClients,
    initialSearch,
    search,
    createLocation,
    deleteLocation,
    allRequests,
    allAcceptedRequests,
    allRejectedRequests,
    allPendingRequests,
    acceptRequest,
    rejectRequest
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
    return instance.get('/api/reservations/search',{
        data: {username, id},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user),
        }
    })
}

function getReservation(user,id){
    return instance.get(`/api/reservations/searchID/${id}`,{
        data: {id},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user),
        }
    })

}

function createReservation(user,reservation, id){
    return instance.post(`/api/reservations/room/${id}`,reservation,{
        data: {id},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }})
}

function deleteReservation(user,id){
    return instance.delete(`/api/reservations/${id}`,{
        data: {id},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user),
        }
    })
}

function getMyReservations(user){
    return instance.get('/api/reservations/myReservations',{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function getReservationsOfClient(user,username){
    return instance.get(`/api/reservations/client/${username}`,{
        data: {username},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user),
        }
    })
}

function getMyReservation(user,id){
    return instance.get(`/api/reservations/myReservations/${id}`,{
        data: {id},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user),
        }
    })
}

function getReservationOfClient(user,username,id){
    return instance.get(`/api/reservations/client/${username}/reservation/${id}`,{
        data: {username, id},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user),
        }
    })
}

function getReservationsOfMyRoom(user,id){
    return instance.get(`/api/reservations/myRooms/${id}`,{
        data: {id},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user),
        }
    })
}

function getReservationsOfLandlordRoom(user,username,id){
    return instance.get(`/api/reservations/rooms/${id}`,{
        data: {username, id},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user),
        }
    })
}

function getReservationOfMyRoom(user,roomID,reservationID){
    return instance.get(`/api/reservations/myRooms/${roomID}/myReservations/${reservationID}`,{
        data: {roomID,reservationID},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user),
        }
    })
}

function getReservationOfLandlordRoom (user,username,roomID,reservationID){
    return instance.get(`/api/reservations/rooms/${roomID}/myReservations/${reservationID}`,{
        data: {username, roomID,reservationID},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user),
        }
    })
}

function getRooms (){
    return instance.get(`/api/rooms/all`)
}

function createRoom(user,room){
    return instance.post('/api/rooms',room,{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function deleteRoom(user,room){
    return instance.delete('/api/rooms',{
        data: {room},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user),
        }
    })
}

function getRoom(id){
    return instance.get(`/api/rooms/search/${id}`,{
        data: {id},
        headers: {
            'Content-type': 'application/json'
        }
    })
}

function getMyRooms(user){
    return instance.get('/api/rooms/me',{headers: {'Content-type': 'application/json','Authorization': bearerAuth(user)}})
}

function getRoomsByLandlord(user,username){
    return instance.get(`/api/rooms/landlord/${username}`,{
        data: {username},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user),
        }
    })
}

function getMyRoom(user,id){
    return instance.get(`/api/rooms/me/${id}`,{
        data: {id},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user),
        }
    })
}

function getRoomByLandlord(user,username,id){
    return instance.get(`/api/rooms/landlord/${username}/room/${id}`,{
        data: {username, id},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user),
        }
    })
}



function getUserMe(user) {
    return instance.get('/api/users/me', {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function getLandlords(user)
{
    return instance.get('/api/users/landlords', {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function getClients(user)
{
    return instance.get('/api/users/clients', {
        headers: { 'Authorization': bearerAuth(user) }
    })
}

function getLandlordClients(user)
{
    return instance.get('/api/users/landlordclients', {
        headers: { 'Authorization': bearerAuth(user) }
    })
}


//Not to be used for now, due to location id not ideal
function initialSearch( location_id, start, end, people)
{
    return instance.get(`/api/rooms/${location_id}/${start}/${end}/${people}`,{
        data: {location_id, start, end, people},
        headers: {
            'Content-type': 'application/json'
        }
    })
}

function search(request)
{
    return instance.get('/api/rooms/search',{
        data: {request},
        headers: {
            'Content-type': 'application/json'
        }
    })
}

function createLocation(user, location)
{
    return instance.post('/api/rooms/search', location, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
    })
}

function deleteLocation(user, id)
{
    return instance.delete(`/api/rooms/search/${id}`,{
        data: {id},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
    })
}

function allRequests(user)
{
    return instance.get('/api/requests/all',{
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
    })
}

function allAcceptedRequests(user)
{
    return instance.get('/api/requests/all/accepted',{
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
    })
}

function allRejectedRequests(user)
{
    return instance.get('/api/requests/all/rejected',{
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
    })
}

function allPendingRequests(user)
{
    return instance.get('/api/requests/all/pending',{
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
    })
}

function acceptRequest(user, username)
{
    return instance.get(`/api/requests/accept/${username}`,{
        data: {username},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
    })
}

function rejectRequest(user, username)
{
    return instance.get(`/api/requests/reject/${username}`,{
        data: {username},
        headers: {
            'Content-type': 'application/json',
            'Authorization': bearerAuth(user)
        }
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