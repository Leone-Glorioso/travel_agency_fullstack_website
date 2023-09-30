import React from 'react'
import { Form, Button, Input, Table } from 'semantic-ui-react'

function RoomsTableLandlord({ rooms, roomIdSearch, handleInputChange, handleDeleteRoom, handleSearchRoomId, handleGetRooms }) {
    let roomList
    if (rooms.length === 0) {
        roomList = (
            <Table.Row key='no-room'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>No room</Table.Cell>
            </Table.Row>
        )
    } else {
        roomList = rooms.map(room => {
            return (
                <Table.Row key={room.id}>
                    <Table.Cell>{room.id}</Table.Cell>
                    <Table.Cell>{room.name}</Table.Cell>
                    <Table.Cell>{room.typeOfRoom}</Table.Cell>
                    <Table.Cell>{room.numofbeds}</Table.Cell>
                    <Table.Cell>{room.numofbedrooms}</Table.Cell>
                    <Table.Cell>{room.numofbaths}</Table.Cell>
                    <Table.Cell>{room.area}</Table.Cell>
                    <Table.Cell>{room.livingroom.toString()}</Table.Cell>
                    <Table.Cell>{room.smoking.toString()}</Table.Cell>
                    <Table.Cell>{room.pets.toString()}</Table.Cell>
                    <Table.Cell>{room.events.toString()}</Table.Cell>
                    <Table.Cell>{room.internet.toString()}</Table.Cell>
                    <Table.Cell>{room.cooling.toString()}</Table.Cell>
                    <Table.Cell>{room.heating.toString()}</Table.Cell>
                    <Table.Cell>{room.kitchen.toString()}</Table.Cell>
                    <Table.Cell>{room.tv.toString()}</Table.Cell>
                    <Table.Cell>{room.parking.toString()}</Table.Cell>
                    <Table.Cell>{room.elevator.toString()}</Table.Cell>
                    <Table.Cell>{room.description}</Table.Cell>
                    <Table.Cell collapsing>
                        <Button
                            circular
                            color='red'
                            size='small'
                            icon='trash'
                            onClick={() => handleDeleteRoom(room.id)}
                        > Delete </Button>
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <>
            <Form onSubmit={handleSearchRoomId}>
                <Input
                    action={<Button type={"submit"}> Submit</Button>}
                    name='SearchRoomId'
                    placeholder='Search'
                    value={roomIdSearch}
                    onChange={handleInputChange}
                />
            </Form>
            <Button onClick={handleGetRooms}>Get All</Button>
            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1} />
                        <Table.HeaderCell width={3}>Id</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Name</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Type Of Room</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Number of Beds</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Number of Bedrooms</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Number of Baths</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Area</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Living Room</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Smoking</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Pets</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Events</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Internet</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Cooling</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Heating</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Kitchen</Table.HeaderCell>
                        <Table.HeaderCell width={5}>TV</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Parking</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Elevator</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Description</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {roomList}
                </Table.Body>
            </Table>
        </>
    )
}

export default RoomsTableLandlord