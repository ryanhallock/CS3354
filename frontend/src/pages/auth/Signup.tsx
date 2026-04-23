import { Link, Navigate, useNavigate } from "react-router-dom";

import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";

export default function Signup() {
  const navigate = useNavigate();
  const { user, isLoading: isUserLoading, register } = useAuth();

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

  const handleSignup = (u: string, p: string) => {
    register.mutate(
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
        type="signup"
        onSubmit={handleSignup}
        error={register.error?.message}
        isLoading={register.isPending}
      />
      <p className="text-text mt-6 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}
