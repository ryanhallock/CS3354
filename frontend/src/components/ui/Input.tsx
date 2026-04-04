import React from "react";
import { cn } from "@/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ 
  label, 
  className = "", 
  ...props 
}: InputProps) {
  return (
    <label className="flex flex-col font-medium text-text w-full">
      {label}
      <input
        className={cn(
          "mt-1.5 px-2.5 py-2 border border-border rounded-md bg-surface text-heading focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          className
        )}
        {...props}
      />
    </label>
  );
}
