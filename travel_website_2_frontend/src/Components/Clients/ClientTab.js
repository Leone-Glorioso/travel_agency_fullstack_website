import React from 'react'
import { Tab } from 'semantic-ui-react'
import MyReservationsTableClient from "./MyReservationsTable";

function ClientTab(props) {
    const { handleInputChange } = props
    const { isReservationsLoading, reservations, reservationIdSearch, handleSearchReservation , handleGetReservations} = props

    const panes = [
        {
            menuItem: { key: 'reservations', icon: 'bookmark', content: 'Reservations' },
            render: () => (
                <Tab.Pane loading={isReservationsLoading}>
                    <MyReservationsTableClient
                        reservations={reservations}
                        reservationIdSearch={reservationIdSearch}
                        // handleDeleteReservation={handleDeleteReservation}
                        handleInputChange={handleInputChange}
                        handleSearchReservation={handleSearchReservation}
                        handleGetReservations={handleGetReservations}
                    />
                </Tab.Pane>
            )
        }
    ]

    return (
        <Tab menu={{ attached: 'top' }} panes={panes} />
    )
}

export default ClientTab