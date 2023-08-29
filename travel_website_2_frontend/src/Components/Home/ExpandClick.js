// import React, {useState} from "react";
// import { IconButton, List, ListItem, ListItemText, Collapse } from '@mui/material';
// import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
//
//
// const ExpandList=({urls}) => {
//     const [shown,setShown]=useState(false);
//
//     const handleClick= () =>{
//         setShown(!shown);
//     }
//
//     return (
//         <div>
//             <IconButto
//         </div>
//     )
// }

import React, {useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Link} from "react-router-dom"
import "./ExpandClick.css"




const ExpandClick = () =>{
    const [isExpanded,setIsExpanded]=useState(false);


    const handleClick= () =>{
        setIsExpanded(!isExpanded);
    }

    return(
        <div>
            <ExpandMoreIcon className={"expandMoreIcon"} onClick={handleClick} />
            {isExpanded ? (
                <div className="expandedContent" >
                    <div className="linkContainer">
                        <div className="signunColumn">
                            <Link to={"/signup"}>Sign Up</Link>
                        </div>
                        <div className="loginColumn">
                            <Link to={"/login"}> Login </Link>
                        </div>
                        <div className="roomsColumn">
                            <Link to="/rooms">Rooms</Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="collapsed-content" />
            )}
        </div>
    )
    }

export default ExpandClick
