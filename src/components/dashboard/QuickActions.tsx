import Link from "next/link";

export default function QuickActions() {
  const actions = [
    {
      title: "Yeni Proje",
      href: "/projects/new",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      gradient: "from-blue-500 to-indigo-600",
      hover: "hover:from-blue-600 hover:to-indigo-700",
    },
    {
      title: "Müşteri Ekle",
      href: "/clients/new",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-600",
      hover: "hover:from-purple-600 hover:to-pink-700",
    },
    {
      title: "Fatura Kes",
      href: "/finance/new",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      gradient: "from-green-500 to-emerald-600",
      hover: "hover:from-green-600 hover:to-emerald-700",
    },
    {
      title: "Görev Ekle",
      href: "/tasks/new",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      gradient: "from-orange-500 to-red-600",
      hover: "hover:from-orange-600 hover:to-red-700",
    },
  ];

  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`group flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br ${action.gradient} ${action.hover} text-white transition-all duration-200 hover:scale-105 hover:shadow-lg`}
          >
            <div className="mb-3">
              {action.icon}
            </div>
            <span className="text-sm font-bold text-center">
              {action.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
