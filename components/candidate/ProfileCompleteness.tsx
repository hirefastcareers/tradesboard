import { cn } from "@/lib/utils";

export function ProfileCompleteness({
  percent,
  className,
}: {
  percent: number;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <div
      className={cn(
        "rounded-2xl border border-ink/10 bg-card-white p-5",
        className,
      )}
    >
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-display text-lg font-bold text-ink">
            Profile completeness
          </p>
          <p className="mt-1 text-sm text-ink/65">
            {clamped < 100
              ? "Complete more sections to improve your visibility to employers."
              : "Your profile is complete and ready for employers to review."}
          </p>
        </div>
        <p className="font-display text-3xl font-extrabold leading-none text-signal-orange">
          {clamped}%
        </p>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-ink/10">
        <div
          className="h-full rounded-full bg-signal-orange transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
