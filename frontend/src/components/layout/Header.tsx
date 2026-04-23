import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const navigate = useNavigate();
  const { user, isLoading: isUserLoading, logout } = useAuth();

  const isAuthenticated = !!user;

  return (
    <header className="bg-surface border-border sticky top-0 left-0 z-100 flex w-full items-center justify-between border-b px-5 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
      <Link to="/" className="text-heading text-base font-bold no-underline">
        W.H.A.T.T
      </Link>

      <div className="flex gap-2">
        {isUserLoading ? (
          <div className="h-8 w-20 animate-pulse rounded-md bg-gray-100" />
        ) : isAuthenticated ? (
          <>
            <Button variant="outline" onClick={() => navigate("/myflashcards")}>
              My Flashcards
            </Button>
            <Button variant="outline" onClick={() => navigate("/search")}>
              Search
            </Button>
            <Button variant="outline" onClick={() => navigate("/create")}>
              Create
            </Button>
            <Button variant="outline" onClick={() => navigate("/profile")}>
              Profile
            </Button>
            <Button
              onClick={() => logout.mutate(undefined, { onSuccess: () => navigate("/") })}
              disabled={logout.isPending}
            >
              {logout.isPending ? "Logging out..." : "Logout"}
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          </>
        )}
      </div>
    </header>
  );
}
