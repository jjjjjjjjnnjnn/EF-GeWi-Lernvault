import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", type = "button", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] text-xs font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
      default:
        "bg-[var(--ink)] text-white hover:opacity-90 active:scale-[0.99] shadow-none",
      destructive:
        "bg-rose-600 text-white hover:bg-rose-700 active:scale-[0.99]",
      outline:
        "border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--paper-subtle)] active:bg-slate-100",
      secondary:
        "bg-[var(--paper-subtle)] text-[var(--ink)] hover:bg-slate-200 active:bg-slate-300",
      ghost:
        "text-[var(--ink)] hover:bg-[var(--paper-subtle)] active:bg-slate-200",
      link: "text-[var(--ink)] underline-offset-4 hover:underline p-0 h-auto",
    };

    const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
      default: "h-8 px-3 py-1.5",
      sm: "h-7 px-2.5 text-[11px]",
      lg: "h-9 px-4 text-sm font-bold",
      icon: "h-8 w-8 p-0",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
