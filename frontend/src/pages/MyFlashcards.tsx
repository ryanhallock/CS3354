import { useNavigate } from "react-router-dom";

import ClassCard from "@/components/ClassCard";
import FlashcardSetCard from "@/components/FlashcardSetCard";

export default function MyFlashcards() {
  const navigate = useNavigate();

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
  ];

  const flashcardClasses = [
    {
      title: "My Class 1",
      description: "Class description",
      setCount: 3,
      dateCreated: "2026-04-03",
      flashcardSets: flashcardSetsData,
    },
    {
      title: "My Class 2",
      description: "Class description",
      setCount: 3,
      dateCreated: "2026-04-03",
      flashcardSets: flashcardSetsData,
    },
    {
      title: "My Class 3",
      description: "Class description",
      setCount: 3,
      dateCreated: "2026-04-03",
      flashcardSets: flashcardSetsData,
    },
  ];

  return (
    <div className="relative min-h-screen p-5">
      <h1 className="text-primary mt-5 mb-5 justify-self-start text-[30px] font-medium">
        My Flashcards
      </h1>

      <div className="bg-surface border-border flex justify-between rounded-md border shadow-lg">
        <h1 className="text-heading m-5 justify-self-start text-[22px] font-medium">All Sets</h1>
      </div>

      <div className="flex gap-4 overflow-x-auto p-5">
        {flashcardSetsData.map((set, index) => (
          <FlashcardSetCard
            key={index}
            title={set.title}
            description={set.description}
            visibility={set.visibility}
            createdAt={set.createdAt}
            flashcards={set.flashcards}
          />
        ))}
      </div>

      <br />

      <div className="bg-surface border-border flex justify-between rounded-md border shadow-lg">
        <h1 className="text-heading m-5 justify-self-start text-[22px] font-medium">By Class</h1>
      </div>

      <div className="flex gap-4 overflow-x-auto p-5">
        {flashcardClasses.map((cls, index) => (
          <ClassCard
            key={index}
            title={cls.title}
            description={cls.description}
            setCount={cls.setCount}
            dateCreated={cls.dateCreated}
            flashcardSets={cls.flashcardSets}
          />
        ))}
      </div>

      <button
        className="bg-primary absolute right-5 bottom-5 flex h-12.5 w-12.5 cursor-pointer items-center justify-center rounded-full border-none text-2xl text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)] hover:bg-[#16207a]"
        onClick={() => navigate("/create")}
      >
        +
      </button>
    </div>
  );
}
