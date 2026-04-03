"use client";

import {
  Pie,
  PieChart,
  PieLabelRenderProps,
  PieSectorShapeProps,
  Sector,
  Tooltip,
  TooltipProps,
} from "recharts";

const RADIAN = Math.PI / 180;
export const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A855F7",
  "#EC4899",
  "#14B8A6",
  "#F97316",
  "#84CC16",
];

type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: Array<{
    name?: string;
    value?: number;
    payload?: { color?: string };
  }>;
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  const color = payload[0].payload?.color ?? COLORS[0];

  return (
    <div className="rounded-lg border bg-background px-3 py-2 shadow-md text-sm">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="font-semibold">{name}</span>
      </div>
      <span className="text-muted-foreground">
        ₹{Number(value).toLocaleString("en-IN")}
      </span>
    </div>
  );
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null)
    return null;
  const radius =
    Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
  const ncx = Number(cx),
    ncy = Number(cy);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => (
  <Sector
    {...props}
    fill={props.payload?.color ?? COLORS[props.index % COLORS.length]}
  />
);
export default function DashPieChart({
  data,
  isAnimationActive = true,
}: {
  data: { name: string; value: number; color?: string }[];
  isAnimationActive?: boolean;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex items-center gap-6 w-full max-w-sm">
      <div className="shrink-0 w-40 h-40">
        <PieChart width={160} height={160}>
          <Pie
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            innerRadius="40%"
            paddingAngle={2}
            outerRadius="100%"
            dataKey="value"
            isAnimationActive={isAnimationActive}
            shape={MyCustomPie}
          />
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </div>

      <div className="flex flex-col gap-2 min-w-0 flex-1">
        {data.map((entry, i) => {
          const color = entry.color ?? COLORS[i % COLORS.length];
          const pct =
            total > 0 ? ((entry.value / total) * 100).toFixed(1) : "0";
          return (
            <div key={entry.name} className="flex items-center gap-2 min-w-0">
              <span
                className="inline-block h-2 w-2 shrink-0 rounded-sm"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-muted-foreground truncate flex-1">
                {entry.name}
              </span>
              <span className="text-xs font-medium tabular-nums shrink-0">
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
