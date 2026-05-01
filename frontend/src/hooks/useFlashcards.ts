import { useQuery } from "@tanstack/react-query";

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

export interface FlashcardSet {
  id: number;
  title: string;
  description: string;
  visibility: "PUBLIC" | "PRIVATE";
  createdAt: string;
  flashcards: Flashcard[];
}

export const useOwnFlashcardSets = () => {
  return useQuery<FlashcardSet[]>({
    queryKey: ["own-flashcard-sets"],
    queryFn: async () => {
      const res = await fetch("/api/flashcardset", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch flashcard sets");
      return res.json();
    },
  });
};

export const usePublicFlashcardSets = () => {
  return useQuery<FlashcardSet[]>({
    queryKey: ["public-flashcard-sets"],
    queryFn: async () => {
      const res = await fetch("/api/flashcardset/public", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch public flashcard sets");
      return res.json();
    },
  });
};

export const useFlashcardSet = (id: number | string) => {
  return useQuery<FlashcardSet>({
    queryKey: ["flashcard-set", id],
    queryFn: async () => {
      const res = await fetch(`/api/flashcardset/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch flashcard set");
      return res.json();
    },
    enabled: !!id,
  });
};
