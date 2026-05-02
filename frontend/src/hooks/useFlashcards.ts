import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  owner: string;
  createdAt: string;
  flashcards: Flashcard[];
}

export interface UpdateFlashcardSetInput {
  id: number;
  title: string;
  description: string;
  visibility: "PUBLIC" | "PRIVATE";
  flashcards: { question: string; answer: string }[];
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

export const useUpdateFlashcardSet = () => {
  const queryClient = useQueryClient();
  return useMutation<FlashcardSet, Error, UpdateFlashcardSetInput>({
    mutationFn: async ({ id, title, description, visibility, flashcards }) => {
      const res = await fetch(`/api/flashcardset/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description, visibility, flashcards }),
      });
      if (!res.ok) throw new Error("Failed to update flashcard set");
      return res.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["own-flashcard-sets"] });
      queryClient.invalidateQueries({ queryKey: ["flashcard-set", id] });
    },
  });
};

export const useDeleteFlashcardSet = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      const res = await fetch(`/api/flashcardset/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete flashcard set");
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["own-flashcard-sets"] });
      queryClient.removeQueries({ queryKey: ["flashcard-set", id] });
    },
  });
};
