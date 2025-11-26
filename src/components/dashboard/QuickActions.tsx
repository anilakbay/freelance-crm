import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 flex flex-col">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>
      <div className="grid grid-cols-2 gap-4 flex-1">
        <Link
          href="/projects/new"
          className="flex flex-col items-center justify-center p-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-all group active:scale-95 duration-150"
        >
          <span className="text-sm font-bold text-gray-700 group-hover:text-blue-700 text-center">
            + Yeni Proje
          </span>
        </Link>
        <Link
          href="/clients/new"
          className="flex flex-col items-center justify-center p-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 hover:bg-purple-50 hover:border-purple-400 transition-all group active:scale-95 duration-150"
        >
          <span className="text-sm font-bold text-gray-700 group-hover:text-purple-700 text-center">
            + Müşteri Ekle
          </span>
        </Link>
      </div>
    </div>
  );
}
