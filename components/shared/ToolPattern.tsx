/** Local tiled tool backdrop for empty states and overlays */
export function ToolPattern({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-tool-pattern ${className}`}
    />
  );
}
