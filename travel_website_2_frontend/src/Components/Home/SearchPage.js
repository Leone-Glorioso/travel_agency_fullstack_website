import React, { useState, useEffect } from 'react';
import {useLocation} from "react-router-dom";
import Card from "./Card"
import FilterWindow from "../Search/FilterWindow";
import RoomsPanel from "../Search/RoomsPanel";
function SearchPage () {

    // Define state variables for search results and filters
    const {state}=useLocation()
    const {data}=state
    console.log(data)
    const [rooms, SetRooms] = useState([])


    // const [searchResults, setSearchResults] = useState([]);
    // const [filters, setFilters] = useState({
    //     // Define your initial filter options here
    //     minPrice: 0,
    //     maxPrice: 1000,
    //     minGuests: 1,
    //     // Add more filters as needed
    // });

    // const cards={}
    // for(let value in data){
    //     cards.append(<Card src={"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdXNlJTIwb3V0ZG9yJTIwbW9kZXJufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"} title={"takis"} description={value.description} price={value.ppn} />)
    // }
    // data.forEach((value) => {
    //     cards.append(<Card src={"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdXNlJTIwb3V0ZG9yJTIwbW9kZXJufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"} title={"takis"} description={value.description} price={value.ppn} />)
    // })



    // Define a function to update filters
    // const handleFilterChange = (event) => {
    //     const { name, value } = event.target;
    //     setFilters({ ...filters, [name]: value });
    // };

    return (
        <div className="search-page">
            {/*<div className="search-filters">*/}
            {/*    /!* Add filter inputs here *!/*/}
            {/*    <input*/}
            {/*        type="number"*/}
            {/*        name="minPrice"*/}
            {/*        value={filters.minPrice}*/}
            {/*        onChange={handleFilterChange}*/}
            {/*        placeholder="Min Price"*/}
            {/*    />*/}
            {/*    <input*/}
            {/*        type="number"*/}
            {/*        name="maxPrice"*/}
            {/*        value={filters.maxPrice}*/}
            {/*        onChange={handleFilterChange}*/}
            {/*        placeholder="Max Price"*/}
            {/*    />*/}
            {/*    <input*/}
            {/*        type="number"*/}
            {/*        name="minGuests"*/}
            {/*        value={filters.minGuests}*/}
            {/*        onChange={handleFilterChange}*/}
            {/*        placeholder="Min Guests"*/}
            {/*    />*/}
            {/*    /!* Add more filter inputs as needed *!/*/}
            {/*</div>*/}

            {/*<div className="search-results">*/}
            {/*    <h2>Search Results</h2>*/}
            {/*    /!* Render search results here *!/*/}
            {/*    <ul>*/}
            {/*        {searchResults.map((room, index) => (*/}
            {/*            <li key={index}>{room.name}</li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</div>*/}
            <FilterWindow SetRooms={SetRooms}/>
            <RoomsPanel rooms={rooms} />
            {/*{*/}
            {/*    JSON.parse(data).map(function(object,i) {*/}
            {/*        return <Card src={"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdXNlJTIwb3V0ZG9yJTIwbW9kZXJufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"} title={"takis"} description={object.description} price={*/}
            {/*            <object data="" type=""></object>.ppn}/>*/}
            {/*    })*/}
            {/*}*/}
        </div>

    );
}

export default SearchPage;