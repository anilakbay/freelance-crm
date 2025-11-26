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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6">
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

      <div className="space-y-3">
        {recentList.length === 0 ? (
          <p className="text-sm text-gray-500 italic">Henüz proje kaydı yok.</p>
        ) : (
          recentList.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer group border border-transparent hover:border-blue-100"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
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
              <span
                className={`text-xs font-bold px-2 py-1 rounded border ${
                  project.status === "active"
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-gray-100 text-gray-600 border-gray-200"
                }`}
              >
                {project.status === "active" ? "Aktif" : project.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
