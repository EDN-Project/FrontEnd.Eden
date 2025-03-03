import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const CustomLineChartRecom = ({ data, unit = "k", strokeColor }) => {
  if (!data || data.length === 0) {
    return <p>Loading chart...</p>; // تجنب الأخطاء عند عدم توفر البيانات
  }

  const valueKey = Object.keys(data[0]).find(key => key !== "month");

  return (
    <div style={{ padding: 10, borderRadius: 10 }}>
      <ResponsiveContainer width="100%" height={300} style={{ marginTop: 30 }}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <XAxis 
            dataKey="month"  // تم تغيير "year" إلى "month"
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
            dataKey="value"  // تغيير dataKey ليعكس البيانات الجديدة
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
