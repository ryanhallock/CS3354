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
        <div className="text-left p-5">
            <button onClick={() => navigate(-1)} className="mt-3 px-[14px] py-[10px] bg-primary text-white rounded-lg border-none cursor-pointer w-fit hover:bg-gray-300">{'<'} Back</button>
            <div className="p-5 justify-between flex">
                <div className="p-5 flex flex-col items-start">
                    <h1 className="text-[22px] font-medium text-heading justify-self-start" style={{ margin: '10px 0' }}>{card.title || 'Untitled'}</h1>
                    <p>Description: {card.description || 'No description available'}</p>
                    <p>Number of Cards: {flashcards.length ?? 'N/A'}</p>
                    <p>Date Created: {card.dateCreated ?? 'Unknown'}</p>
                    <p>Status: {card.isPrivate ? 'Private' : 'Public'}</p>
                </div>
                <div>
                    <h2 className="text-[22px] font-medium text-heading justify-self-start m-5">Flashcards</h2>
                    {flashcards.length > 0 ? (
                        <div className="flex flex-col items-center gap-5">
                            <div
                                onClick={handleCardClick}
                                className="w-[400px] h-[250px] rounded-[10px] flex items-center justify-center cursor-pointer bg-surface shadow-[0_4px_8px_rgba(0,0,0,0.1)] transition-transform duration-300 relative"
                                style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                            >
                                <div
                                    className={`text-center text-2xl font-bold ${isFlipped ? 'text-[#333]' : 'text-primary'}`}
                                    style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                                >
                                    {isFlipped ? currentCard.definition : currentCard.word}
                                </div>
                            </div>
                            <div className="flex gap-[10px] items-center">
                                <button
                                    onClick={handlePrevCard}
                                    disabled={currentCardIndex === 0}
                                    className={`px-5 py-[10px] border-none rounded-[5px] text-white ${currentCardIndex === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary cursor-pointer'}`}
                                >
                                    Previous
                                </button>
                                <span className="text-base text-[#666]">
                                    {currentCardIndex + 1} / {flashcards.length}
                                </span>
                                <button
                                    onClick={handleNextCard}
                                    disabled={currentCardIndex === flashcards.length - 1}
                                    className={`px-5 py-[10px] border-none rounded-[5px] text-white ${currentCardIndex === flashcards.length - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary cursor-pointer'}`}
                                >
                                    Next
                                </button>
                            </div>
                            <p className="text-sm text-[#666] text-center">
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
