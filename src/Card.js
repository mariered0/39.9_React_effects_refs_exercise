import React from "react";
import "./Card.css"

const Card = ({code, value, suit, image}) => {

    // let angle = Math.random() * 90 - 45;
    // let randomX = Math.random() * 40 - 20;
    // let randomY = Math.random() * 40 - 20;
    // let styles = {
    //     transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`


    // }
    

    return (
        // <div className="Card-div">
        <img className="Card-img" src={image} 
        // style={styles}
        />
        // </div>
    )
};

export default Card;