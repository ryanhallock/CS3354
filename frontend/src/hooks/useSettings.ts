import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const SETTINGS_QUERY_KEY = ["settings"];

export interface UserSettings {
  textSize: "SMALL" | "MEDIUM" | "LARGE" | "X_LARGE";
  theme: "LIGHT" | "DARK" | "SYSTEM";
}

export const useSettings = (enabled: boolean = true) => {
  const queryClient = useQueryClient();

  const query = useQuery<UserSettings | null>({
    queryKey: SETTINGS_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/settings", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error ?? "Failed to load settings");
      return data;
    },
    enabled, // ← only runs when true
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (updates: Partial<Pick<UserSettings, "textSize" | "theme">>) => {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updates),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error ?? "Failed to save settings");
      return data as UserSettings;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(SETTINGS_QUERY_KEY, data);
    },
  });

  const updateTextSizeMutation = useMutation({
    mutationFn: async (size: UserSettings["textSize"]) => {
      const res = await fetch(`/api/settings/text-size?textSize=${size}`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error((data as { error?: string }).error ?? "Failed to update text size");
      return data as UserSettings;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(SETTINGS_QUERY_KEY, data);
    },
  });

  return {
    settings: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    updateSettings: updateSettingsMutation,
    updateTextSize: updateTextSizeMutation,
  };
};
