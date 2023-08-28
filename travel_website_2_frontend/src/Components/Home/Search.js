import React, {useState} from 'react'
import './Search.css'
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"
import {DateRangePicker} from "react-date-range"
import {IconButton} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';



function Search(){
    const [startDate,setStartDate]=useState(new Date())
    const [endDate,setEndDate]=useState(new Date())

    const selectionRange={
        startDate:startDate,
        endDate:endDate,
        key:"selection"
    }

    function handleSelect(ranges){
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    return (
        <div className={'search'}>
            <DateRangePicker ranges={[selectionRange]} onChange={handleSelect}></DateRangePicker>
            <h1>
                Number of guests
                <PeopleIcon/>
            </h1>
            <input min={0} defaultValue={2} type={"number"} />
            <IconButton>Search Room</IconButton>

        </div>
    )
}

export default Search