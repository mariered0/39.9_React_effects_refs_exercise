import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import Card from "./Card"


const Deck = () => {
    const url = 'https://deckofcardsapi.com/api/deck/'
    
    // const [deckId, setDeckId] = useState(null);
    const [cards, setCards] = useState(null);
    const deckIdRef = useRef();
    const cardRemainingRef = useRef();
    // useEffect(() => {
    //     axios.get(`${url}new/draw/?count=1`).then(res => {
    //         console.log(res.data);
    //         const {code, value, suit, image} = res.data.cards[0];
    //         setCards([{code, value, suit, image, id:res.data.remaining }]);
    //         deckIdRef.current = res.data.deck_id;
    //         cardRemainingRef.current = res.data.remaining;
    //         console.log('deckIdRef', deckIdRef);
    // })
    // }, [deckId]);

    const nextCard = (newCard) => {
        axios.get(`${url}${deckIdRef.current}/draw/?count=1`).then(res => {
            const {code, value, suit, image} = res.data.cards[0];
            setCards(cards => [...cards, {code, value, suit, image, id:res.data.remaining}])
            cardRemainingRef.current = res.data.remaining;
            console.log('cards:', cards);
            console.log('deckId', deckIdRef);
            console.log('card remaining',)
        })
    }

    // setTimeout(() => {
    // if (cardRemainingRef.current === 0) {
    //     alert('Error: no cards remaining!');
    // }
    // }, 1000);

    //Part 2
    const [timerOn, setTimer] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const timerId = useRef();
    useEffect(() => {
        //first card
        axios.get(`${url}new/draw/?count=1`).then(res => {
            const {code, value, suit, image} = res.data.cards[0];
            setCards([{code, value, suit, image, id:res.data.remaining }]);
            deckIdRef.current = res.data.deck_id;
            cardRemainingRef.current = res.data.remaining;
        })
        
        timerId.current = setInterval(() => {
            setSeconds(seconds => seconds +1)
            //draw the second card and more
            nextCard();
        }, 1000)

        return () => {
            clearInterval(timerId.current);
        }
        }, [])
       
    const stopDrawing = () => {
        clearInterval(timerId.current);
    }

    const toggleButton = () => {
        setTimer(!timerOn);
    }

    return (
        <div>
            <h1>Deck of Cards</h1>
            {/* <button onClick={nextCard}>GIMME A CARD!</button> */}
            <button onClick={stopDrawing}>On/Off</button>
            <div>
                <h1>{seconds}</h1>
                <h3>{cards ? cards.map(({ code, value, suit, image, id }) => (
                    <Card
                    key={id} 
                    code={code}
                    value={value}
                    suit={suit}
                    image={image} />
                )) : 'Loading...'}</h3>
            </div>
        </div>
    )
}

export default Deck;