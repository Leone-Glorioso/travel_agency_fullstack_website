import React from 'react'
import './Header.css'
import WebSiteLogo from '../../logo_1.png'
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar } from '@mui/material';
import ExpandClick from "./ExpandClick";


function Header(){
    return (
        <div className={'header'}>

            <img className={'header_left'}
                 src={WebSiteLogo}
                 alt={"Web site logo"}
            />
        </div>


    )
}
export default Header