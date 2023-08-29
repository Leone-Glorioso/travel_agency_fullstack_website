import React from "react";
import "./Card.css"

function Card({src,title,description,price}){
    return (
        <div className={"card"}>
            <img src={src} alt={"Home"}/>
            <div className={"cardInfo"}>
                <h1>{title}</h1>
                <h4>{description}</h4>
                <h5>{price}</h5>
            </div>
        </div>
    )
}

export default Card;