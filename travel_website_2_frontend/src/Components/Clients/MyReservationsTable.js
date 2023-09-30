import React from 'react'
import { Form, Button, Input, Table } from 'semantic-ui-react'

function MyReservationsTableClient({ reservations, reservationIdSearch, handleInputChange, handleSearchReservation, handleGetReservations }) {
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
                <Form.Input
                    action={<Button type="submit" primary>
                        Submit
                    </Button>}
                    name='reservationSearch'
                    placeholder='Search'
                    value={reservationIdSearch}
                    onChange={handleInputChange}
                />

            </Form>
            <Button onClick={handleGetReservations}>Get All</Button>
            <Table compact striped selectable >
                <Table.Header>
                    <Table.Row>
                        {/*<Table.HeaderCell width={1} />*/}
                        <Table.HeaderCell width={4}>Id</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Price per Night</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Start Date</Table.HeaderCell>
                        <Table.HeaderCell width={2}>End Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {reservationList}
                </Table.Body>
            </Table>
        </>
    )
}

export default MyReservationsTableClient