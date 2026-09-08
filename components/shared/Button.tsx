import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary:
    "bg-signal-orange text-white hover:brightness-110 shadow-sm border border-transparent",
  secondary:
    "bg-hi-vis-yellow text-ink hover:brightness-105 border border-ink/10",
  ghost: "bg-transparent text-ink hover:bg-ink/5 border border-transparent",
  outline:
    "bg-card-white text-ink border border-ink/20 hover:border-ink/40 hover:bg-workshop-white",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
