import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
  patterned?: boolean;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  className,
  patterned = true,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-dashed border-ink/20 bg-workshop-white px-6 py-14 text-center",
        className,
      )}
    >
      <div className="relative mx-auto max-w-md space-y-3">
        <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
        <p className="text-sm leading-relaxed text-ink/70">{description}</p>
        {actionLabel && actionHref ? (
          <div className="pt-2">
            <Link href={actionHref}>
              <Button>{actionLabel}</Button>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
