import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { FlashcardSetFormData } from "@/components/flashcards/FlashcardSetForm";
import FlashcardSetForm from "@/components/flashcards/FlashcardSetForm";

export default function Create() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: FlashcardSetFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/flashcardset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create set");
      const newSet = await res.json();
      navigate("/study", { state: newSet });
    } catch (err) {
      console.error(err);
      alert("Failed to create flashcard set");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="box-border flex min-h-screen w-full flex-col items-stretch p-7.5 text-left">
      <h1 className="text-primary mt-5 mb-5 justify-self-start text-[30px] font-medium">Create</h1>
      <FlashcardSetForm
        initialData={{ title: "", description: "", visibility: "PRIVATE", flashcards: [] }}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Create Flashcards Set"
      />
    </div>
  );
}
