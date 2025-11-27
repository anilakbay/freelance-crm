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

// Recharts uyumluluğu için esnek tip tanımı
interface StatusData {
  name: string;
  value: number;
  [key: string]: any;
}

const STATUS_COLORS: Record<string, string> = {
  Aktif: "#3B82F6",
  Tamamlandı: "#10B981",
  Beklemede: "#F59E0B",
  İptal: "#EF4444",
};

export default function StatusChart({ data }: { data: StatusData[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-[300px] flex items-center justify-center text-gray-500">
        Henüz proje verisi yok.
      </div>
    );
  }

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
              innerRadius={50}
              outerRadius={70}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={STATUS_COLORS[entry.name] || "#A1A1AA"}
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
              formatter={(value: number, name: string) => [
                `${value} Proje`,
                name,
              ]}
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
