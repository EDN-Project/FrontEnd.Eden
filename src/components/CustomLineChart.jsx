import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const CustomLineChart = ({ data, unit = "$" ,strokeColor}) => {
  // استخراج اسم المفتاح من البيانات (مثل "price" أو أي اسم آخر)
  const valueKey = Object.keys(data[0]).find(key => key !== "year");

  return (
    <div style={{ padding: 20, borderRadius: 10 }}>
      
      <ResponsiveContainer width="100%" height={300} style={{
        marginTop: 30
      }}>
       <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
  <XAxis 
    dataKey="year" 
    tick={{ fill: "#bbb" }} 
    tickLine={false} 
    axisLine={false}
    dy={20} // Moves X-axis labels down
  />
  <YAxis 
    tick={{ fill: "#bbb" }} 
    tickLine={false} 
    axisLine={false}
    dx={-20} // Moves Y-axis labels left
    tickFormatter={(value) => `${value} ${unit}`}
  />
          <Tooltip 
            contentStyle={{ backgroundColor: "#222", borderRadius: 5, color: "#fff" }} 
            formatter={(value) => `${value} ${unit}`} // تغيير وحدة التولتيب أيضًا
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

export default CustomLineChart;
