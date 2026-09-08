"use client";

import { useMemo, useState } from "react";
import {
  CandidateCard,
  type CandidateCardData,
} from "@/components/candidate/CandidateCard";
import {
  FilterSidebar,
  type FilterState,
} from "@/components/employer/FilterSidebar";
import { EmptyState } from "@/components/shared/EmptyState";

const EMPTY_FILTERS: FilterState = {
  trade: "",
  town: "",
  ageRange: "",
};

export function EmployerBrowse({
  candidates,
}: {
  candidates: CandidateCardData[];
}) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);

  const filtered = useMemo(() => {
    const townQuery = filters.town.trim().toLowerCase();
    return candidates.filter((c) => {
      if (
        filters.trade &&
        !c.tradeInterests.some(
          (t) => t.toLowerCase() === filters.trade.toLowerCase(),
        )
      ) {
        return false;
      }
      if (filters.ageRange && c.ageRange !== filters.ageRange) {
        return false;
      }
      if (townQuery) {
        const haystack = `${c.town}`.toLowerCase();
        if (!haystack.includes(townQuery)) return false;
      }
      return true;
    });
  }, [candidates, filters]);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <FilterSidebar
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(EMPTY_FILTERS)}
      />
      <div>
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h2 className="font-display text-xl font-bold text-ink">
            Candidates
          </h2>
          <p className="text-sm text-ink/55">
            {filtered.length} shown
          </p>
        </div>
        {filtered.length === 0 ? (
          <EmptyState
            title="No candidates match yet"
            description="Try widening your search area, clearing a trade filter, or checking back soon. New profiles land every week."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                href={`/candidate/${candidate.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
