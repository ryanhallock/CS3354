import { useNavigate } from 'react-router-dom';
import FlashcardSetCard from '../components/FlashcardSetCard';

export default function MyFlashcards() {
    const navigate = useNavigate();

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <h1 className="title-blue">My Flashcards</h1>

            <div className="dropdown">
                <h1 className="title">All Sets</h1>
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', padding: '20px' }}>
                <FlashcardSetCard
                    title="Biology 101"
                    description="Cellular structure and functions"
                    cardCount={24}
                    dateCreated="Apr 2, 2026"
                    isPrivate={false}
                    flashcards={[
                        { word: "Cell", definition: "The basic unit of life" },
                        { word: "Mitochondria", definition: "Powerhouse of the cell" },
                        { word: "Nucleus", definition: "Control center of the cell" },
                    ]}
                />
                <FlashcardSetCard
                    title="US History"
                    description="Civil War era and aftermath"
                    cardCount={32}
                    dateCreated="Mar 28, 2026"
                    isPrivate={true}
                    flashcards={[
                        { word: "1", definition: "definition 1" },
                        { word: "2", definition: "definition 2" },
                        { word: "3", definition: "definition 3" },
                    ]}
                />
            </div>
            <div className="dropdown">
                <h1 className="title">By Class</h1>
                <h1 className="title">{'>'}</h1>
            </div>
            <button
                className="add-btn"
                onClick={() => navigate('/create')}>
                +
            </button>
        </div>
    );
}