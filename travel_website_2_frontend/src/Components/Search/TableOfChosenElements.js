import React from 'react';
import {Table} from "semantic-ui-react";
import './stylesOfChosen.css';

const TableOfChosenElements = ({flags, dict}) => {

    let list = flags.map(flag => {

        if(flag === 'dates' || flag === 'location' || flag === 'bedrooms' || flag === 'beds' || flag === 'baths' || flag === 'area')
            return null

        return(
            <Table.Row key={flag}>
                {(dict[flag] == true) && <Table.Cell className={"chosen"}>{flag}</Table.Cell>}
                {(dict[flag] != true) && <Table.Cell className={"not_chosen"}>{flag}</Table.Cell>}
            </Table.Row>
        )
    })

    console.log(flags)
    console.log(dict)
    console.log(list)

    return (
        <Table className={"table_design"}>
            <Table.Body>
                    {list}
            </Table.Body>
        </Table>

    );
};

export default TableOfChosenElements;