// src/app/(dashboard)/finance/new/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";
import InvoiceForm from "@/components/forms/InvoiceForm"; // Bu bileşene ihtiyacımız var

export default async function NewInvoicePage() {
  const supabase = await createSupabaseServerClient();

  // 1. Oturum Kontrolü
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/auth");

  // 2. Müşteri Listesini Çek (Formdaki dropdown için)
  // Faturalar müşteriye kesildiği için bu veri zorunludur.
  const { data: clients, error } = await supabase
    .from("clients")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    return (
      <div className="p-10 text-red-500">Müşteri listesi yüklenemedi.</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Başlık ve Geri Dön Linki */}
      <div className="mb-6">
        <Link
          href="/finance"
          className="text-gray-500 hover:text-gray-900 text-sm flex items-center gap-1 transition-colors mb-2 w-fit"
        >
          &larr; Faturalara Dön
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Yeni Fatura Kes</h1>
      </div>

      {/* Form Bileşeni (Müşterileri forma gönderiyoruz) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <InvoiceForm clients={clients || []} />
      </div>
    </div>
  );
}
