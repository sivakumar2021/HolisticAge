"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Cell, Pie, PieChart } from "recharts";
import type { PieLabelRenderProps } from "recharts";
import { Button } from "@/components/ui/Button";
import {
  COMPONENTS,
  COMPONENT_LABELS,
  DEFAULT_WEIGHTS,
  MIN_RATING,
  MAX_RATING,
  ratingsToWeights,
  weightsToRatings,
} from "@/lib/weights";
import { COMPONENT_COLORS } from "@/lib/componentColors";
import type { ComponentType } from "@/generated/prisma/enums";

const RADIAN = Math.PI / 180;
const CHART_WIDTH = 560;
const CHART_HEIGHT = 400;
const OUTER_RADIUS = 95;
const INNER_RADIUS = 58;

// Draws a leader line from the slice edge out to a label showing the
// component name and its percentage, instead of relying on hover/tooltip.
function renderSliceLabel(props: PieLabelRenderProps) {
  const cx = Number(props.cx ?? 0);
  const cy = Number(props.cy ?? 0);
  const midAngle = props.midAngle ?? 0;
  const percent = props.percent ?? 0;
  const payload = props.payload as { key: ComponentType; name: string };
  const color = COMPONENT_COLORS[payload.key];
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (OUTER_RADIUS + 6) * cos;
  const sy = cy + (OUTER_RADIUS + 6) * sin;
  const mx = cx + (OUTER_RADIUS + 26) * cos;
  const my = cy + (OUTER_RADIUS + 26) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 16;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={color} strokeWidth={1.5} fill="none" />
      <circle cx={ex} cy={ey} r={2.5} fill={color} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 6}
        y={ey}
        dy={4}
        textAnchor={textAnchor}
        fontSize={12}
        fill="#44403c"
      >
        {`${payload.name} ${Math.round(percent * 100)}%`}
      </text>
    </g>
  );
}

export function WeightsEditor({ initialWeights }: { initialWeights: Record<ComponentType, number> }) {
  const router = useRouter();
  const [ratings, setRatings] = useState(() => weightsToRatings(initialWeights));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const weights = useMemo(() => ratingsToWeights(ratings), [ratings]);

  function handleRate(component: ComponentType, value: number) {
    setRatings((prev) => ({ ...prev, [component]: value }));
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
    setRatings(weightsToRatings(DEFAULT_WEIGHTS));
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
      <div className="flex flex-col gap-3">
        {COMPONENTS.map((component) => (
          <div key={component} className="flex items-center gap-4">
            <span className="flex w-32 shrink-0 items-center gap-2 text-sm font-medium text-stone-700">
              <span
                aria-hidden
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: COMPONENT_COLORS[component] }}
              />
              {COMPONENT_LABELS[component]}
            </span>
            <input
              type="range"
              min={MIN_RATING}
              max={MAX_RATING}
              step={1}
              value={ratings[component]}
              onChange={(e) => handleRate(component, parseInt(e.target.value, 10))}
              style={{ accentColor: COMPONENT_COLORS[component] }}
              className="w-32 sm:w-40"
            />
            <span className="w-10 text-right text-sm tabular-nums text-stone-500">
              {ratings[component]}/10
            </span>
            <span className="w-14 text-right text-sm tabular-nums font-medium text-stone-700">
              {weights[component].toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-stone-500">
        Rate how important each area is to you, from 1 to 10 — we convert your ratings into
        percentage weights that always add up to 100%.
      </p>

      <div className="mt-4 overflow-x-auto">
        <PieChart width={CHART_WIDTH} height={CHART_HEIGHT} className="mx-auto">
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            innerRadius={INNER_RADIUS}
            outerRadius={OUTER_RADIUS}
            paddingAngle={1}
            stroke="none"
            labelLine={false}
            label={renderSliceLabel}
          >
            {pieData.map((entry) => (
              <Cell key={entry.key} fill={COMPONENT_COLORS[entry.key]} />
            ))}
          </Pie>
        </PieChart>
      </div>

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
