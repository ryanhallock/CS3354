import { useState } from 'react';
import FlashcardSetCard from '../components/FlashcardSetCard';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');

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
        <div className="relative min-h-screen p-5">
            <h1 className="text-[30px] font-medium text-primary justify-self-start mt-5 mb-5">Search</h1>

            <div className="mb-5">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or description..."
                    className="w-[98%] px-3 py-[10px] border border-[#ccc] rounded-lg text-base bg-surface text-heading"
                />
            </div>

            <div className="grid grid-rows-3 grid-flow-col overflow-x-auto gap-4 pb-5">
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
                    <div className="text-[#666]">No sets match your search</div>
                )}
            </div>
        </div>
    );
}
