import { useLocation, useNavigate } from 'react-router-dom';
import FlashcardSetCard from '../components/FlashcardSetCard';
import type { Key } from 'react';

export default function SetView() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const classFolder = state || {};

    return (
        <div className="flex flex-col gap-[15px] mx-5">
            <button onClick={() => navigate(-1)} className="mt-3 px-[14px] py-[10px] bg-primary text-white rounded-lg border-none cursor-pointer w-fit hover:bg-gray-300">{'<'} Back</button>
            <h1 className="text-[30px] font-medium text-primary justify-self-start mt-5 mb-5">{classFolder.title}</h1>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
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