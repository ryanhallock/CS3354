import { FaFolder } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

interface FlashcardSetCardProps {
  title: string;
  description: string;
  visibility: "PUBLIC" | "PRIVATE";
  createdAt: string;
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
      className="border-border bg-surface min-w-[250px] cursor-pointer rounded-lg border p-4 shadow-sm transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-md"
      onClick={() =>
        navigate("/setView", {
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
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-heading m-0 text-base font-semibold">{title}</h3>
        <FaFolder />
      </div>
      <p className="text-text my-[10px] text-left text-sm leading-relaxed">{description}</p>
      <div className="text-heading flex justify-between text-xs">
        <span>{setCount} sets</span>
        <span>{dateCreated}</span>
      </div>
      {flashcardSets && flashcardSets.length > 0 && (
        <div className="mt-4 grid max-h-[200px] grid-flow-col grid-rows-2 gap-2 overflow-x-auto"></div>
      )}
    </div>
  );
}
