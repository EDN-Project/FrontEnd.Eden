import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const CustomLineChartQ = ({ data, unit = "k", strokeColor }) => {
  const valueKey = data?.length > 0 ? Object.keys(data[0]).find(key => key !== "year") : "growthQuantity";

  return (
    <div style={{ padding: 10, borderRadius: 10 }}>
      <ResponsiveContainer width="100%" height={300} style={{ marginTop: 30 }}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <XAxis 
            dataKey="year" 
            tick={{ fill: "#bbb" }} 
            tickLine={false} 
            axisLine={false}
            dy={10} 
          />
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
          <Tooltip 
            contentStyle={{ backgroundColor: "#222", borderRadius: 5, color: "#fff" }} 
            formatter={(value) => `${value} ${unit}`} 
          />
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

export default CustomLineChartQ;
