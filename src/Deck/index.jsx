
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Deck = () => {
    const [deckId, setDeckId] = useState(null);
    const [cards, setCards] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/');
                setDeckId(data.deck_id);
            } catch (error) {
                console.error('Error fetching deck:', error);
            }
        };

        fetchData();
    }, []);

    const drawCard = async () => {
        try {
            const { data } = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw?count=1`);
            setCards(prevCards => [...prevCards, data.cards[0]]);
        } catch (error) {
            console.error('Error drawing card:', error);
        }
    };

    return (
        <div className="deck-container">
            <div className="center">
                <button className="draw-button" onClick={drawCard}>Draw a Card</button>
            </div>
            <div className="card-container">
                {cards.map((card, index) => (
                    <img
                        key={index}
                        src={card.image}
                        alt={card.code}
                        className={`card ${index === cards.length - 1 ? 'top-card' : ''}`}
                        style={{ transform: `rotate(${Math.random() * 20 - 10}deg) translateX(${Math.random() * 20 - 10}px)` }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Deck;







