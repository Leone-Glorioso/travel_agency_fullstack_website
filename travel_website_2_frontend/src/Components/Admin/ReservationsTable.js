import React from 'react'
import { Form, Button, Input, Table } from 'semantic-ui-react'

function ReservationsTable({ reservations, reservationIdSearch, reservationRoomSearch, reservationClientSearch, reservationLandlordSearch, handleInputChange,
                               handleDeleteReservation, handleSearchReservationId , handleSearchReservationRoom , handleSearchReservationClient , handleSearchReservationLandlord,
                                handleGetReservations}) {
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
                    <Table.Cell collapsing>
                        <Button
                            circular
                            color='red'
                            size='small'
                            icon='trash'
                            onClick={() => handleDeleteReservation(reservation.id)}
                        > Delete </Button>
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <>
            <Form onSubmit={handleSearchReservationId}>
                <Input
                    action={<Button type={"submit"}> Submit</Button>}
                    name='SearchReservationId'
                    placeholder='Search by Id'
                    value={reservationIdSearch}
                    onChange={handleInputChange}
                />
            </Form>
            <Form onSubmit={handleSearchReservationRoom}>
                <Input
                    action={<Button type={"submit"}> Submit</Button>}
                    name='SearchReservationRoom'
                    placeholder='Search by Room Name'
                    value={reservationRoomSearch}
                    onChange={handleInputChange}
                />
            </Form>
            <Form onSubmit={handleSearchReservationClient}>
                <Input
                    action={<Button type={"submit"}> Submit</Button>}
                    name='SearchReservationClient'
                    placeholder='Search by Client Username'
                    value={reservationClientSearch}
                    onChange={handleInputChange}
                />
            </Form>
            <Form onSubmit={handleSearchReservationLandlord}>
                <Input
                    action={<Button type={"submit"}> Submit</Button>}
                    name='SearchReservationLandlord'
                    placeholder='Search by Landlrod Username'
                    value={reservationLandlordSearch}
                    onChange={handleInputChange}
                />
            </Form>
            <Button onClick={handleGetReservations}>Get All</Button>
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

export default ReservationsTable