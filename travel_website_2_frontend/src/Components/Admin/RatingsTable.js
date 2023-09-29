import React from 'react';
import {Button, Form, Input, Table} from "semantic-ui-react";

function RatingsTable({ ratings, handleGetRatings, ratingIdSearch, ratingRoomSearch,
                          ratingClientSearch, handleSearchRatingId , handleSearchRatingRoom , handleSearchRatingClient, handleDeleteRating, handleInputChange}) {
    let ratingsList
    if (ratings.length === 0) {
        ratingsList = (
            <Table.Row key='no-request'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>No Request</Table.Cell>
            </Table.Row>
        )
    } else {
        ratingsList = ratings.map(rating => {
            return (
                <Table.Row key={rating.id}>
                    <Table.Cell>{rating.id}</Table.Cell>
                    <Table.Cell>{rating.rating}</Table.Cell>
                    <Table.Cell>{rating.description}</Table.Cell>
                    <Table.Cell>{rating.user}</Table.Cell>
                    <Table.Cell>{rating.room}</Table.Cell>
                    <Table.Cell collapsing>
                        <Button
                            circular
                            color='red'
                            size='small'
                            icon='trash'
                            onClick={() => handleDeleteRating(rating.id)}
                        > Delete </Button>
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <>
            <Form onSubmit={handleSearchRatingId}>
                <Input
                    action={<Button type={"submit"}> Submit</Button>}
                    name='SearchRatingId'
                    placeholder='Search by Id'
                    value={ratingIdSearch}
                    onChange={handleInputChange}
                />
            </Form>
            <Form onSubmit={handleSearchRatingRoom}>
                <Input
                    action={<Button type={"submit"}> Submit</Button>}
                    name='SearchRatingRoom'
                    placeholder='Search by Room Name'
                    value={ratingRoomSearch}
                    onChange={handleInputChange}
                />
            </Form>
            <Form onSubmit={handleSearchRatingClient}>
                <Input
                    action={<Button type={"submit"}> Submit</Button>}
                    name='SearchRatingClient'
                    placeholder='Search by Client Name'
                    value={ratingClientSearch}
                    onChange={handleInputChange}
                />
            </Form>
            <Button onClick={handleGetRatings}>Get All</Button>
            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        {/*<Table.HeaderCell width={1} />*/}
                        <Table.HeaderCell width={3}>Id</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Rating</Table.HeaderCell>
                        <Table.HeaderCell width={11}>Description</Table.HeaderCell>
                        <Table.HeaderCell width={3}>User Username</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Room Name</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {ratingsList}
                </Table.Body>
            </Table>
        </>
    )
};

export default RatingsTable;