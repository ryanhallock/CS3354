import { useNavigate } from 'react-router-dom';
import FlashcardSetCard from '../components/FlashcardSetCard';
import ClassCard from '../components/ClassCard';

export default function MyFlashcards() {
    const navigate = useNavigate();

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
        }
    ];

    const flashcardClasses = [
        {
            title: "My Class 1",
            description: "Class description",
            setCount: 3,
            dateCreated: "2026-04-03",
            flashcardSets: flashcardSetsData
        },
        {
            title: "My Class 2",
            description: "Class description",
            setCount: 3,
            dateCreated: "2026-04-03",
            flashcardSets: flashcardSetsData
        },
        {
            title: "My Class 3",
            description: "Class description",
            setCount: 3,
            dateCreated: "2026-04-03",
            flashcardSets: flashcardSetsData
        }
    ];
                

    return (
        <div style={{ position: 'relative', minHeight: '100vh', margin: '10px' }}>
            <h1 className="title-blue">My Flashcards</h1>

            <div className="dropdown">
                <h1 className="title">All Sets</h1>
            </div>
            <div style={{ display: 'flex', overflowX: 'auto', gap: '16px', padding: '20px' }}>
                {flashcardSetsData.map((set, index) => (
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
            <br></br>
            <div className="dropdown">
                <h1 className="title">By Class</h1>
            </div>
            <div style={{ display: 'flex', overflowX: 'auto', gap: '16px', padding: '20px' }}>
            
            {flashcardClasses.map((cls, index) => (
                <ClassCard
                    key={index}
                    title={cls.title}
                    description={cls.description}
                    setCount={cls.setCount}
                    dateCreated={cls.dateCreated}
                    flashcardSets={cls.flashcardSets}
                />
            ))}
            </div>

            <button
                className="add-btn"
                onClick={() => navigate('/create')}>
                +
            </button>
        </div>
    );
}