import React from 'react';
import {Button, Table} from "semantic-ui-react";

const ReceivedTable = ({messages}) => {
    let messageList
    if (messages.length === 0) {
        messageList = (
            <Table.Row key='no-request'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>No Request</Table.Cell>
            </Table.Row>
        )
    } else {
        messageList = messages.map(message => {
            return (
                <Table.Row key={message.sender}>
                    <Table.Cell>{message.sender}</Table.Cell>
                    <Table.Cell>{message.body}</Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <>
            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>Sender</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Body</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {messageList}
                </Table.Body>
            </Table>
        </>
    )
};

export default ReceivedTable;