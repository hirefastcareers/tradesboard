import { cn } from "@/lib/utils";

export function SkillChip({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-ink/5 px-2 py-0.5 text-xs font-medium text-ink/75",
        className,
      )}
    >
      {label}
    </span>
  );
}
