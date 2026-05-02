import { useNavigate, useParams } from "react-router-dom";

import type { FlashcardSetFormData } from "@/components/flashcards/FlashcardSetForm";
import FlashcardSetForm from "@/components/flashcards/FlashcardSetForm";
import { useFlashcardSet, useUpdateFlashcardSet } from "@/hooks/useFlashcards";

export default function Edit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: set, isLoading, isError } = useFlashcardSet(Number(id));
  const updateMutation = useUpdateFlashcardSet();

  if (isLoading) {
    return <div className="p-8 text-gray-500">Loading...</div>;
  }
  if (isError || !set) {
    return <div className="p-8 text-red-500">Set not found or you do not have access.</div>;
  }

  const handleSubmit = (data: FlashcardSetFormData) => {
    updateMutation.mutate(
      { id: set.id, ...data },
      {
        onSuccess: (updated) => navigate("/study", { state: updated }),
        onError: () => alert("Failed to save changes"),
      },
    );
  };

  return (
    <div className="box-border flex min-h-screen w-full flex-col items-stretch p-7.5 text-left">
      <h1 className="text-primary mt-5 mb-5 justify-self-start text-[30px] font-medium">Edit</h1>
      <FlashcardSetForm
        initialData={{
          title: set.title,
          description: set.description,
          visibility: set.visibility,
          flashcards: set.flashcards.map(({ question, answer }) => ({ question, answer })),
        }}
        onSubmit={handleSubmit}
        isSubmitting={updateMutation.isPending}
        submitLabel="Save Changes"
      />
    </div>
  );
}
