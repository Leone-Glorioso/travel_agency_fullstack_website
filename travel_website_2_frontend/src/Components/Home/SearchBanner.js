import React from 'react'
import './SearchBanner.css'
import { IconButton } from '@mui/material';

function SearchBanner () {
    return (
        <div className={'SearchBanner'}>
            <h1>Banner</h1>
            <div className={'ButtonSearchNearBy'}>
                <IconButton variant={'outlined'}>
                    Explore Nearby
                </IconButton>
            </div>
        </div>
    )
}

export default SearchBanner;