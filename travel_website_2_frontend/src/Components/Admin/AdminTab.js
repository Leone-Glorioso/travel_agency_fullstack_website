import React from 'react'
import { Tab } from 'semantic-ui-react'
import RequestsTable from "./RequestsTable";
import ReservationsTable from "./ReservationsTable";
import RoomsTable from "./RoomsTable";
import UsersTable from "./UsersTable";
import RatingsTable from "./RatingsTable";
import '../CommonPage/messageStyling.css';

function AdminTab(props) {
    const { handleInputChange } = props
    const { isUsersLoading, users, userUsernameSearch, handleDeleteUser, handleSearchUser , handleGetLandlords, handleGetClients, handleGetLandlordClients, handleGetUsers} = props
    const { isRequestsLoading,requests, handleGetRequests, handleGetAccepted, handleGetRejected, handleGetPending, handleAccept, handleReject} = props
    const { isRoomsLoading, rooms, roomIdSearch, roomLandlordSearch, handleDeleteRoom, handleSearchRoomId, handleSearchRoomLandlord, handleGetRooms } = props
    const { isReservationsLoading, reservations, reservationIdSearch, reservationRoomSearch, reservationClientSearch, reservationLandlordSearch,
        handleDeleteReservation, handleSearchReservationId , handleSearchReservationRoom , handleSearchReservationClient , handleSearchReservationLandlord,
        handleGetReservations} = props
    const { isRatingsLoading, ratings, handleGetRatings, ratingIdSearch, ratingRoomSearch,
        ratingClientSearch, handleSearchRatingId , handleSearchRatingRoom , handleSearchRatingClient, handleDeleteRating} = props

    const panes = [
        {
            menuItem: { key: 'users', icon: 'users', content: 'Users' },
            render: () => (
                <Tab.Pane loading={isUsersLoading}>
                    <UsersTable
                        users={users}
                        userUsernameSearch={userUsernameSearch}
                        handleInputChange={handleInputChange}
                        handleDeleteUser={handleDeleteUser}
                        handleSearchUser={handleSearchUser}
                        handleGetLandlords={handleGetLandlords}
                        handleGetClients={handleGetClients}
                        handleGetLandlordClients={handleGetLandlordClients}
                        handleGetUsers={handleGetUsers}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: { key: 'rooms', icon: 'bed', content: 'Rooms' },
            render: () => (
                <Tab.Pane loading={isRoomsLoading}>
                    <RoomsTable
                        rooms={rooms}
                        roomIdSearch={roomIdSearch}
                        roomLandlordSearch={roomLandlordSearch}
                        handleDeleteRoom={handleDeleteRoom}
                        handleInputChange={handleInputChange}
                        handleSearchRoomId={handleSearchRoomId}
                        handleSearchRoomLandlord={handleSearchRoomLandlord}
                        handleGetRooms={handleGetRooms}
                        />
                </Tab.Pane>
            )
        },
        {
            menuItem: { key: 'reservations', icon: 'bookmark', content: 'Reservations' },
            render: () => (
                <Tab.Pane loading={isReservationsLoading}>
                    <ReservationsTable
                        reservations={reservations}
                        reservationIdSearch={reservationIdSearch}
                        reservationClientSearch={reservationClientSearch}
                        reservationLandlordSearch={reservationLandlordSearch}
                        reservationRoomSearch={reservationRoomSearch}
                        handleDeleteReservation={handleDeleteReservation}
                        handleInputChange={handleInputChange}
                        handleSearchReservationId={handleSearchReservationId}
                        handleSearchReservationClient={handleSearchReservationClient}
                        handleSearchReservationLandlord={handleSearchReservationLandlord}
                        handleSearchReservationRoom={handleSearchReservationRoom}
                        handleGetReservations={handleGetReservations}
                        />
                </Tab.Pane>
            )
        },
        {
            menuItem: { key: 'requests', icon: 'address book', content: 'Requests' },
            render: () => (
                <Tab.Pane loading={isRequestsLoading}>
                    <RequestsTable
                        requests={requests}
                        handleGetRequests={handleGetRequests}
                        handleGetAccepted={handleGetAccepted}
                        handleGetRejected={handleGetRejected}
                        handleGetPending={handleGetPending}
                        handleAccept={handleAccept}
                        handleReject={handleReject}
                        />
                </Tab.Pane>
            )
        },
        {
            menuItem: { key: 'ratings', icon: 'address book', content: 'Ratings' },
            render: () => (
                <Tab.Pane loading={isRatingsLoading}>
                    <RatingsTable
                        ratings={ratings}
                        ratingClientSearch={ratingClientSearch}
                        ratingIdSearch={ratingIdSearch}
                        ratingRoomSearch={ratingRoomSearch}
                        handleDeleteRating={handleDeleteRating}
                        handleInputChange={handleInputChange}
                        handleGetRatings={handleGetRatings}
                        handleSearchRatingClient={handleSearchRatingClient}
                        handleSearchRatingId={handleSearchRatingId}
                        handleSearchRatingRoom={handleSearchRatingRoom}
                    />
                </Tab.Pane>
            )
        }
    ]

    return (
        <Tab menu={{ attached: 'top' }} panes={panes}  className={"custom-tab"} />
    )
}

export default AdminTab