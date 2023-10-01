import React, {useState} from 'react'
import './SearchBanner.css'
import { IconButton } from '@mui/material';
import Search from "./Search";

function SearchBanner () {
    const [showSearch,setShowSearch]=useState(false);
    return (
        <div className={'Banner'}>
            <div className={'Search'}>
                {showSearch && <Search></Search>}
                <IconButton onClick={()=>setShowSearch(!showSearch)} className={'SearchButton'} variant={'outlined'}>
                    {showSearch ? "Hide" : "Search Dates"}
                </IconButton>
            </div>
            <div className={'SearchBannerInfo'}>
                <h1>Live your Myth in our modern homes</h1>
                <h2>Plan your vacations worldwide</h2>
            </div>
        </div>
    )
}

export default SearchBanner;