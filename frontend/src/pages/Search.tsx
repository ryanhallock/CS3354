import { useState } from "react";

import FlashcardSetCard from "@/components/FlashcardSetCard";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const flashcardSetsData = [
    {
      title: "Biology 101",
      description: "Cellular structure and functions",
      visibility: "PUBLIC" as const,
      createdAt: "2026-04-02T00:00:00Z",
      flashcards: [
        { id: 1, question: "Cell", answer: "The basic unit of life" },
        { id: 2, question: "Mitochondria", answer: "Powerhouse of the cell" },
        { id: 3, question: "Nucleus", answer: "Control center of the cell" },
      ],
    },
    {
      title: "US History",
      description: "Civil War era and aftermath",
      visibility: "PRIVATE" as const,
      createdAt: "2026-03-28T00:00:00Z",
      flashcards: [
        { id: 4, question: "Question 1", answer: "Answer 1" },
        { id: 5, question: "Question 2", answer: "Answer 2" },
        { id: 6, question: "Question 3", answer: "Answer 3" },
      ],
    },
    {
      title: "US History 2",
      description: "Civil War era and aftermath",
      visibility: "PRIVATE" as const,
      createdAt: "2026-03-28T00:00:00Z",
      flashcards: [
        { id: 7, question: "Question 1", answer: "Answer 1" },
        { id: 8, question: "Question 2", answer: "Answer 2" },
        { id: 9, question: "Question 3", answer: "Answer 3" },
      ],
    },
    {
      title: "Biology 101",
      description: "Cellular structure and functions",
      visibility: "PUBLIC" as const,
      createdAt: "2026-04-02T00:00:00Z",
      flashcards: [
        { id: 10, question: "Cell", answer: "The basic unit of life" },
        { id: 11, question: "Mitochondria", answer: "Powerhouse of the cell" },
        { id: 12, question: "Nucleus", answer: "Control center of the cell" },
      ],
    },
    {
      title: "US History",
      description: "Civil War era and aftermath",
      visibility: "PRIVATE" as const,
      createdAt: "2026-03-28T00:00:00Z",
      flashcards: [
        { id: 13, question: "Question 1", answer: "Answer 1" },
        { id: 14, question: "Question 2", answer: "Answer 2" },
        { id: 15, question: "Question 3", answer: "Answer 3" },
      ],
    },
    {
      title: "US History 6",
      description: "Civil War era and aftermath",
      visibility: "PRIVATE" as const,
      createdAt: "2026-03-28T00:00:00Z",
      flashcards: [
        { id: 16, question: "Question 1", answer: "Answer 1" },
        { id: 17, question: "Question 2", answer: "Answer 2" },
        { id: 18, question: "Question 3", answer: "Answer 3" },
      ],
    },
  ];

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

      <div className="grid grid-flow-col grid-rows-3 gap-4 overflow-x-auto pb-5">
        {filteredSets.length > 0 ? (
          filteredSets.map((set, index) => (
            <FlashcardSetCard
              key={`${set.title}-${index}`}
              title={set.title}
              description={set.description}
              visibility={set.visibility}
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
