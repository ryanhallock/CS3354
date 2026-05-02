import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmDialog from "@/components/ConfirmDialog";
import { useAuth } from "@/hooks/useAuth";
import { useDeleteFlashcardSet } from "@/hooks/useFlashcards";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

interface FlashcardSetCardProps {
  id?: number;
  title: string;
  description: string;
  visibility: "PUBLIC" | "PRIVATE";
  owner?: string;
  createdAt: string;
  flashcards: Flashcard[];
}

function formatTimestamp(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
}

export default function FlashcardSetCard({
  id,
  title,
  description,
  visibility,
  owner,
  createdAt,
  flashcards,
}: FlashcardSetCardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const deleteMutation = useDeleteFlashcardSet();
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formattedCreatedAt = formatTimestamp(createdAt);
  const isOwner = user && owner === user.username;

  const handleCardClick = () => {
    navigate("/study", {
      state: {
        id,
        title,
        description,
        visibility,
        owner,
        createdAt,
        flashcards,
      },
    });
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit/${id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(true);
    setShowMenu(false);
  };

  const handleConfirmDelete = () => {
    if (id) {
      deleteMutation.mutate(id, {
        onSuccess: () => setShowConfirm(false),
      });
    }
  };

  return (
    <>
      <div
        className="border-border bg-surface relative flex h-full w-full cursor-pointer flex-col justify-between rounded-lg border p-5 shadow-sm transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-md"
        onClick={handleCardClick}
      >
        <div className="mb-2 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-heading m-0 text-base font-semibold">{title}</h3>
            <span
              className={`w-fit rounded px-2 py-0.5 text-[10px] font-medium ${visibility === "PRIVATE" ? "bg-[#fce4ec] text-[#c2185b]" : "bg-[#e3f2fd] text-[#1976d2]"}`}
            >
              {visibility === "PRIVATE" ? "Private" : "Public"}
            </span>
          </div>

          {isOwner && (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="text-text hover:bg-border/50 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent transition-colors"
              >
                <MoreVertical size={20} />
              </button>

              {showMenu && (
                <div className="bg-surface border-border absolute right-0 z-10 mt-1 min-w-[120px] rounded-lg border py-1 shadow-lg">
                  <button
                    onClick={handleEdit}
                    className="text-text hover:bg-border/50 flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-4 py-2 text-left text-sm transition-colors"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="hover:bg-border/50 flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-4 py-2 text-left text-sm text-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <p className="text-text my-2.5 grow text-left text-sm leading-relaxed">{description}</p>
        <div className="text-heading mt-2 flex justify-between text-xs">
          <span>{flashcards.length} cards</span>
          <span>{formattedCreatedAt}</span>
        </div>
      </div>

      {showConfirm && (
        <ConfirmDialog
          title="Delete Flashcard Set"
          message={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirm(false)}
          isLoading={deleteMutation.isPending}
        />
      )}
    </>
  );
}
