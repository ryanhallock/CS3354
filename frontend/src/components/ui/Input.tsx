import React from "react";

import { cn } from "@/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <label className="text-text flex w-full flex-col font-medium">
      {label}
      <input
        className={cn(
          "border-border bg-surface text-heading focus:ring-primary mt-1.5 rounded-md border px-2.5 py-2 focus:border-transparent focus:ring-2 focus:outline-none",
          className,
        )}
        {...props}
      />
    </label>
  );
}
