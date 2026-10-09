import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default:
      "border-transparent bg-[var(--ink)] text-white hover:opacity-90",
    secondary:
      "border-transparent bg-[var(--paper-subtle)] text-[var(--ink)] hover:bg-slate-200",
    destructive:
      "border-transparent bg-rose-100 text-rose-800 border border-rose-200",
    outline:
      "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono font-bold tracking-tight transition-colors select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
