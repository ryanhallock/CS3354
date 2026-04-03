import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function StudyView() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const card = state || {};
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const flashcards = card.flashcards || [];
    const currentCard = flashcards[currentCardIndex];

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNextCard = () => {
        if (currentCardIndex < flashcards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setIsFlipped(false);
        }
    };

    const handlePrevCard = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
            setIsFlipped(false);
        }
    };

    return (
        <div style={{ textAlign: 'left',padding: '20px' }}>
            <button onClick={() => navigate(-1)}className="return-btn">{'<'} Back</button>
            <div style={{ padding: '20px', justifyContent: 'space-between', alignItems: 'space-between', display: 'flex'}}>
            <div style={{ padding: '20px',display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <h1 className="title" style={{margin: '10px 0'}}>{card.title || 'Untitled'}</h1>
                <p>Description: {card.description || 'No description available'}</p>
                <p>Number of Cards: {flashcards.length ?? 'N/A'}</p>
                <p>Date Created: {card.dateCreated ?? 'Unknown'}</p>
                <p>Status: {card.isPrivate ? 'Private' : 'Public'}</p>
            </div>
            <div>
                <h2 className="title">Flashcards</h2>
                {flashcards.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <div 
                            onClick={handleCardClick}
                            style={{
                                width: '400px',
                                height: '250px',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                backgroundColor: 'white',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                transition: 'transform 0.3s ease',
                                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                position: 'relative'
                            }}
                        >
                            <div style={{
                                textAlign: 'center',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: isFlipped ? '#333' : '#1C208A',
                                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                            }}>
                                {isFlipped ? currentCard.definition : currentCard.word}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <button 
                                onClick={handlePrevCard}
                                disabled={currentCardIndex === 0}
                                style={{
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    backgroundColor: currentCardIndex === 0 ? '#ccc' : '#1C208A',
                                    color: 'white',
                                    cursor: currentCardIndex === 0 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Previous
                            </button>
                            <span style={{ fontSize: '16px', color: '#666' }}>
                                {currentCardIndex + 1} / {flashcards.length}
                            </span>
                            <button 
                                onClick={handleNextCard}
                                disabled={currentCardIndex === flashcards.length - 1}
                                style={{
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    backgroundColor: currentCardIndex === flashcards.length - 1 ? '#ccc' : '#1C208A',
                                    color: 'white',
                                    cursor: currentCardIndex === flashcards.length - 1 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Next
                            </button>
                        </div>
                        <p style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
                            Click the card to flip between term and definition
                        </p>
                    </div>
                ) : (
                    <p>No flashcards available.</p>
                )}
            </div>
            </div>
        </div>

    );
}