import { useState } from 'react';
import FlashcardSetCard from '../components/FlashcardSetCard';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');

    //sample data for flashcard sets
    const flashcardSetsData = [
        {
            title: "Biology 101",
            description: "Cellular structure and functions",
            cardCount: 3,
            dateCreated: "Apr 2, 2026",
            isPrivate: false,
            flashcards: [
                { word: "Cell", definition: "The basic unit of life" },
                { word: "Mitochondria", definition: "Powerhouse of the cell" },
                { word: "Nucleus", definition: "Control center of the cell" },
            ]
        },
        {
            title: "US History",
            description: "Civil War era and aftermath",
            cardCount: 3,
            dateCreated: "Mar 28, 2026",
            isPrivate: true,
            flashcards: [
                { word: "1", definition: "definition 1" },
                { word: "2", definition: "definition 2" },
                { word: "3", definition: "definition 3" },
            ]
        },
        {
            title: "US History 2",
            description: "Civil War era and aftermath",
            cardCount: 3,
            dateCreated: "Mar 28, 2026",
            isPrivate: true,
            flashcards: [
                { word: "1", definition: "definition 1" },
                { word: "2", definition: "definition 2" },
                { word: "3", definition: "definition 3" },
            ]
        },
        {
            title: "Biology 101",
            description: "Cellular structure and functions",
            cardCount: 3,
            dateCreated: "Apr 2, 2026",
            isPrivate: false,
            flashcards: [
                { word: "Cell", definition: "The basic unit of life" },
                { word: "Mitochondria", definition: "Powerhouse of the cell" },
                { word: "Nucleus", definition: "Control center of the cell" },
            ]
        },
        {
            title: "US History",
            description: "Civil War era and aftermath",
            cardCount: 3,
            dateCreated: "Mar 28, 2026",
            isPrivate: true,
            flashcards: [
                { word: "1", definition: "definition 1" },
                { word: "2", definition: "definition 2" },
                { word: "3", definition: "definition 3" },
            ]
        },
        {
            title: "US History 6",
            description: "Civil War era and aftermath",
            cardCount: 3,
            dateCreated: "Mar 28, 2026",
            isPrivate: true,
            flashcards: [
                { word: "1", definition: "definition 1" },
                { word: "2", definition: "definition 2" },
                { word: "3", definition: "definition 3" },
            ]
        }
    ];

    const filteredSets = flashcardSetsData.filter((set) => {
        const q = searchQuery.trim().toLowerCase();
        return (
            set.title.toLowerCase().includes(q) ||
            set.description.toLowerCase().includes(q)
        );
    });

    return (
        <div style={{ position: 'relative', minHeight: '100vh', padding: '20px' }}>
            <h1 className="title-blue">Search</h1>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or description..."
                    style={{
                        width: '98%',
                        padding: '10px 12px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        fontSize: '16px'
                    }}
                />
            </div>

            <div style={{
                display: 'grid',
                gridTemplateRows: 'repeat(3, 1fr)',
                gridAutoFlow: 'column',
                overflowX: 'auto',
                gap: '16px',
                paddingBottom: '20px'
            }}>
                {filteredSets.length > 0 ? (
                    filteredSets.map((set, index) => (
                        <FlashcardSetCard
                            key={`${set.title}-${index}`}
                            title={set.title}
                            description={set.description}
                            cardCount={set.cardCount}
                            dateCreated={set.dateCreated}
                            isPrivate={set.isPrivate}
                            flashcards={set.flashcards}
                        />
                    ))
                ) : (
                    <div style={{ color: '#666' }}>No sets match your search</div>
                )}
            </div>
        </div>
    );
}