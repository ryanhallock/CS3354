import { useLocation, useNavigate } from "react-router-dom";

import FlashcardSetCard from "@/components/FlashcardSetCard";

interface FlashcardResponse {
  id: number;
  question: string;
  answer: string;
}

interface FlashcardSetResponse {
  id: number;
  title: string;
  description: string;
  visibility: "PUBLIC" | "PRIVATE";
  owner: string;
  createdAt: string;
  flashcards: FlashcardResponse[];
}

export default function SetView() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const classFolder = state || {};

  return (
    <div className="mx-5 flex flex-col gap-3.75">
      <button
        onClick={() => navigate(-1)}
        className="bg-primary mt-3 w-fit cursor-pointer rounded-lg border-none px-3.5 py-2.5 text-white hover:bg-gray-300"
      >
        {"<"} Back
      </button>
      <h1 className="text-primary mt-5 mb-5 justify-self-start text-[30px] font-medium">
        {classFolder.title}
      </h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
        {classFolder.flashcardSets?.map((set: FlashcardSetResponse, index: number) => (
          <FlashcardSetCard
            key={set.id || index}
            id={set.id}
            title={set.title}
            description={set.description}
            visibility={set.visibility}
            createdAt={set.createdAt}
            flashcards={set.flashcards}
          />
        ))}
      </div>
    </div>
  );
}
