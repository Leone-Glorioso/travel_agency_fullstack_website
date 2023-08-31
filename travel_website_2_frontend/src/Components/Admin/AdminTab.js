import React from 'react'
import { Tab } from 'semantic-ui-react'
import RequestsTable from "./RequestsTable";
import ReservationsTable from "./ReservationsTable";
import RoomsTable from "./RoomsTable";
import UsersTable from "./UsersTable";

function AdminTab(props) {
    const { handleInputChange } = props
    const { isUsersLoading, users, userUsernameSearch, handleDeleteUser, handleSearchUser } = props
    const { isRoomsLoading, rooms, roomIdSearch, handleDeleteRoom, handleSearchRoom } = props
    const { isRequestsLoading,requests, requestSearch, handleDeleteRequest, handleSearchRequest } = props
    const { isReservationsLoading, reservations, reservationIdSearch, handleDeleteReservation, handleSearchReservation } = props

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
                        handleDeleteRoom={handleDeleteRoom}
                        handleInputChange={handleInputChange}
                        handleSearchRoom={handleSearchRoom}
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
                        handleDeleteReservation={handleDeleteReservation}
                        handleInputChange={handleInputChange}
                        handleSearchReservation={handleSearchReservation}
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
                        requestSearch={requestSearch}
                        handleDeleteRequest={handleDeleteRequest}
                        handleInputChange={handleInputChange}
                        handleSearchRequest={handleSearchRequest}
                        />
                </Tab.Pane>
            )
        }
    ]

    return (
        <Tab menu={{ attached: 'top' }} panes={panes} />
    )
}

export default AdminTab