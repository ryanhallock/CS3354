import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute() {
  const { user, isLoading, isError } = useAuth();

  if (isLoading) {
    return (
      <div className="bg-surface flex min-h-screen items-center justify-center">
        <div className="text-heading animate-pulse text-xl font-medium">Verifying...</div>
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
