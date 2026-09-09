"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/Button";
import {
  AGE_RANGES,
  CANDIDATE_CHECKS,
  CERT_OPTIONS,
  EMPTY_CANDIDATE_CHECKS,
  TRADE_LABELS,
  TRADE_OPTIONS,
  type CandidateChecks,
} from "@/lib/constants";

const STEPS = [
  "Basic info",
  "Trade & skills",
  "Education",
  "Experience",
  "Tickets & checks",
  "Bio & photo",
] as const;

type FormState = {
  firstName: string;
  ageRange: string;
  postcode: string;
  town: string;
  tradeInterests: string[];
  currentlyStudying: string;
  workExperience: string;
  certifications: string[];
  bio: string;
  photoUrl: string;
  checks: CandidateChecks;
};

const INITIAL: FormState = {
  firstName: "",
  ageRange: "16-18",
  postcode: "",
  town: "",
  tradeInterests: [],
  currentlyStudying: "",
  workExperience: "",
  certifications: [],
  bio: "",
  photoUrl: "",
  checks: { ...EMPTY_CANDIDATE_CHECKS },
};

function toggleValue(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function CandidateOnboardingForm({
  initial,
}: {
  initial?: Partial<FormState>;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    ...INITIAL,
    ...initial,
    checks: {
      ...EMPTY_CANDIDATE_CHECKS,
      ...(initial?.checks ?? {}),
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const progress = useMemo(
    () => Math.round(((step + 1) / STEPS.length) * 100),
    [step],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function save(complete = false) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/candidate/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, complete }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Could not save your profile");
      }
      if (complete) {
        router.push("/candidate/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function next() {
    if (step < STEPS.length - 1) {
      await save(false);
      setStep((s) => s + 1);
      return;
    }
    await save(true);
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <p className="text-sm font-medium text-ink/60">
          Step {step + 1} of {STEPS.length} · {STEPS[step]}
        </p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-signal-orange transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-card-white p-6 shadow-card">
        {step === 0 && (
          <div className="space-y-4">
            <h1 className="font-display text-2xl font-bold">About you</h1>
            <Field label="First name">
              <input
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className={inputClass}
                required
              />
            </Field>
            <Field label="Age range">
              <select
                value={form.ageRange}
                onChange={(e) => update("ageRange", e.target.value)}
                className={inputClass}
              >
                {AGE_RANGES.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Town">
                <input
                  value={form.town}
                  onChange={(e) => update("town", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Postcode">
                <input
                  value={form.postcode}
                  onChange={(e) => update("postcode", e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h1 className="font-display text-2xl font-bold">Trades you want</h1>
            <p className="text-sm text-ink/65">
              Pick one or more. Employers filter on these.
            </p>
            <div className="flex flex-wrap gap-2">
              {TRADE_OPTIONS.map((trade) => {
                const active = form.tradeInterests.includes(trade);
                return (
                  <button
                    key={trade}
                    type="button"
                    onClick={() =>
                      update(
                        "tradeInterests",
                        toggleValue(form.tradeInterests, trade),
                      )
                    }
                    className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                      active
                        ? "border-signal-orange bg-signal-orange/10 text-signal-orange"
                        : "border-ink/15 bg-workshop-white text-ink"
                    }`}
                  >
                    {TRADE_LABELS[trade]}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h1 className="font-display text-2xl font-bold">Education</h1>
            <Field label="Currently studying (optional)">
              <input
                value={form.currentlyStudying}
                onChange={(e) => update("currentlyStudying", e.target.value)}
                placeholder="e.g. Level 2 Electrical at Leeds College"
                className={inputClass}
              />
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h1 className="font-display text-2xl font-bold">Experience</h1>
            <Field label="Work experience (optional)">
              <textarea
                value={form.workExperience}
                onChange={(e) => update("workExperience", e.target.value)}
                rows={5}
                placeholder="Weekend shifts, placements, helping family on site…"
                className={inputClass}
              />
            </Field>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h1 className="font-display text-2xl font-bold">
                Tickets & checks
              </h1>
              <p className="mt-1 text-sm text-ink/65">
                Tick what you have. Employers scan these first.
              </p>
            </div>
            <div className="space-y-2">
              {CANDIDATE_CHECKS.map((item) => {
                const on = form.checks[item.key];
                return (
                  <label
                    key={item.key}
                    className={`flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2.5 text-sm font-medium transition ${
                      on
                        ? "border-signal-orange/40 bg-signal-orange/8 text-ink"
                        : "border-ink/15 bg-workshop-white text-ink"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-signal-orange"
                      checked={on}
                      onChange={() =>
                        update("checks", {
                          ...form.checks,
                          [item.key]: !on,
                        })
                      }
                    />
                    {item.label}
                  </label>
                );
              })}
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-ink">
                Other certificates
              </p>
              <div className="flex flex-wrap gap-2">
                {CERT_OPTIONS.map((cert) => {
                  const active = form.certifications.includes(cert);
                  return (
                    <button
                      key={cert}
                      type="button"
                      onClick={() =>
                        update(
                          "certifications",
                          toggleValue(form.certifications, cert),
                        )
                      }
                      className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                        active
                          ? "border-hi-vis-yellow bg-hi-vis-yellow/40 text-ink"
                          : "border-ink/15 bg-workshop-white text-ink"
                      }`}
                    >
                      {cert}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h1 className="font-display text-2xl font-bold">Bio & photo</h1>
            <Field label="Short bio">
              <textarea
                value={form.bio}
                onChange={(e) => update("bio", e.target.value)}
                rows={4}
                placeholder="Who you are, what you're after, when you can start."
                className={inputClass}
              />
            </Field>
            <Field label="Photo URL (optional for now)">
              <input
                value={form.photoUrl}
                onChange={(e) => update("photoUrl", e.target.value)}
                placeholder="https://"
                className={inputClass}
              />
            </Field>
          </div>
        )}

        {error ? (
          <p className="mt-4 text-sm text-signal-orange">{error}</p>
        ) : null}

        <div className="mt-6 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            disabled={step === 0 || saving}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          <Button onClick={next} disabled={saving}>
            {step === STEPS.length - 1
              ? saving
                ? "Saving…"
                : "Finish profile"
              : saving
                ? "Saving…"
                : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-ink/15 bg-workshop-white px-3 py-2.5 text-sm outline-none focus:border-steel-blue";
