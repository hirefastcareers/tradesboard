"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/Button";
import { TRADE_LABELS, TRADE_OPTIONS } from "@/lib/constants";

type FormState = {
  companyName: string;
  trade: string;
  town: string;
  postcode: string;
  logoUrl: string;
  bio: string;
};

export function EmployerOnboardingForm({
  initial,
}: {
  initial?: Partial<FormState>;
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    companyName: "",
    trade: "electrician",
    town: "",
    postcode: "",
    logoUrl: "",
    bio: "",
    ...initial,
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/employer/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Could not save company profile");
      }
      router.push("/employer/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-xl space-y-5 rounded-2xl border border-ink/10 bg-card-white p-6 shadow-card"
    >
      <div>
        <h1 className="font-display text-2xl font-bold">Company profile</h1>
        <p className="mt-1 text-sm text-ink/65">
          This information is shown to candidates when you contact them.
        </p>
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Company name</span>
        <input
          required
          value={form.companyName}
          onChange={(e) => update("companyName", e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Main trade</span>
        <select
          value={form.trade}
          onChange={(e) => update("trade", e.target.value)}
          className={inputClass}
        >
          {TRADE_OPTIONS.map((trade) => (
            <option key={trade} value={trade}>
              {TRADE_LABELS[trade]}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Town</span>
          <input
            required
            value={form.town}
            onChange={(e) => update("town", e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">Postcode</span>
          <input
            required
            value={form.postcode}
            onChange={(e) => update("postcode", e.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Logo URL (optional)</span>
        <input
          value={form.logoUrl}
          onChange={(e) => update("logoUrl", e.target.value)}
          className={inputClass}
          placeholder="https://"
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium">About the company</span>
        <textarea
          value={form.bio}
          onChange={(e) => update("bio", e.target.value)}
          rows={4}
          className={inputClass}
          placeholder="Describe your company, the roles you hire for and what candidates can expect."
        />
      </label>

      {error ? <p className="text-sm text-signal-orange">{error}</p> : null}

      <Button type="submit" className="w-full" disabled={saving}>
        {saving ? "Saving…" : "Save and search candidates"}
      </Button>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-ink/15 bg-workshop-white px-3 py-2.5 text-sm outline-none focus:border-steel-blue";
