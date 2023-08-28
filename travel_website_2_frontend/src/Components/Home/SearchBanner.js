import React, {useState} from 'react'
import './SearchBanner.css'
import { IconButton } from '@mui/material';

function SearchBanner () {
    const [showSearch,setShowSearch]=useState(false);
    return (
        <div className={'SearchBanner'}>
            <div className={'Search'}>
                {showSearch && <h1>SHOW DATE</h1>}
                <IconButton onClick={()=>setShowSearch(!showSearch)} className={'SearchButton'} variant={'outlined'}>
                    Search Dates
                </IconButton>
            </div>
            <div className={'SearchBannerInfo'}>
                <h1>Live your Myth in our modern homes</h1>
                <h2>Plan your vacations worldwide</h2>
            </div>
                <IconButton variant={'outlined'}>
                    Explore Nearby
                </IconButton>
        </div>
    )
}

export default SearchBanner;