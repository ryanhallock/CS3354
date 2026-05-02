import { ChevronLeft, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ConfirmDialog from "@/components/ConfirmDialog";
import { useAuth } from "@/hooks/useAuth";
import { useDeleteFlashcardSet } from "@/hooks/useFlashcards";

export default function StudyView() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const deleteMutation = useDeleteFlashcardSet();
  const card = state || {};
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const flashcards = card.flashcards || [];
  const currentCard = flashcards[currentCardIndex];
  const isOwner = user && card.owner === user.username;

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

  const handleDelete = () => {
    if (card.id) {
      deleteMutation.mutate(card.id, {
        onSuccess: () => navigate("/myflashcards"),
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-5 text-left">
      <div className="flex w-full max-w-4xl items-center justify-between self-start">
        <button
          onClick={() => navigate(-1)}
          className="bg-primary mt-3 flex cursor-pointer items-center gap-1 rounded-lg border-none px-4 py-2.5 text-white transition-opacity hover:opacity-90"
        >
          <ChevronLeft size={20} /> Back
        </button>

        {isOwner && (
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => navigate(`/edit/${card.id}`)}
              className="border-primary text-primary flex cursor-pointer items-center gap-2 rounded-lg border bg-transparent px-4 py-2.5 font-medium transition-colors hover:bg-blue-50/10"
            >
              <Edit size={18} />
              Edit
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="flex cursor-pointer items-center gap-2 rounded-lg border-none bg-red-600 px-4 py-2.5 font-medium text-white transition-opacity hover:opacity-90"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 flex w-full max-w-4xl flex-col items-center justify-center gap-8">
        <div className="flex w-full flex-col items-center text-center">
          <h1 className="text-heading m-0 text-3xl font-bold">{card.title || "Untitled"}</h1>
          <p className="text-text mt-2 text-lg">{card.description || "No description available"}</p>
          <div className="text-text mt-4 flex gap-4 text-sm font-medium">
            <span>{flashcards.length ?? 0} Cards</span>
            <span>&bull;</span>
            <span>{card.visibility === "PRIVATE" ? "Private" : "Public"}</span>
            {card.createdAt && (
              <>
                <span>&bull;</span>
                <span>Created {new Date(card.createdAt).toLocaleDateString()}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col items-center pb-10">
          {flashcards.length > 0 ? (
            <div className="flex w-full flex-col items-center gap-8">
              <div
                onClick={handleCardClick}
                className="bg-surface border-border relative flex min-h-80 w-full max-w-2xl cursor-pointer items-center justify-center rounded-2xl border p-8 shadow-lg transition-transform duration-300"
                style={{
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  perspective: 1000,
                }}
              >
                <div
                  className={`flashcard-text text-center font-bold ${isFlipped ? "text-heading" : "text-primary"}`}
                  style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  {isFlipped ? currentCard.answer : currentCard.question}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevCard}
                  disabled={currentCardIndex === 0}
                  className={`rounded-lg border-none px-6 py-3 font-medium text-white transition-opacity ${currentCardIndex === 0 ? "cursor-not-allowed bg-gray-400 opacity-50" : "bg-primary cursor-pointer hover:opacity-90"}`}
                >
                  Previous
                </button>
                <span className="text-text text-lg font-medium">
                  {currentCardIndex + 1} / {flashcards.length}
                </span>
                <button
                  onClick={handleNextCard}
                  disabled={currentCardIndex === flashcards.length - 1}
                  className={`rounded-lg border-none px-6 py-3 font-medium text-white transition-opacity ${currentCardIndex === flashcards.length - 1 ? "cursor-not-allowed bg-gray-400 opacity-50" : "bg-primary cursor-pointer hover:opacity-90"}`}
                >
                  Next
                </button>
              </div>

              <p className="text-text text-center text-sm">
                Click the card to flip between term and definition
              </p>
            </div>
          ) : (
            <p className="text-text mt-10">No flashcards available.</p>
          )}
        </div>
      </div>

      {showConfirm && (
        <ConfirmDialog
          title="Delete Flashcard Set"
          message={`Are you sure you want to delete "${card.title}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
          isLoading={deleteMutation.isPending}
        />
      )}
    </div>
  );
}
