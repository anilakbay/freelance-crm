// --------------------------------------------------------
// BİLEŞEN: Hızlı İşlemler
// DOSYA: src/components/dashboard/QuickActions.tsx
// GÖREV: Ana panelden hızlıca proje ve müşteri ekleme butonları.
// --------------------------------------------------------

import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 flex flex-col h-full">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>

      <div className="grid grid-cols-2 gap-4 flex-1">
        {/* --- YENİ PROJE BUTONU --- */}
        <Link
          href="/projects/new"
          className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-all group active:scale-95 duration-150"
        >
          {/* İkon */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          {/* Yazı */}
          <span className="text-xs sm:text-sm font-bold text-gray-700 group-hover:text-blue-700 text-center">
            Yeni Proje
          </span>
        </Link>

        {/* --- MÜŞTERİ EKLE BUTONU --- */}
        <Link
          href="/clients/new"
          className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 hover:bg-purple-50 hover:border-purple-400 transition-all group active:scale-95 duration-150"
        >
          {/* İkon */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </div>
          {/* Yazı */}
          <span className="text-xs sm:text-sm font-bold text-gray-700 group-hover:text-purple-700 text-center">
            Müşteri Ekle
          </span>
        </Link>
      </div>
    </div>
  );
}
