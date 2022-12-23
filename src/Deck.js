import React, { useState } from "react";
import Card from "./Card"

const Deck = () => {
    return (
        <div>
            <h1>Deck of Cards</h1>
            <button>GIMME A CARD!</button>
            <Card />
        </div>
    )
};

export default Deck;