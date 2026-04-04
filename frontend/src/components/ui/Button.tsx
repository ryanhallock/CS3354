import React from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export function Button({ 
  children, 
  variant = "primary", 
  className = "", 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: "bg-primary text-white border-none hover:bg-opacity-90",
    secondary: "bg-gray-200 text-heading border-none hover:bg-gray-300",
    outline: "border border-border bg-transparent text-heading hover:bg-gray-50",
  };

  return (
    <button 
      className={cn(
        "px-3.5 py-2 rounded-md font-medium cursor-pointer transition-colors duration-200",
        variants[variant],
        className
      )} 
      {...props}
    >
      {children}
    </button>
  );
}
