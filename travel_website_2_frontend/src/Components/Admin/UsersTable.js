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
                    <Table.Cell collapsing>
                    </Table.Cell>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.surname}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.telephone}</Table.Cell>
                    <Table.Cell>{user.country}</Table.Cell>
                    <Table.Cell>{user.role}</Table.Cell>
                    <Button
                        circular
                        color='red'
                        size='small'
                        icon='trash'
                        onClick={() => handleDeleteUser(user.username)}
                    />
                </Table.Row>
            )
        })
    }

    return (
        <>
            <Form onSubmit={handleSearchUser}>
                <Input
                    action={{ icon: 'search' }}
                    name='userUsernameSearch'
                    placeholder='Search by Username'
                    value={userUsernameSearch}
                    onChange={handleInputChange}
                />
            </Form>
            <Button onClick={handleGetUsers} />
            <Button onClick={handleGetLandlords} />
            <Button onClick={handleGetClients} />
            <Button onClick={handleGetLandlordClients} />
            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1} />
                        <Table.HeaderCell width={3}>Id</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Username</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Name</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Surname</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Email</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Telephone</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Country</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Role</Table.HeaderCell>
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