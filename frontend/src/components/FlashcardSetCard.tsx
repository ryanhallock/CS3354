interface FlashcardSetCardProps {
  title: string;
  description: string;
  cardCount: number;
  dateCreated: string;
  isPrivate: boolean;
}

export default function FlashcardSetCard({
  title,
  description,
  cardCount,
  dateCreated,
  isPrivate,
}: FlashcardSetCardProps) {
  return (
    <div className="flashcard-set-card">
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
