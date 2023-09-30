import React from 'react'
import { Tab } from 'semantic-ui-react'
import ReservationsTableFromLandlordClient from "./MyReservationsTable";
import ReservationsTableToLandlordClient from "./ReservationsOfMyRoomsTable";
import RoomsTableLandlordClient from "./RoomsTable";
import {useNavigate} from "react-router-dom";
import '../CommonPage/messageStyling.css';

function LandlordTab(props) {
    const { handleInputChange } = props
    const { isRoomsLoading, rooms, roomIdSearch, handleDeleteRoom, handleSearchRoomId, handleGetRooms } = props
    const { isReservationsLoading_to, reservations, reservationIdSearch, reservationRoomSearch, reservationClientSearch,
        handleDeleteReservation, handleSearchReservationId , handleSearchReservationRoom , handleSearchReservationClient ,
        handleGetReservations } = props
    const { isReservationsLoading_from, reservations_from, reservationIdSearch_from, handleSearchReservation_from, handleGetReservations_from } = props
    const navigate = useNavigate()

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
                        handleSearchRoomId={handleSearchRoomId}
                        handleGetRooms={handleGetRooms}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: { key: 'reservations', icon: 'bookmark', content: 'Reservations' },
            render: () => (
                <Tab.Pane loading={isReservationsLoading_to}>
                    <ReservationsTableToLandlordClient
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
            menuItem: { key: 'reservationsFrom', icon: 'bookmark', content: 'ReservationsFrom' },
            render: () => (
                <Tab.Pane loading={isReservationsLoading_from}>
                    <ReservationsTableFromLandlordClient
                        reservations={reservations_from}
                        reservationIdSearch={reservationIdSearch_from}
                        handleInputChange={handleInputChange}
                        handleSearchReservation={handleSearchReservation_from}
                        handleGetReservations={handleGetReservations_from}
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