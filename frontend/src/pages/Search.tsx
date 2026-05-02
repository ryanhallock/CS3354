import { Search as SearchIcon } from "lucide-react";
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
    <div className="flex flex-col gap-8 px-6 py-10">
      <h1 className="text-heading text-3xl font-bold">Search</h1>

      <div className="relative w-full max-w-2xl">
        <div className="text-text pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <SearchIcon size={20} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search public flashcard sets by title or description..."
          className="bg-surface border-border text-text focus:border-primary block w-full rounded-xl border py-4 pr-4 pl-12 text-lg shadow-sm transition-colors outline-none"
        />
      </div>

      <div>
        <h2 className="text-heading mb-6 text-xl font-bold tracking-wide uppercase">
          Public Flashcard Sets
        </h2>

        {isLoading ? (
          <div className="text-text animate-pulse">Loading public sets...</div>
        ) : filteredSets.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSets.map((set) => (
              <FlashcardSetCard key={set.id} {...set} />
            ))}
          </div>
        ) : (
          <div className="text-text border-border bg-surface rounded-xl border border-dashed p-12 text-center">
            {searchQuery.trim()
              ? "No public sets match your search query."
              : "Start typing above to discover public flashcard sets."}
          </div>
        )}
      </div>
    </div>
  );
}
