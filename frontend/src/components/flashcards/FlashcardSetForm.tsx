import { GripVertical, Lock, Plus, Trash2, Unlock } from "lucide-react";
import { useState } from "react";

interface FlashcardEntry {
  localId: number;
  question: string;
  answer: string;
}

export interface FlashcardSetFormData {
  title: string;
  description: string;
  visibility: "PUBLIC" | "PRIVATE";
  flashcards: { question: string; answer: string }[];
}

interface FlashcardSetFormProps {
  initialData: FlashcardSetFormData;
  onSubmit: (data: FlashcardSetFormData) => void;
  isSubmitting: boolean;
  submitLabel: string;
}

export default function FlashcardSetForm({
  initialData,
  onSubmit,
  isSubmitting,
  submitLabel,
}: FlashcardSetFormProps) {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [isPublic, setIsPublic] = useState(initialData.visibility === "PUBLIC");
  const [flashcards, setFlashcards] = useState<FlashcardEntry[]>(() =>
    initialData.flashcards.length > 0
      ? initialData.flashcards.map((c, i) => ({ ...c, localId: Date.now() + i }))
      : [{ localId: Date.now(), question: "", answer: "" }],
  );
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleAddCard = () => {
    setFlashcards([...flashcards, { localId: Date.now(), question: "", answer: "" }]);
  };

  const handleCardChange = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...flashcards];
    updated[index] = { ...updated[index], [field]: value };
    setFlashcards(updated);
  };

  const handleRemoveCard = (index: number) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
  };

  const handleDragStart = (index: number) => setDraggedIndex(index);

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const reordered = [...flashcards];
    const [moved] = reordered.splice(draggedIndex, 1);
    reordered.splice(index, 0, moved);
    setDraggedIndex(index);
    setFlashcards(reordered);
  };

  const handleDragEnd = () => setDraggedIndex(null);

  const handleSubmit = () => {
    const validCards = flashcards.filter((c) => c.question.trim() && c.answer.trim());
    if (validCards.length === 0) {
      alert("Please add at least one flashcard with a question and answer.");
      return;
    }
    onSubmit({
      title: title || "Untitled Set",
      description: description || "Custom flashcards set",
      visibility: isPublic ? "PUBLIC" : "PRIVATE",
      flashcards: validCards.map(({ question, answer }) => ({ question, answer })),
    });
  };

  return (
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-heading text-[15px]">Description</label>
            <textarea
              placeholder="e.g. Cellular structures and functions"
              className="bg-bg text-text box-border min-h-40 w-full resize-y rounded-lg border-none px-3.5 py-3 font-[inherit] text-base outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mt-2 flex flex-row items-center justify-start gap-3">
            <span className="text-heading text-[15px]">Make public</span>
            <div
              className="relative inline-block h-6 w-11.5 cursor-pointer"
              onClick={() => setIsPublic(!isPublic)}
            >
              <div
                className={`absolute inset-0 rounded-3xl transition-colors duration-300 ${isPublic ? "bg-primary" : "bg-border"}`}
              >
                <div
                  className={`bg-surface absolute bottom-0.5 h-5 w-5 rounded-full shadow-sm transition-[left] duration-300 ${isPublic ? "left-6" : "left-0.5"}`}
                ></div>
              </div>
            </div>
            <span className="flex items-center justify-center">
              {isPublic ? (
                <Unlock size={20} className="text-text" />
              ) : (
                <Lock size={20} className="text-text" />
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
                key={card.localId}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`bg-bg border-border flex flex-col gap-3 rounded-lg border p-4 shadow-sm transition-transform ${draggedIndex === index ? "scale-95 opacity-50" : "scale-100 opacity-100"}`}
              >
                <div className="border-border flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <div className="text-text hover:text-primary cursor-grab transition-colors active:cursor-grabbing">
                      <GripVertical size={20} />
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
                      <Trash2 size={18} />
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
            <Plus size={20} />
            Add Card
          </button>
        </div>
      </div>

      <button
        className="bg-primary box-border w-full cursor-pointer rounded-lg border-none p-4 text-base font-semibold text-white disabled:opacity-60"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </div>
  );
}
