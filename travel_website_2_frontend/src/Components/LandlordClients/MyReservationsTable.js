import React from 'react'
import { Form, Button, Input, Table } from 'semantic-ui-react'

function ReservationsTableFromLandlordClient({ reservations, reservationIdSearch, handleInputChange, handleDeleteReservation, handleSearchReservation }) {
    let reservationList
    if (reservations.length === 0) {
        reservationList = (
            <Table.Row key='no-user'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>No reservations</Table.Cell>
            </Table.Row>
        )
    } else {
        reservationList = reservations.map(reservation => {
            return (
                <Table.Row key={reservation.id}>
                    <Table.Cell collapsing>
                        <Button
                            circular
                            color='red'
                            size='small'
                            icon='trash'
                            onClick={() => handleDeleteReservation(reservation.id)}
                        />
                    </Table.Cell>
                    <Table.Cell>{reservation.id}</Table.Cell>
                    <Table.Cell>{reservation.ppn}</Table.Cell>
                    <Table.Cell>{reservation.start}</Table.Cell>
                    <Table.Cell>{reservation.end}</Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <>
            <Form onSubmit={handleSearchReservation}>
                <Input
                    action={{ icon: 'search' }}
                    name='Search'
                    placeholder='Search'
                    value={reservationIdSearch}
                    onChange={handleInputChange}
                />
            </Form>
            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1} />
                        <Table.HeaderCell width={3}>Id</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Price per Night</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Start Date</Table.HeaderCell>
                        <Table.HeaderCell width={4}>End Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {reservationList}
                </Table.Body>
            </Table>
        </>
    )
}

export default ReservationsTableFromLandlordClient