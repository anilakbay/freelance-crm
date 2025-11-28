// --------------------------------------------------------
// SAYFA: Yeni Fatura Ekleme
// DOSYA: src/app/(dashboard)/finance/new/page.tsx
// GÖREV: Müşteri listesini çeker ve fatura formunu gösterir.
// --------------------------------------------------------

import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";
import InvoiceForm from "@/components/forms/InvoiceForm";

export default async function NewInvoicePage() {
  const supabase = await createSupabaseServerClient();

  // 1. Güvenli Oturum Kontrolü (getUser ile)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // 2. Müşteri Listesini Çek (Formdaki dropdown için)
  const { data: clients, error } = await supabase
    .from("clients")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    return (
      <div className="p-10 text-red-600 bg-red-50 rounded-lg m-6 border border-red-100">
        <p className="font-bold">Veri Çekme Hatası</p>
        <p className="text-sm">Müşteri listesi yüklenemedi: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Başlık ve Geri Dön Linki */}
      <div className="mb-6">
        <Link
          href="/finance" // Doğru Adres
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
          Faturalara Dön
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Yeni Fatura Kes</h1>
        <p className="text-sm text-gray-500 mt-1">
          Müşteriniz için yeni bir ödeme kaydı oluşturun.
        </p>
      </div>

      {/* Form Bileşeni */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <InvoiceForm clients={clients || []} />
      </div>
    </div>
  );
}
