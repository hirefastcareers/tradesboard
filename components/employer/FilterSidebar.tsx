"use client";

import { AGE_RANGES, TRADE_LABELS, TRADE_OPTIONS } from "@/lib/constants";
import { Button } from "@/components/shared/Button";

export type FilterState = {
  trade: string;
  town: string;
  ageRange: string;
};

type FilterSidebarProps = {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onClear: () => void;
};

export function FilterSidebar({
  filters,
  onChange,
  onClear,
}: FilterSidebarProps) {
  return (
    <aside className="space-y-5 rounded-2xl border border-ink/10 bg-card-white p-5">
      <div>
        <h2 className="font-display text-lg font-bold text-ink">Filters</h2>
        <p className="mt-1 text-sm text-ink/60">
          Narrow the candidates you want to message.
        </p>
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-ink">Trade</span>
        <select
          value={filters.trade}
          onChange={(e) => onChange({ ...filters, trade: e.target.value })}
          className="w-full rounded-md border border-ink/15 bg-workshop-white px-3 py-2.5 text-sm outline-none focus:border-steel-blue"
        >
          <option value="">Any trade</option>
          {TRADE_OPTIONS.map((trade) => (
            <option key={trade} value={trade}>
              {TRADE_LABELS[trade]}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-ink">Town or postcode</span>
        <input
          type="text"
          value={filters.town}
          onChange={(e) => onChange({ ...filters, town: e.target.value })}
          placeholder="e.g. Leeds or LS1"
          className="w-full rounded-md border border-ink/15 bg-workshop-white px-3 py-2.5 text-sm outline-none focus:border-steel-blue"
        />
        <span className="block text-xs text-ink/50">
          Radius filtering comes next — for now we match town or postcode text.
        </span>
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-ink">Age range</span>
        <select
          value={filters.ageRange}
          onChange={(e) => onChange({ ...filters, ageRange: e.target.value })}
          className="w-full rounded-md border border-ink/15 bg-workshop-white px-3 py-2.5 text-sm outline-none focus:border-steel-blue"
        >
          <option value="">Any age</option>
          {AGE_RANGES.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </label>

      <Button variant="outline" className="w-full" onClick={onClear}>
        Clear filters
      </Button>
    </aside>
  );
}
