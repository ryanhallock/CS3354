import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/auth/AuthForm";

export default function Signup() {
  const navigate = useNavigate();
  const { user, isLoading: isUserLoading, register } = useAuth();

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-xl font-medium animate-pulse text-heading">Checking session...</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/myflashcards" replace />;
  }

  const handleSignup = (u: string, p: string) => {
    register.mutate({ u, p }, {
      onSuccess: () => {
        navigate("/myflashcards");
      }
    });
  };

  return (
    <div className="pt-10 px-4">
      <AuthForm 
        type="signup" 
        onSubmit={handleSignup} 
        error={register.error?.message} 
        isLoading={register.isPending}
      />
      <p className="text-center mt-6 text-text">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline font-medium">
          Log In
        </Link>
      </p>
    </div>
  );
}
