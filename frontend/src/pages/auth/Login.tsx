import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AuthForm } from "@/components/auth/AuthForm";

export default function Login() {
  const navigate = useNavigate();
  const { user, isLoading: isUserLoading, login } = useAuth();

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

  const handleLogin = (u: string, p: string) => {
    login.mutate({ u, p }, {
      onSuccess: () => {
        navigate("/myflashcards");
      }
    });
  };

  return (
    <div className="pt-10 px-4">
      <AuthForm 
        type="login" 
        onSubmit={handleLogin} 
        error={login.error?.message} 
        isLoading={login.isPending}
      />
      <p className="text-center mt-6 text-text">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary hover:underline font-medium">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
