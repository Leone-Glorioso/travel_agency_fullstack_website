import React from 'react'
import { Tab } from 'semantic-ui-react'
import ReservationsTableToLandlord from "./ReservationsOfMyRoomsTable";
import RoomsTableLandlord from "./RoomsTable";

function LandlordTab(props) {
    const { handleInputChange } = props
    const { isRoomsLoading, rooms, roomIdSearch, handleDeleteRoom, handleSearchRoom } = props
    const { isReservationsLoading, reservations, reservationIdSearch, handleDeleteReservation, handleSearchReservation } = props

    const panes = [
        {
            menuItem: { key: 'rooms', icon: 'bed', content: 'Rooms' },
            render: () => (
                <Tab.Pane loading={isRoomsLoading}>
                    <RoomsTableLandlord
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
                    <ReservationsTableToLandlord
                        reservations={reservations}
                        reservationIdSearch={reservationIdSearch}
                        handleDeleteReservation={handleDeleteReservation}
                        handleInputChange={handleInputChange}
                        handleSearchReservation={handleSearchReservation}
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