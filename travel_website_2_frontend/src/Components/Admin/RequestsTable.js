import React from 'react'
import { Form, Button, Input, Table } from 'semantic-ui-react'

function RequestsTable({ requests, requestSearch, handleInputChange, handleDeleteRequest, handleSearchRequest }) {
    let requestList
    if (requests.length === 0) {
        requestList = (
            <Table.Row key='no-user'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>No user</Table.Cell>
            </Table.Row>
        )
    } else {
        requestList = requests.map(request => {
            return (
                <Table.Row key={request.id}>
                    <Table.Cell collapsing>
                        <Button
                            circular
                            color='red'
                            size='small'
                            icon='trash'
                            onClick={() => handleDeleteRequest(request.username)}
                        />
                    </Table.Cell>
                    <Table.Cell>{request.landlord}</Table.Cell>
                    <Table.Cell>{request.verified}</Table.Cell>
                    <Table.Cell>{request.pending}</Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <>
            <Form onSubmit={handleSearchRequest}>
                <Input
                    action={{ icon: 'search' }}
                    name='Search'
                    placeholder='Search'
                    value={requestSearch}
                    onChange={handleInputChange}
                />
            </Form>
            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1} />
                        <Table.HeaderCell width={3}>Landlord</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Verified</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Pending</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {requestList}
                </Table.Body>
            </Table>
        </>
    )
}

export default RequestsTable