import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Fe", value: 30, color: "#F4C542" },
  { name: "Ca", value: 25, color: "#0E4100" },
  { name: "Mg", value: 45, color: "#0D1B2A" },
  { name: "G", value: 45, color: "#560BAD" },
  { name: "Zn", value: 45, color: "#939179" },


];

const DoughnutChart = () => {
  return (
    <div className="flex items-center justify-between p-4">
        <PieChart width={180} height={220}>
          <Pie
            data={data}
            cx={90}
            cy={100}
            innerRadius={50}
            outerRadius={80}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
        </PieChart>
        <div className="text-white text-sm ml-4">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-3 mb-3">
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
