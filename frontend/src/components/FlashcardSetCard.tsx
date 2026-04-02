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
      className="flashcard-set-card"
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
      <div className="card-header">
        <h3>{title}</h3>
        <span className={`privacy-badge ${isPrivate ? 'private' : 'public'}`}>
          {isPrivate ? 'Private' : 'Public'}
        </span>
      </div>
      <p className="card-description">{description}</p>
      <div className="card-footer">
        <span className="card-count">{cardCount} cards</span>
        <span className="card-date">{dateCreated}</span>
      </div>
    </div>
  );
}
