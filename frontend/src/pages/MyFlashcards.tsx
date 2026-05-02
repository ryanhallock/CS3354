import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import FlashcardSetCard from "@/components/FlashcardSetCard";
import { Button } from "@/components/ui/Button";
import { useOwnFlashcardSets } from "@/hooks/useFlashcards";

export default function MyFlashcards() {
  const navigate = useNavigate();
  const { data: sets = [], isLoading } = useOwnFlashcardSets();

  const publicSets = sets.filter((set) => set.visibility === "PUBLIC");
  const privateSets = sets.filter((set) => set.visibility === "PRIVATE");

  return (
    <div className="flex flex-col gap-8 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-heading text-3xl font-bold">My Flashcards</h1>
        <Button onClick={() => navigate("/create")} className="flex items-center gap-2">
          <Plus size={20} />
          Create New Set
        </Button>
      </div>

      <div className="space-y-12">
        {/* Public Sets Section */}
        <div>
          <h3 className="text-heading mb-6 text-xl font-bold tracking-wide uppercase">
            Public Sets
          </h3>
          {isLoading ? (
            <div className="text-text animate-pulse">Loading sets...</div>
          ) : publicSets.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {publicSets.map((set) => (
                <FlashcardSetCard key={set.id} {...set} />
              ))}
            </div>
          ) : (
            <div className="text-text border-border bg-surface rounded-xl border border-dashed p-10 text-center">
              You don't have any public sets yet.
            </div>
          )}
        </div>

        {/* Private Sets Section */}
        <div>
          <h3 className="text-heading mb-6 text-xl font-bold tracking-wide uppercase">
            Private Sets
          </h3>
          {isLoading ? (
            <div className="text-text animate-pulse">Loading sets...</div>
          ) : privateSets.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {privateSets.map((set) => (
                <FlashcardSetCard key={set.id} {...set} />
              ))}
            </div>
          ) : (
            <div className="text-text border-border bg-surface rounded-xl border border-dashed p-10 text-center">
              You don't have any private sets yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
