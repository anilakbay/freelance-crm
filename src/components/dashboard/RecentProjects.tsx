import Link from "next/link";

interface Project {
  id: number;
  title: string;
  status: string;
  price: number | string | null;
}

export default function RecentProjects({ projects }: { projects: Project[] }) {
  const recentList = projects.slice(0, 5);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active":
        return "badge badge-blue";
      case "completed":
        return "badge badge-green";
      case "pending":
        return "badge badge-yellow";
      case "cancelled":
        return "badge badge-red";
      default:
        return "badge bg-gray-100 text-gray-600";
    }
  };

  const getStatusText = (status: string) => {
    const map: Record<string, string> = {
      active: "Aktif",
      completed: "Tamamlandı",
      pending: "Beklemede",
      cancelled: "İptal",
    };
    return map[status] || status;
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Son Projeler</h2>
        <Link
          href="/projects"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Tümünü Gör →
        </Link>
      </div>

      <div className="space-y-3">
        {recentList.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">Henüz proje yok</p>
          </div>
        ) : (
          recentList.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}/edit`}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  project.status === "active"
                    ? "bg-blue-500"
                    : project.status === "completed"
                    ? "bg-green-500"
                    : project.status === "pending"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                }`}></div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {project.price
                      ? `${Number(project.price).toLocaleString("tr-TR")} ₺`
                      : "Bütçe belirtilmedi"}
                  </p>
                </div>
              </div>

              <span className={getStatusStyle(project.status)}>
                {getStatusText(project.status)}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
