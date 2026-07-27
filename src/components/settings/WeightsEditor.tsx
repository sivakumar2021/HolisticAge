"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/Button";
import { COMPONENTS, COMPONENT_LABELS, DEFAULT_WEIGHTS, redistributeWeight } from "@/lib/weights";
import { COMPONENT_COLORS } from "@/lib/componentColors";
import type { ComponentType } from "@/generated/prisma/enums";

export function WeightsEditor({ initialWeights }: { initialWeights: Record<ComponentType, number> }) {
  const router = useRouter();
  const [weights, setWeights] = useState(initialWeights);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  function handleSlide(component: ComponentType, value: number) {
    setWeights((prev) => redistributeWeight(prev, component, value));
  }

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

  const pieData = COMPONENTS.map((c) => ({
    key: c,
    name: COMPONENT_LABELS[c],
    value: weights[c],
  }));

  return (
    <div>
      {/* Segmented bar — one block per component, sized by its share of 100%. */}
      <div className="flex h-10 w-full gap-0.5 overflow-hidden rounded-full bg-stone-100">
        {COMPONENTS.map((component) => (
          <div
            key={component}
            title={`${COMPONENT_LABELS[component]}: ${weights[component].toFixed(1)}%`}
            style={{
              width: `${weights[component]}%`,
              backgroundColor: COMPONENT_COLORS[component],
            }}
            className="h-full min-w-0 transition-[width] duration-150"
          />
        ))}
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-4">
          {COMPONENTS.map((component) => (
            <div key={component}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-stone-700">
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: COMPONENT_COLORS[component] }}
                  />
                  {COMPONENT_LABELS[component]}
                </span>
                <span className="tabular-nums text-stone-500">{weights[component].toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={0.5}
                value={weights[component]}
                onChange={(e) => handleSlide(component, parseFloat(e.target.value))}
                style={{ accentColor: COMPONENT_COLORS[component] }}
                className="w-full"
              />
            </div>
          ))}
        </div>

        <div className="mx-auto h-56 w-56 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius="55%"
                outerRadius="90%"
                paddingAngle={1}
                stroke="none"
              >
                {pieData.map((entry) => (
                  <Cell key={entry.key} fill={COMPONENT_COLORS[entry.key]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${Number(value).toFixed(1)}%`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="mt-6 text-sm text-stone-500">
        Total: <span className="tabular-nums font-medium text-stone-700">100%</span> — moving one
        slider rebalances the rest automatically, so the total always stays whole.
      </p>

      {message && (
        <p className={`mt-2 text-sm ${message.type === "error" ? "text-red-700" : "text-emerald-700"}`}>
          {message.text}
        </p>
      )}

      <div className="mt-4 flex gap-3">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save weights"}
        </Button>
        <Button variant="outline" onClick={handleReset} disabled={saving}>
          Reset to defaults
        </Button>
      </div>
    </div>
  );
}
