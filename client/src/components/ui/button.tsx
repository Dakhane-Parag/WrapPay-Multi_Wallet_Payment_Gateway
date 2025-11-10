import React from "react";
import { cn } from "@/lib/utils"; // optional: or replace with your own className joiner

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  const baseStyles =
    "font-oxanium rounded-2xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: `bg-[#d4790b] text-white hover:bg-[#b86409] active:bg-[#a25a08] focus:ring-[#d4790b]`,
    outline: `border-1 border-[#d4790b] bg-[#d4790b]/10 text-[#d4790b] focus:ring-[#d4790b]`,
    ghost: `text-[#d4790b] hover:bg-[#d4790b]/15 focus:ring-[#d4790b]`,
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
