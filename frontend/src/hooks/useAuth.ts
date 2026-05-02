import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const AUTH_QUERY_KEY = ["auth-status"];

export interface User {
  username: string;
  createdAt?: string;
  message?: string;
}

export const useAuth = () => {
  const queryClient = useQueryClient();

  const query = useQuery<User | null>({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/auth/whoami", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error ?? "Not authenticated");
      return data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const loginMutation = useMutation({
    mutationFn: async ({ u, p }: { u: string; p: string }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: u, password: p }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error ?? "Login failed");
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, data);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async ({ u, p }: { u: string; p: string }) => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: u, password: p }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error ?? "Signup failed");

      // Log in automatically after registration
      return loginMutation.mutateAsync({ u, p });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, data);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Logout failed");
      return res;
    },
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
    },
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    login: loginMutation,
    register: registerMutation,
    logout: logoutMutation,
  };
};

export const useUserProfile = (username: string) => {
  return useQuery<User | null>({
    queryKey: ["user-profile", username],
    queryFn: async () => {
      const res = await fetch(`/api/user/${username}`, {
        method: "GET",
        credentials: "include",
      });
      if (res.status === 403) return null;
      if (!res.ok) throw new Error("Failed to fetch user profile");
      return res.json();
    },
    enabled: !!username,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message === "Failed to fetch user profile")
        return failureCount < 2;
      return false;
    },
  });
};
