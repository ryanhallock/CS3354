import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useSettings } from "@/hooks/useSettings";

const TEXT_SIZES = ["SMALL", "MEDIUM", "LARGE", "X_LARGE"] as const;
const THEMES = ["LIGHT", "DARK", "SYSTEM"] as const;

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const handlePasswordChange = async () => {
    setPasswordError("");
    setPasswordSuccess("");
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords don't match!");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }
    try {
      const res = await fetch("/api/user/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Failed to update password");
      setPasswordSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update password";
      setPasswordError(message);
    }
  };
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
      document.documentElement.setAttribute(
        "data-text-size",
        settings.textSize.replace("_", "-").toLowerCase(),
      );
    }
  }, [settings?.textSize]);

  // Apply theme
  useEffect(() => {
    if (settings?.theme) {
      document.documentElement.setAttribute("data-theme", settings.theme.toLowerCase());
    }
  }, [settings?.theme]);

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
    <div className="flex flex-col gap-5 py-5">
      <div className="bg-surface border-border mx-auto w-full max-w-130 rounded-[10px] border p-5 text-left shadow-sm">
        <h2 className="text-heading mb-6 text-2xl font-bold">Settings</h2>

        {/* Text Size */}
        <section className="mb-6">
          <div className="group relative mb-2 flex items-center gap-1.5">
            <h3 className="text-heading text-sm font-semibold tracking-wide uppercase">
              Text Size
            </h3>
            <div className="text-text hover:text-primary cursor-help transition-colors">
              <Info size={14} />
            </div>
            <div className="bg-primary text-surface absolute bottom-full left-0 mb-2 hidden w-48 rounded-md px-3 py-2 text-xs font-medium shadow-lg group-hover:block">
              This setting only applies to the text within flashcards.
              <div className="bg-primary absolute top-full left-4 h-2 w-2 -translate-y-1/2 rotate-45" />
            </div>
          </div>
          <div className="flex gap-2">
            {TEXT_SIZES.map((size) => (
              <Button
                key={size}
                variant={settings?.textSize === size ? "primary" : "outline"}
                disabled={updateTextSize.isPending}
                onClick={() => updateTextSize.mutate(size)}
              >
                {size
                  .replace("_", "-")
                  .toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </Button>
            ))}
          </div>
          {updateTextSize.isError && (
            <p className="mt-2 text-sm text-red-500">{updateTextSize.error?.message}</p>
          )}
        </section>

        {/* Theme */}
        <section>
          <h3 className="text-heading mb-2 text-sm font-semibold tracking-wide uppercase">Theme</h3>
          <div className="flex gap-2">
            {THEMES.map((theme) => (
              <Button
                key={theme}
                variant={settings?.theme === theme ? "primary" : "outline"}
                disabled={updateSettings.isPending}
                onClick={() => updateSettings.mutate({ theme })}
              >
                {theme.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
              </Button>
            ))}
          </div>
          {updateSettings.isError && (
            <p className="mt-2 text-sm text-red-500">{updateSettings.error?.message}</p>
          )}
        </section>
      </div>

      {/* Change Password */}
      <div className="bg-surface border-border mx-auto w-full max-w-130 rounded-[10px] border p-5 text-left shadow-sm">
        <h3 className="text-heading mb-4 text-sm font-semibold tracking-wide uppercase">
          Change Password
        </h3>
        <div className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border-border rounded-lg border px-3 py-2 text-sm"
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border-border rounded-lg border px-3 py-2 text-sm"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-border rounded-lg border px-3 py-2 text-sm"
          />
          {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
          {passwordSuccess && <p className="text-sm text-green-500">{passwordSuccess}</p>}
          <Button onClick={handlePasswordChange}>Update Password</Button>
        </div>
      </div>
    </div>
  );
}
