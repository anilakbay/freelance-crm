// --------------------------------------------------------
// BİLEŞEN: Son Projeler Listesi
// DOSYA: src/components/dashboard/RecentProjects.tsx
// --------------------------------------------------------

import Link from "next/link";

interface Project {
  id: number;
  title: string;
  status: string;
  price: number | string | null;
}

export default function RecentProjects({ projects }: { projects: Project[] }) {
  // Son 5 projeyi al
  const recentList = projects.slice(0, 5);

  // Duruma göre renk ve metin belirleyen yardımcı fonksiyon
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return {
          text: "Aktif",
          style: "bg-blue-100 text-blue-700 border-blue-200",
        };
      case "completed":
        return {
          text: "Tamamlandı",
          style: "bg-green-100 text-green-700 border-green-200",
        };
      case "pending":
        return {
          text: "Beklemede",
          style: "bg-yellow-100 text-yellow-700 border-yellow-200",
        };
      case "cancelled":
        return {
          text: "İptal",
          style: "bg-red-100 text-red-700 border-red-200",
        };
      default:
        return {
          text: status,
          style: "bg-gray-100 text-gray-600 border-gray-200",
        };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          Son Projeler
        </h2>
        <Link
          href="/projects"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          Tümünü Gör
        </Link>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto">
        {recentList.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">
            Henüz proje kaydı yok.
          </div>
        ) : (
          recentList.map((project) => {
            const badge = getStatusBadge(project.status);

            return (
              <div
                key={project.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer group border border-transparent hover:border-blue-100"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  {/* Proje İkonu */}
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      project.status === "active"
                        ? "bg-blue-500"
                        : project.status === "completed"
                        ? "bg-green-500"
                        : project.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                  ></div>

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                      {project.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {project.price
                        ? `Bütçe: ${Number(project.price).toLocaleString(
                            "tr-TR"
                          )} ₺`
                        : "Bütçe: -"}
                    </p>
                  </div>
                </div>

                {/* Durum Rozeti */}
                <span
                  className={`text-xs font-bold px-2 py-1 rounded border whitespace-nowrap ${badge.style}`}
                >
                  {badge.text}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
