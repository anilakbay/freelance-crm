// --------------------------------------------------------
// SAYFA: Yeni Müşteri Ekleme
// DOSYA: src/app/(dashboard)/clients/new/page.tsx
// GÖREV: Müşteri ekleme formunu şık ve uyumlu bir şekilde gösterir.
// --------------------------------------------------------

import ClientForm from "@/components/forms/ClientForm";
import Link from "next/link";

export default function NewClientPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* --- Başlık ve Geri Dön Linki --- */}
      <div className="mb-6">
        <Link
          href="/clients"
          className="text-gray-500 hover:text-gray-900 text-sm flex items-center gap-1 transition-colors mb-2 w-fit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Listeye Geri Dön
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Yeni Müşteri Ekle</h1>
        <p className="text-sm text-gray-500 mt-1">
          Sisteme yeni bir müşteri kaydı oluşturun.
        </p>
      </div>

      {/* --- Form Alanı (Kart Görünümü) --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <ClientForm />
      </div>
    </div>
  );
}
