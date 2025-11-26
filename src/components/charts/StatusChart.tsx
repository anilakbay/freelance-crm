// --------------------------------------------------------
// BİLEŞEN: Proje Durum Grafiği (Pie Chart)
// DOSYA: src/components/charts/StatusChart.tsx
// --------------------------------------------------------

"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  { name: "Aktif", value: 5, color: "#3B82F6" }, // Mavi
  { name: "Tamamlandı", value: 3, color: "#10B981" }, // Yeşil
  { name: "Beklemede", value: 2, color: "#F59E0B" }, // Sarı
  { name: "İptal", value: 1, color: "#EF4444" }, // Kırmızı
];

export default function StatusChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-[300px] flex flex-col">
      <h2 className="text-lg font-bold text-gray-900 mb-2">Proje Durumları</h2>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50} // Donut görünümü için iç boşluk
              outerRadius={70}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  strokeWidth={0}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{ color: "#374151" }}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={10}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
