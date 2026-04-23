import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function StudyView() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const card = state || {};
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const flashcards = card.flashcards || [];
  const currentCard = flashcards[currentCardIndex];

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  return (
    <div className="p-5 text-left">
      <button
        onClick={() => navigate(-1)}
        className="bg-primary mt-3 w-fit cursor-pointer rounded-lg border-none px-[14px] py-[10px] text-white hover:bg-gray-300"
      >
        {"<"} Back
      </button>
      <div className="flex justify-between p-5">
        <div className="flex flex-col items-start p-5">
          <h1
            className="text-heading justify-self-start text-[22px] font-medium"
            style={{ margin: "10px 0" }}
          >
            {card.title || "Untitled"}
          </h1>
          <p>Description: {card.description || "No description available"}</p>
          <p>Number of Cards: {flashcards.length ?? "N/A"}</p>
          <p>Date Created: {card.createdAt ?? "Unknown"}</p>
          <p>Status: {card.visibility === "PRIVATE" ? "Private" : "Public"}</p>
        </div>
        <div>
          <h2 className="text-heading m-5 justify-self-start text-[22px] font-medium">
            Flashcards
          </h2>
          {flashcards.length > 0 ? (
            <div className="flex flex-col items-center gap-5">
              <div
                onClick={handleCardClick}
                className="bg-surface relative flex h-62.5 w-100 cursor-pointer items-center justify-center rounded-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] transition-transform duration-300"
                style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
              >
                <div
                  className={`text-center text-2xl font-bold ${isFlipped ? "text-[#333]" : "text-primary"}`}
                  style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  {isFlipped ? currentCard.answer : currentCard.question}
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handlePrevCard}
                  disabled={currentCardIndex === 0}
                  className={`rounded-[5px] border-none px-5 py-2.5 text-white ${currentCardIndex === 0 ? "cursor-not-allowed bg-gray-300" : "bg-primary cursor-pointer"}`}
                >
                  Previous
                </button>
                <span className="text-base text-[#666]">
                  {currentCardIndex + 1} / {flashcards.length}
                </span>
                <button
                  onClick={handleNextCard}
                  disabled={currentCardIndex === flashcards.length - 1}
                  className={`rounded-[5px] border-none px-5 py-2.5 text-white ${currentCardIndex === flashcards.length - 1 ? "cursor-not-allowed bg-gray-300" : "bg-primary cursor-pointer"}`}
                >
                  Next
                </button>
              </div>
              <p className="text-center text-sm text-[#666]">
                Click the card to flip between term and definition
              </p>
            </div>
          ) : (
            <p>No flashcards available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
