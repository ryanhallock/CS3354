import { useNavigate } from 'react-router-dom';

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

export default function FlashcardSetCard({
  title,
  description,
  cardCount,
  dateCreated,
  isPrivate,
  flashcards,
}: FlashcardSetCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="border border-border rounded-lg p-4 bg-surface shadow-sm transition-[box-shadow,transform] duration-300 cursor-pointer min-w-[250px] hover:shadow-md hover:-translate-y-0.5"
      onClick={() =>
        navigate('/study', {
          state: {
            title,
            description,
            cardCount,
            dateCreated,
            isPrivate,
            flashcards,
          },
        })
      }
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="m-0 text-base font-semibold text-heading">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded font-medium ${isPrivate ? 'bg-[#fce4ec] text-[#c2185b]' : 'bg-[#e3f2fd] text-[#1976d2]'}`}>
          {isPrivate ? 'Private' : 'Public'}
        </span>
      </div>
      <p className="text-sm text-text my-[10px] leading-relaxed text-left">{description}</p>
      <div className="flex justify-between text-xs text-heading">
        <span>{cardCount} cards</span>
        <span>{dateCreated}</span>
      </div>
    </div>
  );
}
