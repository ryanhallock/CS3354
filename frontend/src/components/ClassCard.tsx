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
      className="flashcard-set-card"
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
      <div className="card-header">
        <h3>{title}</h3>
        <FaFolder />
      </div>
      <p className="card-description">{description}</p>
      <div className="card-footer">
        <span className="card-count">{setCount} sets</span>
        <span className="card-date">{dateCreated}</span>
      </div>
      {flashcardSets && flashcardSets.length > 0 && (
        <div style={{ marginTop: '16px', display: 'grid', gridTemplateRows: 'repeat(2, 1fr)', gridAutoFlow: 'column', overflowX: 'auto', gap: '8px', maxHeight: '200px' }}>
          
        </div>
      )}
    </div>
  );
}
