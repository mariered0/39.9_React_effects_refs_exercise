//Part 2

import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import Card from "./Card"


const Deck = () => {
    const url = 'https://deckofcardsapi.com/api/deck/'

    const [cards, setCards] = useState([]);
    const [deck, setDeck] = useState(null);
    const [autoDraw, setAutoDraw] = useState(false);

    const timerRef = useRef();
    useEffect(() => {
        //prepare deck
        async function getData() {
            let d = await axios.get(`${url}new/shuffle/`);
            setDeck(d.data);
        }
        getData();
        }, [setDeck]);

    useEffect(() => {
        async function getCard() {
            let { deck_id } = deck;

            try{
                let drawRes = await axios.get(`${url}${deck_id}/draw/`);

                if(drawRes.data.remaining === 0) {
                    setAutoDraw(false);
                    throw new Error("no cards remaining!");
                }

                const card = drawRes.data.cards[0];

                setCards(d => [
                    ...d, {id: card.code, name: card.suit + " " + card.value, image: card.image}
                ]);
                console.log(cards);
            } catch (err){
                alert(err);
            }
        }

        if (autoDraw && !timerRef.current) {
            timerRef.current = setInterval(async () => {
                await getCard();
            }, 1000);
        }

        return () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
        };
    }, [autoDraw, setAutoDraw, deck]);

    const toggleAutoDraw = () => {
        setAutoDraw(auto => !auto);
    };

    const cardComponents = cards.map(c => (
        <Card key={c.id} name={c.name} image={c.image} />
    ));
    

    return (
        <div className="Deck">
            <h1>Deck of Cards</h1>
            {deck ? (
                <button className="Deck-btn" onClick={toggleAutoDraw}>
                    {autoDraw ? "Stop" : "Keep"} Drawing!
                </button>
            ) : null}
        <div className="Deck-cards">{cardComponents}</div>
        </div>
    );
};

export default Deck;