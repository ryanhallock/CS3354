import { useNavigate } from "react-router-dom";

import FlashcardSetCard from "@/components/FlashcardSetCard";
import { useOwnFlashcardSets } from "@/hooks/useFlashcards";

export default function MyFlashcards() {
  const navigate = useNavigate();
  const { data: flashcardSetsData = [], isLoading } = useOwnFlashcardSets();

  return (
    <div className="relative min-h-screen p-5">
      <h1 className="text-primary mt-5 mb-5 justify-self-start text-[30px] font-medium">
        My Flashcards
      </h1>

      <div className="bg-surface border-border flex justify-between rounded-md border shadow-lg">
        <h1 className="text-heading m-5 justify-self-start text-[22px] font-medium">All Sets</h1>
      </div>

      {isLoading ? (
        <div className="p-5 text-gray-500">Loading sets...</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 p-5">
          {flashcardSetsData.map((set, index) => (
            <FlashcardSetCard
              key={set.id || index}
              id={set.id}
              title={set.title}
              description={set.description}
              visibility={set.visibility}
              owner={set.owner}
              createdAt={set.createdAt}
              flashcards={set.flashcards}
            />
          ))}
        </div>
      )}

      <button
        className="bg-primary absolute right-5 bottom-5 flex h-12.5 w-12.5 cursor-pointer items-center justify-center rounded-full border-none text-2xl text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)] hover:bg-[#16207a]"
        onClick={() => navigate("/create")}
      >
        +
      </button>
    </div>
  );
}
