import {
  TRADE_COLORS,
  TRADE_LABELS,
  type Trade,
} from "@/lib/constants";
import { cn, isTrade } from "@/lib/utils";

export function TradeBadge({
  trade,
  className,
}: {
  trade: string;
  className?: string;
}) {
  const key: Trade = isTrade(trade) ? trade : "other";
  const colors = TRADE_COLORS[key];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold",
        colors.bg,
        colors.text,
        colors.border,
        className,
      )}
    >
      {TRADE_LABELS[key]}
    </span>
  );
}
