import { useNavigate } from "react-router-dom";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

interface FlashcardSetCardProps {
  id?: number;
  title: string;
  description: string;
  visibility: "PUBLIC" | "PRIVATE";
  owner?: string;
  createdAt: string;
  flashcards: Flashcard[];
}

function formatTimestamp(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
}

export default function FlashcardSetCard({
  id,
  title,
  description,
  visibility,
  owner,
  createdAt,
  flashcards,
}: FlashcardSetCardProps) {
  const navigate = useNavigate();
  const formattedCreatedAt = formatTimestamp(createdAt);

  return (
    <div
      className="border-border bg-surface flex h-full w-full cursor-pointer flex-col justify-between rounded-lg border p-5 shadow-sm transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-md"
      onClick={() =>
        navigate("/study", {
          state: {
            id,
            title,
            description,
            visibility,
            owner,
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
      <p className="text-text my-2.5 grow text-left text-sm leading-relaxed">{description}</p>
      <div className="text-heading mt-2 flex justify-between text-xs">
        <span>{flashcards.length} cards</span>
        <span>{formattedCreatedAt}</span>
      </div>
    </div>
  );
}
