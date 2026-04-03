import { useLocation, useNavigate } from 'react-router-dom';
import FlashcardSetCard from '../components/FlashcardSetCard';
import type { Key } from 'react';

export default function SetView() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const classFolder = state || {};

    return (
        <div className="set-view-container">
            <button onClick={() => navigate(-1)}className="return-btn">{'<'} Back</button>
            <h1 className="title-blue">{classFolder.title}</h1>
            <div className="flashcard-sets">
                {classFolder.flashcardSets?.map((set: any, index: Key | null | undefined) => (
                    <FlashcardSetCard
                        key={index}
                        title={set.title}
                        description={set.description}
                        cardCount={set.cardCount}
                        dateCreated={set.dateCreated}
                        isPrivate={set.isPrivate}
                        flashcards={set.flashcards}
                    />
                ))}
            </div>
        </div>
    );
}