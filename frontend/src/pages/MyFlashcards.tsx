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
        <div className="relative min-h-screen p-5">
            <h1 className="text-[30px] font-medium text-primary justify-self-start mt-5 mb-5">My Flashcards</h1>

            <div className="bg-surface border border-border rounded-md shadow-lg flex justify-between">
                <h1 className="text-[22px] font-medium text-heading justify-self-start m-5">All Sets</h1>
            </div>
            <div className="flex overflow-x-auto gap-4 p-5">
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
            <br />
            <div className="bg-surface border border-border rounded-md shadow-lg flex justify-between">
                <h1 className="text-[22px] font-medium text-heading justify-self-start m-5">By Class</h1>
            </div>
            <div className="flex overflow-x-auto gap-4 p-5">
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
                className="absolute bottom-5 right-5 w-[50px] h-[50px] rounded-full bg-primary text-white border-none text-2xl cursor-pointer flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.2)] hover:bg-[#16207a]"
                onClick={() => navigate('/create')}>
                +
            </button>
        </div>
    );
}
