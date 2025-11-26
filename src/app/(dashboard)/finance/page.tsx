// --------------------------------------------------------
// SAYFA: Fatura Listesi
// DOSYA: src/app/(dashboard)/finance/page.tsx <--- Düzeltildi
// GÖREV: Kesilen/Ödenen tüm faturaları listeler ve finansal durumu özetler.
// --------------------------------------------------------

import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";

// TypeScript'in Joini anlaması için geçici/lokal tip tanımı
interface InvoiceWithClient {
  id: number;
  invoice_date: string;
  due_date: string;
  amount: number;
  status: "pending" | "paid" | "overdue";
  clients: { name: string } | null;
  // Diğer invoice sütunları...
}

export default async function InvoicesPage() {
  const supabase = await createSupabaseServerClient();

  // 1. Oturum Kontrolü
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/auth");

  // 2. Faturaları Çek (Müşteri adıyla birlikte)
  const { data: invoices, error } = await supabase
    .from("invoices")
    // clients(name) ile müşterinin adını çekiyoruz
    .select(
      `
      *,
      clients (name)
    `
    )
    .order("invoice_date", { ascending: false });

  if (error) {
    return <div className="p-6 text-red-600">Hata: {error.message}</div>;
  }

  // Güvenli tip dönüşümü
  const invoiceList = (invoices as unknown as InvoiceWithClient[]) || [];
  const hasInvoices = invoiceList.length > 0;

  // 3. Finansal Özet Hesaplama (Kartlar için)
  const totalAmount = invoiceList.reduce(
    (sum, inv) => sum + (inv.amount || 0),
    0
  );
  const pendingAmount = invoiceList
    .filter((inv) => inv.status === "pending" || inv.status === "overdue")
    .reduce((sum, inv) => sum + (inv.amount || 0), 0);

  return (
    <div className="space-y-6">
      {/* --- FİNANSAL ÖZET KARTLARI --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Toplam Kesilen */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">
            Toplam Fatura Tutarı
          </p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            {totalAmount.toLocaleString("tr-TR", {
              style: "currency",
              currency: "TRY",
            })}
          </h3>
        </div>
        {/* Bekleyen Tahsilat */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Bekleyen Tahsilat</p>
          <h3 className="text-2xl font-bold text-orange-600 mt-2">
            {pendingAmount.toLocaleString("tr-TR", {
              style: "currency",
              currency: "TRY",
            })}
          </h3>
        </div>
        {/* Ödenmiş Fatura Sayısı - (İleride eklenebilir) */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">
            Ödenen Fatura Sayısı
          </p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            {invoiceList.filter((inv) => inv.status === "paid").length}
          </h3>
        </div>
      </div>

      {/* --- BAŞLIK VE BUTON --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Faturalar</h1>
        <Link
          // ✅ HATA DÜZELTİLDİ: /invoices/new yerine /finance/new kullanıyoruz
          href="/finance/new"
          className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-bold text-white shadow-md hover:bg-green-700 transition-all gap-2"
        >
          <span>+</span> Yeni Fatura Kes
        </Link>
      </div>

      {/* --- FATURA LİSTESİ --- */}
      {!hasInvoices ? (
        <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-gray-200">
          <p className="text-gray-500 text-lg">
            Henüz kesilmiş bir faturanız yok.
          </p>
          <Link
            // ✅ HATA DÜZELTİLDİ: /invoices/new yerine /finance/new kullanıyoruz
            href="/finance/new"
            className="text-green-600 hover:underline mt-2"
          >
            İlk faturayı şimdi kes &rarr;
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Fatura No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Müşteri
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tutar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Kesim/Vade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Aksiyon
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoiceList.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #INV-{invoice.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {invoice.clients?.name || "Müşteri Silinmiş"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {invoice.amount?.toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      }) || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(invoice.invoice_date).toLocaleDateString(
                        "tr-TR"
                      )}{" "}
                      / {new Date(invoice.due_date).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          invoice.status === "paid"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : invoice.status === "overdue"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }`}
                      >
                        {invoice.status === "paid" && "Ödendi"}
                        {invoice.status === "pending" && "Bekliyor"}
                        {invoice.status === "overdue" && "Vadesi Geçti"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/invoices/${invoice.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Detay
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
