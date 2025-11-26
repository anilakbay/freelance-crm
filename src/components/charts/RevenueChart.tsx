// --------------------------------------------------------
// BİLEŞEN: Aylık Gelir Grafiği (Bar Chart)
// DOSYA: src/components/charts/RevenueChart.tsx
// --------------------------------------------------------

"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// TODO: İleride bu veriler veritabanından dinamik olarak çekilebilir.
const data = [
  { name: "Oca", kazanc: 12000 },
  { name: "Şub", kazanc: 19000 },
  { name: "Mar", kazanc: 15000 },
  { name: "Nis", kazanc: 28000 },
  { name: "May", kazanc: 14000 },
  { name: "Haz", kazanc: 32000 },
  { name: "Tem", kazanc: 22000 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-[300px]">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Aylık Gelir Analizi
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickFormatter={(value) => `₺${value / 1000}k`}
          />

          <Tooltip
            cursor={{ fill: "#F3F4F6" }}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            formatter={(value: number) => [
              `${value.toLocaleString("tr-TR")} ₺`,
              "Kazanç",
            ]}
          />

          <Bar
            dataKey="kazanc"
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
