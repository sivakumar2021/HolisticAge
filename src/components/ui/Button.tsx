import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-emerald-800 text-white hover:bg-emerald-900 disabled:bg-emerald-800/50",
  secondary: "bg-amber-600 text-white hover:bg-amber-700 disabled:bg-amber-600/50",
  outline: "border border-stone-300 text-stone-800 hover:bg-stone-50 disabled:opacity-50",
  ghost: "text-stone-700 hover:bg-stone-100 disabled:opacity-50",
  danger: "bg-red-700 text-white hover:bg-red-800 disabled:bg-red-700/50",
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
>(function Button({ variant = "primary", className = "", ...props }, ref) {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
});
