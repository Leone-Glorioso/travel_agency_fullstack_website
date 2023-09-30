import React from 'react';
import {Tab} from "semantic-ui-react";
import UsersTable from "../Admin/UsersTable";
import RoomsTable from "../Admin/RoomsTable";
import ReservationsTable from "../Admin/ReservationsTable";
import RequestsTable from "../Admin/RequestsTable";
import RatingsTable from "../Admin/RatingsTable";
import SentTable from "./SentTable";
import ReceivedTable from "./ReceivedTable";
import {useNavigate} from "react-router-dom";
import './messageStyling.css';

const MessageTab = (props) => {
    const {sent, received} = props
    const {isSent, isReceived} = props
    const navigate = useNavigate()

    const panes = [
        {
            menuItem: { key: 'users', icon: 'users', content: 'Sent' },
            render: () => (
                <Tab.Pane loading={isSent}>
                    <SentTable
                        messages={sent}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: { key: 'rooms', icon: 'bed', content: 'Received' },
            render: () => (
                <Tab.Pane loading={isReceived}>
                    <ReceivedTable
                        messages={received}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: { key: 'newmessage', icon: 'bookmark', content: 'New Message' },
            render: () => (
                navigate("/new_message")
            )
        }
    ]

    return (
        <Tab menu={{ attached: 'top' }} panes={panes}  className={"custom-tab"}/>
    )
};

export default MessageTab;