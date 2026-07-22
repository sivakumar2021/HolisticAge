"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { COMPONENTS, COMPONENT_LABELS, DEFAULT_WEIGHTS } from "@/lib/weights";
import type { ComponentType } from "@/generated/prisma/enums";

export function WeightsEditor({ initialWeights }: { initialWeights: Record<ComponentType, number> }) {
  const router = useRouter();
  const [weights, setWeights] = useState(initialWeights);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const sum = COMPONENTS.reduce((s, c) => s + weights[c], 0);
  const isValid = Math.abs(sum - 100) < 0.01;

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/settings/weights", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weights }),
    });
    setSaving(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setMessage({ type: "error", text: body.error?.toString?.() ?? "Failed to save weights." });
      return;
    }
    setMessage({ type: "success", text: "Weights saved." });
    router.refresh();
  }

  async function handleReset() {
    setSaving(true);
    setMessage(null);
    await fetch("/api/settings/weights", { method: "DELETE" });
    setWeights(DEFAULT_WEIGHTS);
    setSaving(false);
    setMessage({ type: "success", text: "Reset to default weights." });
    router.refresh();
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {COMPONENTS.map((component) => (
          <div key={component}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-stone-700">{COMPONENT_LABELS[component]}</span>
              <span className="text-stone-500">{weights[component].toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={0.5}
              value={weights[component]}
              onChange={(e) =>
                setWeights((prev) => ({ ...prev, [component]: parseFloat(e.target.value) }))
              }
              className="w-full accent-emerald-800"
            />
          </div>
        ))}
      </div>

      <div className={`mt-4 text-sm font-medium ${isValid ? "text-emerald-700" : "text-red-700"}`}>
        Total: {sum.toFixed(1)}% {isValid ? "" : "(must equal 100%)"}
      </div>

      {message && (
        <p className={`mt-2 text-sm ${message.type === "error" ? "text-red-700" : "text-emerald-700"}`}>
          {message.text}
        </p>
      )}

      <div className="mt-4 flex gap-3">
        <Button onClick={handleSave} disabled={!isValid || saving}>
          {saving ? "Saving…" : "Save weights"}
        </Button>
        <Button variant="outline" onClick={handleReset} disabled={saving}>
          Reset to defaults
        </Button>
      </div>
    </div>
  );
}
