import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type { FlashcardSetFormData } from "@/components/flashcards/FlashcardSetForm";
import FlashcardSetForm from "@/components/flashcards/FlashcardSetForm";

export default function Create() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const duplicateData = location.state?.duplicateFrom;

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
    <div className="flex flex-col gap-8 px-6 py-10">
      <h1 className="text-heading text-3xl font-bold">Create</h1>
      <FlashcardSetForm
        initialData={
          duplicateData || { title: "", description: "", visibility: "PRIVATE", flashcards: [] }
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel={duplicateData ? "Save Duplicate" : "Create Flashcards Set"}
      />
    </div>
  );
}
