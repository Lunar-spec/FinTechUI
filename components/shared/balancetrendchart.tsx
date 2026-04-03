"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  TooltipProps,
} from "recharts";
import { balanceTrend } from "@/data/transactions";

type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: Array<{
    name?: string;
    value?: number;
    payload?: { color?: string };
  }>;
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length || !label) return null;
  const value = payload[0].value ?? 0;
  const isPositive = value >= 0;

  return (
    <div className="rounded-lg border bg-background px-3 py-2 shadow-md text-sm min-w-35">
      <p className="text-muted-foreground text-xs mb-1">
        {new Date(label).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
          style={{ backgroundColor: "#0088FE" }}
        />
        <span className="text-muted-foreground text-xs">Balance</span>
      </div>
      <p
        className={`font-semibold tabular-nums mt-0.5 ${isPositive ? "text-emerald-500" : "text-red-500"}`}
      >
        ₹{Number(value).toLocaleString("en-IN")}
      </p>
    </div>
  );
};

export default function BalanceTrendChart() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-lg font-semibold">Balance Trend</span>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={balanceTrend}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0088FE" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#0088FE" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10 }}
            tickFormatter={(d) =>
              new Date(d).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              })
            }
          />
          <YAxis
            tick={{ fontSize: 10 }}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            width={45}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#0088FE"
            strokeWidth={2}
            fill="url(#balanceGradient)"
            dot={{ r: 3, fill: "#0088FE" }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
