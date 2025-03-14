import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const CustomLineChartRecom = ({ data, unit = "k", strokeColor = "#8884d8" }) => {
  console.log("📊 Chart Data:", data);
  if (!data || data.length === 0) {
    return <p style={{ textAlign: "center", color: "#bbb" }}>📊 Loading chart...</p>;
  }

  // العثور على مفتاح القيمة تلقائيًا، مع استبعاد "month"
  const valueKey = Object.keys(data[0]).find((key) => key !== "month");

  if (!valueKey) {
    return <p style={{ textAlign: "center", color: "red" }}>❌ Invalid data format</p>;
  }

  return (
    <div style={{ padding: 10, borderRadius: 10 }}>
      <ResponsiveContainer width="100%" height={300} style={{ marginTop: 30 }}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          {/* X-Axis */}
          <XAxis
            dataKey="month"
            tick={{ fill: "#bbb" }}
            tickLine={false}
            axisLine={false}
            dy={10}
          />

          {/* Y-Axis */}
          <YAxis
            tick={{ fill: "#bbb" }}
            tickLine={false}
            axisLine={false}
            dx={-20}
            tickFormatter={(value) => {
              if (value >= 1_000_000) {
                return `${(value / 1_000_000).toFixed(1)}M`;
              } else if (value >= 1_000) {
                return `${(value / 1_000).toFixed(1)}K`;
              }
              return value;
            }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{ backgroundColor: "#222", borderRadius: 5, color: "#fff" }}
            formatter={(value) => `${value} ${unit}`}
            labelFormatter={(label) => `Month: ${label}`}
          />

          {/* Line Chart */}
          <Line
            type="monotone"
            dataKey={valueKey}
            stroke={strokeColor}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChartRecom;
