import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";

export function Header() {
  const navigate = useNavigate();
  const { user, isLoading: isUserLoading, logout } = useAuth();

  const isAuthenticated = !!user;

  return (
    <header className="sticky top-0 left-0 w-full z-100 bg-surface border-b border-border shadow-[0_2px_10px_rgba(0,0,0,0.08)] flex items-center justify-between px-5 py-2.5">
      <Link to="/" className="font-bold text-base text-heading no-underline">
        W.H.A.T.T
      </Link>

      <div className="flex gap-2">
        {isUserLoading ? (
          <div className="w-20 h-8 animate-pulse bg-gray-100 rounded-md" />
        ) : isAuthenticated ? (
          <>
            <Button variant="outline" onClick={() => navigate("/myflashcards")}>My Flashcards</Button>
            <Button variant="outline" onClick={() => navigate("/search")}>Search</Button>
            <Button variant="outline" onClick={() => navigate("/create")}>Create</Button>
            <Button variant="outline" onClick={() => navigate("/profile")}>Profile</Button>
            <Button onClick={() => logout.mutate(undefined, { onSuccess: () => navigate("/") })} disabled={logout.isPending}>
              {logout.isPending ? "Logging out..." : "Logout"}
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          </>
        )}
      </div>
    </header>
  );
}
