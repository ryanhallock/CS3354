import { useState } from "react";

import FlashcardSetCard from "@/components/FlashcardSetCard";
import { usePublicFlashcardSets } from "@/hooks/useFlashcards";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: flashcardSetsData = [], isLoading } = usePublicFlashcardSets();

  const filteredSets = flashcardSetsData.filter((set) => {
    const q = searchQuery.trim().toLowerCase();
    return set.title.toLowerCase().includes(q) || set.description.toLowerCase().includes(q);
  });

  return (
    <div className="relative min-h-screen p-5">
      <h1 className="text-primary mt-5 mb-5 justify-self-start text-[30px] font-medium">Search</h1>

      <div className="mb-5">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title or description..."
          className="bg-surface text-heading w-[98%] rounded-lg border border-[#ccc] px-3 py-[10px] text-base"
        />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 pb-5">
        {isLoading ? (
          <div className="text-[#666]">Loading public sets...</div>
        ) : filteredSets.length > 0 ? (
          filteredSets.map((set, index) => (
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
          ))
        ) : (
          <div className="text-[#666]">No sets match your search</div>
        )}
      </div>
    </div>
  );
}
