import { useLocation, useNavigate } from 'react-router-dom';

export default function StudyView() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const card = state || {};

    return (
        <div style={{ textAlign: 'left' }}>
            <button onClick={() => navigate(-1)}className="primary-btn" style={{ justifySelf: 'left' }}>{'<'} Back</button>
            <div style={{ padding: '20px', justifyContent: 'space-between', alignItems: 'space-between', display: 'flex'}}>
            <div style={{ padding: '20px',display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <h1 className="title" style={{margin: '10px 0'}}>{card.title || 'Untitled'}</h1>
                <p>Description: {card.description || 'No description available'}</p>
                <p>Number of Cards: {card.cardCount ?? 'N/A'}</p>
                <p>Date Created: {card.dateCreated ?? 'Unknown'}</p>
                <p>Status: {card.isPrivate ? 'Private' : 'Public'}</p>
            </div>
            <div>
                <h2 className="title">Flashcards</h2>
                {card.flashcards && card.flashcards.length > 0 ? (
                    <ul>
                        {card.flashcards.map((flashcard: { word: string; definition: string }, index: number) => (
                            <li key={index} style={{ marginBottom: '10px' }}>
                                <strong>{flashcard.word}:</strong> {flashcard.definition}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No flashcards available.</p>
                )}
            </div>
            </div>
        </div>


    );
}