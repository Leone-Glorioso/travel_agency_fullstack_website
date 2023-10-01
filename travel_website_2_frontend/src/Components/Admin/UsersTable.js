import React from 'react'
import { Form, Button, Input, Table } from 'semantic-ui-react'

function UsersTable({ users, userUsernameSearch, handleInputChange, handleDeleteUser, handleSearchUser , handleGetLandlords, handleGetClients, handleGetLandlordClients, handleGetUsers}) {
    let userList
    if (users.length === 0) {
        userList = (
            <Table.Row key='no-user'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>No user</Table.Cell>
            </Table.Row>
        )
    } else {
        userList = users.map(user => {
            return (
                <Table.Row key={user.id}>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.surname}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.telephone}</Table.Cell>
                    <Table.Cell>{user.country}</Table.Cell>
                    <Table.Cell>{user.role}</Table.Cell>
                    <Table.Cell collapsing>
                        <Button
                            circular
                            color='red'
                            size='small'
                            icon='trash'
                            onClick={() => handleDeleteUser(user.username)}
                        > Delete </Button>
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <>
            <Form onSubmit={handleSearchUser}>
                <Form.Input
                    action={<Form.Button type={"submit"}> Submit </Form.Button>}
                    name='userUsernameSearch'
                    placeholder='Search by Username'
                    value={userUsernameSearch}
                    onChange={handleInputChange}
                />
            </Form>
            <Button onClick={handleGetUsers}>Get All</Button>
            <Button onClick={handleGetLandlords}>Get Landlords</Button>
            <Button onClick={handleGetClients}>Get Clients</Button>
            <Button onClick={handleGetLandlordClients}>Get Hybrid Users</Button>
            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Name</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Surname</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Email</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Telephone</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Country</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Role</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {userList}
                </Table.Body>
            </Table>
        </>
    )
}

export default UsersTable