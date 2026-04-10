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

export default function FlashcardSetCard({
  title,
  description,
  visibility,
  createdAt,
  flashcards,
}: FlashcardSetCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="border-border bg-surface min-w-62.5 cursor-pointer rounded-lg border p-4 shadow-sm transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-md"
      onClick={() =>
        navigate("/study", {
          state: {
            title,
            description,
            visibility,
            createdAt,
            flashcards,
          },
        })
      }
    >
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-heading m-0 text-base font-semibold">{title}</h3>
        <span
          className={`rounded px-2 py-1 text-xs font-medium ${visibility === "PRIVATE" ? "bg-[#fce4ec] text-[#c2185b]" : "bg-[#e3f2fd] text-[#1976d2]"}`}
        >
          {visibility === "PRIVATE" ? "Private" : "Public"}
        </span>
      </div>
      <p className="text-text my-2.5 text-left text-sm leading-relaxed">{description}</p>
      <div className="text-heading flex justify-between text-xs">
        <span>{flashcards.length} cards</span>
        <span>{createdAt}</span>
      </div>
    </div>
  );
}
