// --------------------------------------------------------
// BİLEŞEN: Aylık Gelir Grafiği (Bar Chart) - FİNAL
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

// 1. Grafiğin beklediği veri tipi
interface ChartData {
  month: string;
  total: number;
}

// 2. Bileşenin aldığı prop'lar (data'yı zorunlu kılıyoruz)
export default function RevenueChart({ data }: { data: ChartData[] }) {
  // Veri boşsa veya null ise hata vermesin, boş dizi kullansın
  const chartData = data || [];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-[300px]">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Aylık Gelir Analizi
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
          />

          <XAxis
            dataKey="month"
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
            dataKey="total"
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
