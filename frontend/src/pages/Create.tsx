import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [deck, setDeck] = useState({
    title: "",
    description: "",
    isPublic: false,
  });
  const [flashcards, setFlashcards] = useState([{ question: "", answer: "", id: Date.now() }]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleAddCard = () => {
    setFlashcards([...flashcards, { question: "", answer: "", id: Date.now() }]);
  };

  const handleCardChange = (index: number, field: "question" | "answer", value: string) => {
    const newCards = [...flashcards];
    newCards[index][field] = value;
    setFlashcards(newCards);
  };

  const handleRemoveCard = (index: number) => {
    const newCards = flashcards.filter((_, i) => i !== index);
    setFlashcards(newCards);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newCards = [...flashcards];
    const draggedCard = newCards[draggedIndex];
    newCards.splice(draggedIndex, 1);
    newCards.splice(index, 0, draggedCard);

    setDraggedIndex(index);
    setFlashcards(newCards);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleGenerateFlashCard = async () => {
    try {
      const validCards = flashcards.filter((c) => c.question.trim() && c.answer.trim());
      if (validCards.length === 0) {
        alert("Please add at least one flashcard with a question and answer.");
        return;
      }

      const res = await fetch("/api/flashcardset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: deck.title || "Untitled Set",
          description: deck.description || "Custom flashcards set",
          visibility: deck.isPublic ? "PUBLIC" : "PRIVATE",
          flashcards: validCards.map(({ question, answer }) => ({ question, answer })),
        }),
      });

      if (!res.ok) throw new Error("Failed to create set");

      const newSet = await res.json();
      navigate("/study", { state: newSet });
    } catch (err) {
      console.error(err);
      alert("Failed to create flashcard set");
    }
  };

  return (
    <div className="box-border flex min-h-screen w-full flex-col items-stretch p-7.5 text-left">
      <h1 className="text-primary mt-5 mb-5 justify-self-start text-[30px] font-medium">Create</h1>

      <div className="bg-surface box-border flex w-full flex-col gap-10 rounded-xl p-[40px_50px] shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:gap-15">
          {/* Left column - Metadata */}
          <div className="flex flex-1 flex-col gap-5">
            <div className="mb-2.5 flex flex-col gap-1">
              <p className="text-heading m-0 text-lg font-medium">Set Details</p>
              <p className="text-text m-0 text-sm">Provide a title and description for your set</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-heading text-[15px]">Title</label>
              <input
                type="text"
                placeholder="e.g. Biology 101"
                className="bg-bg text-text box-border w-full rounded-lg border-none px-3.5 py-3 text-base outline-none"
                value={deck.title}
                onChange={(e) => setDeck({ ...deck, title: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-heading text-[15px]">Description</label>
              <textarea
                placeholder="e.g. Cellular structures and functions"
                className="bg-bg text-text box-border min-h-40 w-full resize-y rounded-lg border-none px-3.5 py-3 font-[inherit] text-base outline-none"
                value={deck.description}
                onChange={(e) => setDeck({ ...deck, description: e.target.value })}
              />
            </div>

            <div className="mt-2 flex flex-row items-center justify-start gap-3">
              <span className="text-heading text-[15px]">Make public</span>

              <div
                className="relative inline-block h-6 w-11.5 cursor-pointer"
                onClick={() => setDeck({ ...deck, isPublic: !deck.isPublic })}
              >
                <div
                  className={`absolute inset-0 rounded-3xl transition-colors duration-300 ${deck.isPublic ? "bg-primary" : "bg-border"}`}
                >
                  <div
                    className={`bg-surface absolute bottom-0.5 h-5 w-5 rounded-full shadow-sm transition-[left] duration-300 ${deck.isPublic ? "left-6" : "left-0.5"}`}
                  ></div>
                </div>
              </div>

              <span className="flex items-center justify-center">
                {deck.isPublic ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-text"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-text"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                )}
              </span>
            </div>
          </div>

          {/* Right column - Flashcards */}
          <div className="flex flex-[1.5] flex-col gap-5">
            <div className="mb-2.5 flex flex-col gap-1">
              <p className="text-heading m-0 text-lg font-medium">Flashcards</p>
              <p className="text-text m-0 text-sm">Add questions and answers for your deck</p>
            </div>

            <div className="flex max-h-125 flex-col gap-4 overflow-y-auto pr-2 pb-2">
              {flashcards.map((card, index) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`bg-bg border-border flex flex-col gap-3 rounded-lg border p-4 shadow-sm transition-transform ${draggedIndex === index ? "scale-95 opacity-50" : "scale-100 opacity-100"}`}
                >
                  <div className="border-border flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <div className="text-text hover:text-primary cursor-grab transition-colors active:cursor-grabbing">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="8" y1="6" x2="16" y2="6"></line>
                          <line x1="8" y1="12" x2="16" y2="12"></line>
                          <line x1="8" y1="18" x2="16" y2="18"></line>
                        </svg>
                      </div>
                      <span className="text-heading text-sm font-semibold">
                        {card.question.trim() ? card.question : `Card ${index + 1}`}
                      </span>
                    </div>
                    {flashcards.length > 1 && (
                      <button
                        onClick={() => handleRemoveCard(index)}
                        className="text-text cursor-pointer border-none bg-transparent hover:text-red-500"
                        title="Remove Card"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col gap-3 md:flex-row">
                    <input
                      type="text"
                      placeholder="Term (Question)"
                      className="bg-surface text-text focus:border-primary box-border flex-1 border-b-2 border-transparent px-3 py-2 text-sm outline-none"
                      value={card.question}
                      onChange={(e) => handleCardChange(index, "question", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Definition (Answer)"
                      className="bg-surface text-text focus:border-primary box-border flex-1 border-b-2 border-transparent px-3 py-2 text-sm outline-none"
                      value={card.answer}
                      onChange={(e) => handleCardChange(index, "answer", e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddCard}
              className="border-dashed-border text-heading box-border flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-transparent p-4 font-medium transition-colors hover:bg-gray-50/5 dark:hover:bg-gray-800/50"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Card
            </button>
          </div>
        </div>

        <button
          className="bg-primary box-border w-full cursor-pointer rounded-lg border-none p-4 text-base font-semibold text-white"
          onClick={handleGenerateFlashCard}
        >
          Create Flashcards Set
        </button>
      </div>
    </div>
  );
}
