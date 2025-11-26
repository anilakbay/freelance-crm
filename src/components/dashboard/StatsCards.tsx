import React from "react";

interface StatsProps {
  totalRevenue: number;
  activeProjects: number;
  totalClients: number;
  pendingTasks: number;
}

export default function StatsCards({
  totalRevenue,
  activeProjects,
  totalClients,
  pendingTasks,
}: StatsProps) {
  const stats = [
    {
      title: "Toplam Ciro",
      value: `${totalRevenue.toLocaleString("tr-TR")} ₺`,
      change: "Güncel",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-green-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Aktif Projeler",
      value: activeProjects.toString(),
      change: "Devam eden",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-blue-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
          />
        </svg>
      ),
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Toplam Müşteri",
      value: totalClients.toString(),
      change: "Kayıtlı",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-purple-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z"
          />
        </svg>
      ),
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Bekleyen İşler",
      value: pendingTasks.toString(),
      change: "Tamamlanmamış",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-orange-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="relative overflow-hidden rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 group"
        >
          <div className="flex items-center">
            <div
              className={`rounded-lg p-3 ${item.bgColor} group-hover:scale-110 transition-transform duration-200`}
            >
              {item.icon}
            </div>
            <div className="ml-4 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  {item.title}
                </dt>
                <dd>
                  <div className="text-lg font-bold text-gray-900">
                    {item.value}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs border-t border-gray-50 pt-3">
            <span
              className={`font-bold ${item.textColor} bg-opacity-10 px-2 py-0.5 rounded`}
            >
              {item.change}
            </span>
            <span className="ml-2 text-gray-400">geçen aya göre</span>
          </div>
        </div>
      ))}
    </div>
  );
}
