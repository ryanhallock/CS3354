import React, { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit: (u: string, p: string) => void;
  error?: string;
  isLoading?: boolean;
}

export function AuthForm({ type, onSubmit, error, isLoading }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isSignup = type === "signup";
  const passwordsMatch = !isSignup || password === confirmPassword;

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (isSignup && !passwordsMatch) return;
    onSubmit(username, password);
  };

  return (
    <section className="border-border bg-surface mx-auto my-5 max-w-130 rounded-[10px] border p-5 text-left shadow-sm">
      <h2 className="text-heading mb-4 text-2xl font-bold">{isSignup ? "Sign Up" : "Login"}</h2>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      {isSignup && !passwordsMatch && confirmPassword && (
        <p className="mb-4 text-sm text-red-500">Passwords do not match</p>
      )}

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <Input
          label="Username"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {isSignup && (
          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}

        <Button
          type="submit"
          className="mt-2"
          disabled={isLoading || (isSignup && !passwordsMatch)}
        >
          {isLoading ? "Processing..." : isSignup ? "Create Account" : "Log In"}
        </Button>
      </form>
    </section>
  );
}
