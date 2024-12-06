"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface ButtonOption {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export interface ButtonGroupProps {
  options: ButtonOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  fullWidth?: boolean;
}

export function ButtonGroup({
  options,
  value,
  onChange,
  className,
  variant = "outline",
  size = "default",
  fullWidth = false,
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex rounded-md shadow-sm",
        fullWidth && "w-full",
        className
      )}
      role="group"
    >
      {options.map((option: ButtonOption, index: number) => (
        <Button
          type="button"
          key={option.value}
          variant={variant}
          size={size}
          onClick={() => onChange(option.value)}
          className={cn(
            // Base styles
            "relative",
            fullWidth && "flex-1",
            // Border radius management
            index === 0 && "rounded-r-none",
            index === options.length - 1 && "rounded-l-none",
            index !== 0 && index !== options.length - 1 && "rounded-none",
            // Border management
            index !== 0 && "-ml-px",
            // Active state
            value === option.value &&
              variant === "outline" &&
              "bg-primary text-primary-foreground hover:bg-primary/90",
            value == option.value && "hover:text-secondary",
            // Custom className if provided
            option.className
          )}
          disabled={option.disabled}
        >
          {option.icon && <span className="mr-2">{option.icon}</span>}
          {option.label}
        </Button>
      ))}
    </div>
  );
}
