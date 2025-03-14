import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";



const CustomBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 80 }}>
        <YAxis axisLine={false} tick={{ fill: "#bbb" }} tickLine={false} />
        <XAxis 
          dataKey="year" 
          axisLine={false} 
          tick={{ fill: "#bbb", angle: -45, textAnchor: "end" }} 
          tickLine={false} 
        />
        <Tooltip cursor={{ fill: "rgba(255,255,255,0.1)" }} />
        <Bar dataKey="price" fill="#9b5af9" radius={[10, 10, 10, 10]} barSize={20}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`}>
              <text
                x={index * 75 + 50} 
                y={200 - entry.price / 100} 
                transform={`rotate(-90, ${index * 50 + 35}, ${250 - entry.price / 100})`}
                textAnchor="middle"
                fill="#fff"
                fontSize={12}
                fontWeight="bold"
              >
                {entry.price} $
              </text>
            </Cell>
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
