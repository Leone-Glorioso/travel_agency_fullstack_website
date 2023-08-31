import React from 'react'
import { Form, Button, Input, Table } from 'semantic-ui-react'

function RequestsTable({ requests, handleGetRequests, handleGetAccepted, handleGetRejected, handleGetPending, handleAccept, handleReject}) {
    let requestList
    if (requests.length === 0) {
        requestList = (
            <Table.Row key='no-request'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>No Request</Table.Cell>
            </Table.Row>
        )
    } else {
        requestList = requests.map(request => {
            return (
                <Table.Row key={request.landlord}>
                    <Table.Cell>{request.landlord}</Table.Cell>
                    <Table.Cell>{request.verified}</Table.Cell>
                    <Table.Cell>{request.pending}</Table.Cell>
                    <Table.Cell collapsing>
                        {request.pending === true &&
                        <Button
                            circular
                            color='green'
                            size='small'
                            icon='trash'
                            onClick={handleAccept(request.landlord)}
                        />
                        }
                    </Table.Cell>
                    <Table.Cell collapsing>
                        {request.pending === true &&
                            <Button
                            circular
                            color='red'
                            size='small'
                            icon='trash'
                            onClick={handleReject(request.landlord)}
                        />
                        }
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <>
            <Button onClick={handleGetRequests} />
            <Button onClick={handleGetAccepted} />
            <Button onClick={handleGetRejected} />
            <Button onClick={handleGetPending} />
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