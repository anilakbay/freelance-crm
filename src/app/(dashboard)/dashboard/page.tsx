// --------------------------------------------------------
// SAYFA: Ana Panel (Dashboard) Anasayfası
// DOSYA: src/app/(dashboard)/dashboard/page.tsx
// GÖREV: Kullanıcıya genel durumu özetleyen istatistikler ve kısayollar sunar.
// ÖZELLİK: Tamamen responsive (mobil/tablet/desktop) uyumludur.
// --------------------------------------------------------

import Link from "next/link";

export default function DashboardPage() {
  // --- 1. İSTATİSTİK VERİLERİ (MOCK - Piyasa Gerçeklerine Uygun) ---
  const stats = [
    {
      title: "Toplam Ciro",
      value: "₺342,850",
      change: "+%18",
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
      value: "8",
      change: "3 teslimat yaklaşıyor",
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
      title: "Müşteri Portföyü",
      value: "42",
      change: "+5 yeni",
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
      title: "Bekleyen Tahsilat",
      value: "₺18,400",
      change: "2 fatura",
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
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      ),
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  // --- 2. SON PROJELER VERİSİ (ÇEŞİTLENDİRİLMİŞ) ---
  const recentProjects = [
    {
      id: 1,
      title: "B2B Lojistik Paneli",
      client: "Delta Lojistik A.Ş.",
      price: "₺85,000",
      color: "bg-blue-500", // Kategori rengi (Yazılım)
    },
    {
      id: 2,
      title: "Kurumsal Kimlik & Logo",
      client: "Nova Mimarlık",
      price: "₺12,500",
      color: "bg-purple-500", // Kategori rengi (Tasarım)
    },
    {
      id: 3,
      title: "Spor Salonu CRM Entegrasyonu",
      client: "FitLife Gym",
      price: "₺35,000",
      color: "bg-indigo-500", // Kategori rengi (Entegrasyon)
    },
    {
      id: 4,
      title: "SEO ve Blog Yönetimi",
      client: "Ege Turizm",
      price: "₺4,500",
      color: "bg-orange-500", // Kategori rengi (Pazarlama)
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      {/* --- BAŞLIK ALANI --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Hoş Geldiniz 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            İşlerinizin genel durumuna hızlı bir bakış.
          </p>
        </div>
        <div className="hidden sm:block text-sm text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
          {new Date().toLocaleDateString("tr-TR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* --- İSTATİSTİK KARTLARI (Responsive Grid) --- */}
      {/* Mobil: 1 sütun, Tablet: 2 sütun, PC: 4 sütun */}
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
            {/* Alt Bilgi */}
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

      {/* --- ALT BÖLÜM: PROJELER ve KISAYOLLAR --- */}
      {/* Mobil: Alt alta (1 sütun), Geniş Ekran: Yan yana (2 sütun) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* SOL: Son Projeler Listesi */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Son Hareketler
            </h2>
            <Link
              href="/projects"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Tümünü Gör
            </Link>
          </div>

          <div className="space-y-3">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer group border border-transparent hover:border-blue-100"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  {/* Proje rengi noktası */}
                  <div
                    className={`w-2 h-2 rounded-full ${project.color} shrink-0`}
                  ></div>

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                      {project.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3 h-3 text-gray-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a3 3 0 003 3h8a3 3 0 003-3V4.517c0-1.103-.806-2.068-1.93-2.207A41.92 41.92 0 0010 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {project.client}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-gray-700 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm ml-2 whitespace-nowrap">
                  {project.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SAĞ: Hızlı İşlem Menüsü */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
            Hızlı İşlemler
          </h2>

          <div className="grid grid-cols-2 gap-4 flex-1">
            {/* Büyük butonlar: Mobilde parmakla basması kolay olsun diye padding artırıldı */}
            <Link
              href="/projects/new"
              className="flex flex-col items-center justify-center p-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-all group active:scale-95 duration-150"
            >
              <span className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
              <span className="text-sm font-bold text-gray-700 group-hover:text-blue-700 text-center">
                Yeni Proje Oluştur
              </span>
            </Link>

            <Link
              href="/clients/new"
              className="flex flex-col items-center justify-center p-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 hover:bg-purple-50 hover:border-purple-400 transition-all group active:scale-95 duration-150"
            >
              <span className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                  />
                </svg>
              </span>
              <span className="text-sm font-bold text-gray-700 group-hover:text-purple-700 text-center">
                Müşteri Ekle
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
