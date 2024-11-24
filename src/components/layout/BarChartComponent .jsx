import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={600}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="0 0" />
      <XAxis dataKey="province" angle={-45} textAnchor="end" tick={{ fontSize: 12 }} height={150} />
      <YAxis width={65} />
      <Tooltip />
      <Bar dataKey="Timbulan Sampah (Ton)" fill="var(--emerald-400)" />
    </BarChart>
  </ResponsiveContainer>
);

export default BarChartComponent;
