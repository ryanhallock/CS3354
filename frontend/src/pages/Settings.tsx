import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useSettings } from "@/hooks/useSettings";

const TEXT_SIZES = ["small", "medium", "large", "x-large"] as const;
const THEMES = ["light", "dark", "system"] as const;

export default function Settings() {
  const { user, isLoading: isUserLoading } = useAuth();
  const {
    settings,
    isLoading: isSettingsLoading,
    updateTextSize,
    updateSettings,
  } = useSettings(!!user);

  // Apply text size
  useEffect(() => {
    if (settings?.textSize) {
      document.documentElement.setAttribute("data-text-size", settings.textSize);
    }
  }, [settings?.textSize]);

  if (isUserLoading) {
    return (
      <div className="bg-surface flex min-h-screen items-center justify-center">
        <div className="text-heading animate-pulse text-xl font-medium">Checking session...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (isSettingsLoading) {
    return (
      <div className="bg-surface flex min-h-screen items-center justify-center">
        <div className="text-heading animate-pulse text-xl font-medium">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="bg-surface border-border mx-auto my-5 max-w-130 rounded-[10px] border p-5 shadow-sm">
      <h2 className="text-heading mb-6 text-2xl font-bold">Settings</h2>

      {/* Text Size */}
      <section className="mb-6">
        <h3 className="text-heading mb-2 text-sm font-semibold tracking-wide uppercase">
          Text Size
        </h3>
        <div className="flex gap-2">
          {TEXT_SIZES.map((size) => (
            <Button
              key={size}
              variant={settings?.textSize === size ? "primary" : "outline"}
              disabled={updateTextSize.isPending}
              onClick={() => updateTextSize.mutate(size)}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </Button>
          ))}
        </div>
        {updateTextSize.isError && (
          <p className="mt-2 text-sm text-red-500">{updateTextSize.error?.message}</p>
        )}
      </section>

      {/* Theme */}
      <section className="mb-6">
        <h3 className="text-heading mb-2 text-sm font-semibold tracking-wide uppercase">Theme</h3>
        <div className="flex gap-2">
          {THEMES.map((theme) => (
            <Button
              key={theme}
              variant={settings?.theme === theme ? "primary" : "outline"}
              disabled={updateSettings.isPending}
              onClick={() => updateSettings.mutate({ theme })}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </Button>
          ))}
        </div>
        {updateSettings.isError && (
          <p className="mt-2 text-sm text-red-500">{updateSettings.error?.message}</p>
        )}
      </section>
    </div>
  );
}
