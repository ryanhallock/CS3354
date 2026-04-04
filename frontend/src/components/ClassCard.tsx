import { useNavigate } from 'react-router-dom';
import { FaFolder } from "react-icons/fa";

interface Flashcard {
  word: string;
  definition: string;
}

interface FlashcardSetCardProps {
  title: string;
  description: string;
  cardCount: number;
  dateCreated: string;
  isPrivate: boolean;
  flashcards: Flashcard[];
}

interface ClassCardProps {
  title: string;
  description: string;
  setCount: number;
  dateCreated: string;
  flashcardSets: FlashcardSetCardProps[];
}

export default function ClassCard({
  title,
  description,
  setCount,
  dateCreated,
  flashcardSets,
}: ClassCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="border border-border rounded-lg p-4 bg-surface shadow-sm transition-[box-shadow,transform] duration-300 cursor-pointer min-w-[250px] hover:shadow-md hover:-translate-y-0.5"
      onClick={() =>
        navigate('/setView', {
          state: {
            title,
            description,
            setCount,
            dateCreated,
            flashcardSets,
          },
        })
      }
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="m-0 text-base font-semibold text-heading">{title}</h3>
        <FaFolder />
      </div>
      <p className="text-sm text-text my-[10px] leading-relaxed text-left">{description}</p>
      <div className="flex justify-between text-xs text-heading">
        <span>{setCount} sets</span>
        <span>{dateCreated}</span>
      </div>
      {flashcardSets && flashcardSets.length > 0 && (
        <div className="grid grid-rows-2 grid-flow-col overflow-x-auto gap-2 mt-4 max-h-[200px]">
        </div>
      )}
    </div>
  );
}
