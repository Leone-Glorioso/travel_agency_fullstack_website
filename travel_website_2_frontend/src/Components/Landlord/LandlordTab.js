import React from 'react'
import {Button, Tab} from 'semantic-ui-react'
import ReservationsTableToLandlord from "./ReservationsOfMyRoomsTable";
import RoomsTableLandlord from "./RoomsTable";
import {useNavigate} from "react-router-dom";
import '../CommonPage/messageStyling.css';

function LandlordTab(props) {
    const { handleInputChange } = props
    const { isRoomsLoading, rooms, roomIdSearch, handleDeleteRoom, handleSearchRoomId, handleGetRooms } = props
    const { isReservationsLoading, reservations, reservationIdSearch, reservationRoomSearch, reservationClientSearch,
        handleDeleteReservation, handleSearchReservationId , handleSearchReservationRoom , handleSearchReservationClient ,
        handleGetReservations} = props
    const navigate = useNavigate()

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
                        handleSearchRoomId={handleSearchRoomId}
                        handleGetRooms={handleGetRooms}
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
                        handleInputChange={handleInputChange}
                        handleGetReservations={handleGetReservations}
                        handleDeleteReservation={handleDeleteReservation}
                        handleSearchReservationId={handleSearchReservationId}
                        handleSearchReservationClient={handleSearchReservationClient}
                        handleSearchReservationRoom={handleSearchReservationRoom}
                        reservationClientSearch={reservationClientSearch}
                        reservationRoomSearch={reservationRoomSearch}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: { key: 'newRoom', icon: 'bookmark', content: 'newRoom' },
            render: () => (
                navigate("/new_room")
            )
        }
    ]

    return (
        <Tab menu={{ attached: 'top' }} panes={panes}  className={"custom-tab"} />
    )
}

export default LandlordTab