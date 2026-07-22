"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface TrendPoint {
  date: string;
  holisticAge: number;
  calendarAge: number;
}

export function HolisticAgeTrendChart({ data }: { data: TrendPoint[] }) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#78716c" }} />
          <YAxis tick={{ fontSize: 12, fill: "#78716c" }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="holisticAge"
            name="Holistic Age"
            stroke="#065f46"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="calendarAge"
            name="Calendar Age"
            stroke="#a8a29e"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
