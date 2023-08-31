import React from 'react'
import { Tab } from 'semantic-ui-react'
import ReservationsTableFromLandlordClient from "./MyReservationsTable";
import ReservationsTableToLandlordClient from "./ReservationsOfMyRoomsTable";
import RoomsTableLandlordClient from "./RoomsTable";

function LandlordTab(props) {
    const { handleInputChange } = props
    const { isRoomsLoading, rooms, roomIdSearch, handleDeleteRoom, handleSearchRoom } = props
    const { isReservationsLoading_to, reservations_to, reservationIdSearch_to, handleDeleteReservation_to, handleSearchReservation_to } = props
    const { isReservationsLoading_from, reservations_from, reservationIdSearch_from, handleDeleteReservation_from, handleSearchReservation_from } = props

    const panes = [
        {
            menuItem: { key: 'rooms', icon: 'bed', content: 'Rooms' },
            render: () => (
                <Tab.Pane loading={isRoomsLoading}>
                    <RoomsTableLandlordClient
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
                <Tab.Pane loading={isReservationsLoading_to}>
                    <ReservationsTableToLandlordClient
                        reservations={reservations_to}
                        reservationIdSearch={reservationIdSearch_to}
                        handleDeleteReservation={handleDeleteReservation_to}
                        handleInputChange={handleInputChange}
                        handleSearchReservation={handleSearchReservation_to}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: { key: 'reservations', icon: 'bookmark', content: 'Reservations' },
            render: () => (
                <Tab.Pane loading={isReservationsLoading_from}>
                    <ReservationsTableToLandlordClient
                        reservations={reservations_from}
                        reservationIdSearch={reservationIdSearch_from}
                        handleDeleteReservation={handleDeleteReservation_from}
                        handleInputChange={handleInputChange}
                        handleSearchReservation={handleSearchReservation_from}
                    />
                </Tab.Pane>
            )
        }
    ]

    return (
        <Tab menu={{ attached: 'top' }} panes={panes} />
    )
}

export default LandlordTab