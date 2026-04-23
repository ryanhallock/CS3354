import { Link, Navigate, useNavigate } from "react-router-dom";

import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { user, isLoading: isUserLoading, login } = useAuth();

  if (isUserLoading) {
    return (
      <div className="bg-surface flex min-h-screen items-center justify-center">
        <div className="text-heading animate-pulse text-xl font-medium">Checking session...</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/myflashcards" replace />;
  }

  const handleLogin = (u: string, p: string) => {
    login.mutate(
      { u, p },
      {
        onSuccess: () => {
          navigate("/myflashcards");
        },
      },
    );
  };

  return (
    <div className="px-4 pt-10">
      <AuthForm
        type="login"
        onSubmit={handleLogin}
        error={login.error?.message}
        isLoading={login.isPending}
      />
      <p className="text-text mt-6 text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary font-medium hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
