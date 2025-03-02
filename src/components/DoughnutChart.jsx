import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Fourtuna", value: 30, color: "#F4C542" },
  { name: "Festival", value: 25, color: "#6E6E6E" },
  { name: "Sweet Charlie", value: 45, color: "#0D1B2A" },
];

const DoughnutChart = () => {
  return (

    <div className="flex items-center justify-between">
        <PieChart width={140} height={160}>
          <Pie
            data={data}
            cx={70}
            cy={70}
            innerRadius={45}
            outerRadius={65}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
        </PieChart>
        <div className="text-white text-sm">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-3 mb-2">
              <span
                className="inline-block w-5 h-2 rounded-lg"
                style={{ backgroundColor: entry.color }}
              ></span>
              {entry.name}
            </div>
          ))}
        </div>
        </div>

  );
};

export default DoughnutChart;
