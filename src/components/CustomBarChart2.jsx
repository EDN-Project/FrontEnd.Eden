import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CustomBarChart2 = ({ data }) => {
  // console.log("📊 Chart Data:", data); 

  if (!data || data.length === 0) {
    return <p style={{ textAlign: "center", color: "#bbb" }}>No data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
        <XAxis tickLine={false} axisLine={false} dataKey="year" tick={{ fill: "#bbb" }} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#bbb" }}
          label={{ angle: -90, position: "insideLeft", fill: "#bbb" }}
          tickFormatter={(value) => {
            if (value >= 1_000_000) {
              return `${(value / 1_000_000).toFixed(1)}M`;
            } else if (value >= 1_000) {
              return `${(value / 1_000).toFixed(1)}K`;
            }
            return value;
          }}
        />
        <Tooltip cursor={{ fill: "rgba(255,255,255,0.1)" }} />

        {data.length > 0 &&
          Object.keys(data[0])
            .filter((key) => key !== "year")
            .map((country) => (
              <Bar key={country} dataKey={country} fill="#4181C1" barSize={10} radius={[5, 5, 5, 5]} />
            ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart2;
