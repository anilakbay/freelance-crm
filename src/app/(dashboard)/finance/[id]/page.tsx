// --------------------------------------------------------
// SAYFA: Fatura Detay Sayfası
// DOSYA: src/app/(dashboard)/finance/[id]/page.tsx
// --------------------------------------------------------

import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";

// Veri tipini tam tanımlıyoruz
interface InvoiceDetail {
  id: number;
  invoice_date: string;
  due_date: string;
  amount: number;
  status: "pending" | "paid" | "overdue";
  description: string | null;
  created_at: string;
  // Supabase ilişkisel sorgusundan 'clients' tekil obje olarak döner
  clients: {
    name: string;
    email: string | null;
    phone: string | null;
    company: string | null;
  } | null;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InvoiceDetailPage({ params }: PageProps) {
  // 1. DÜZELTME: ID'yi sayıya çeviriyoruz
  const { id } = await params;
  const invoiceId = Number(id);

  // ID geçerli bir sayı değilse 404 döndür
  if (isNaN(invoiceId)) {
    return <div className="p-6 text-center">Geçersiz Fatura ID</div>;
  }

  const supabase = await createSupabaseServerClient();

  // 2. DÜZELTME: getSession yerine getUser (Güvenlik)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  // 3. DÜZELTME: Tek sorguda hem faturayı hem müşteriyi çekiyoruz (JOIN)
  const { data, error } = await supabase
    .from("invoices")
    .select(
      `
      *,
      clients (
        name,
        email,
        phone,
        company
      )
    `
    )
    .eq("id", invoiceId)
    .eq("user_id", user.id)
    .single();

  // TypeScript'e bu verinin bizim interface'imize uyduğunu söylüyoruz
  const invoiceData = data as unknown as InvoiceDetail;

  if (error || !invoiceData) {
    console.error("Invoice fetch error:", error);

    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Fatura Bulunamadı
          </h2>
          <p className="text-gray-600 mb-4">
            Aradığınız fatura mevcut değil veya silinmiş olabilir.
          </p>
          <Link
            href="/finance"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Faturalara Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <Link
            href="/finance"
            className="text-sm text-blue-600 hover:text-blue-800 mb-2 inline-flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Faturalara Dön
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Fatura #INV-{invoiceData.id}
          </h1>
        </div>
        <StatusBadge status={invoiceData.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Fatura Bilgileri
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Fatura Tarihi</p>
                  <p className="text-base font-medium text-gray-900 mt-1">
                    {new Date(invoiceData.invoice_date).toLocaleDateString(
                      "tr-TR",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Son Ödeme Tarihi</p>
                  <p className="text-base font-medium text-gray-900 mt-1">
                    {new Date(invoiceData.due_date).toLocaleDateString(
                      "tr-TR",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">Fatura Tutarı</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {Number(invoiceData.amount).toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}
                </p>
              </div>

              {invoiceData.description && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">Açıklama</p>
                  <p className="text-base text-gray-900 leading-relaxed">
                    {invoiceData.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Müşteri Bilgileri
            </h2>

            {invoiceData.clients ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Müşteri Adı</p>
                  <p className="text-base font-medium text-gray-900 mt-1">
                    {invoiceData.clients.name}
                  </p>
                </div>

                {invoiceData.clients.company && (
                  <div>
                    <p className="text-sm text-gray-500">Şirket</p>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {invoiceData.clients.company}
                    </p>
                  </div>
                )}

                {invoiceData.clients.email && (
                  <div>
                    <p className="text-sm text-gray-500">E-posta</p>
                    <a
                      href={`mailto:${invoiceData.clients.email}`}
                      className="text-base font-medium text-blue-600 hover:text-blue-800 mt-1 inline-block"
                    >
                      {invoiceData.clients.email}
                    </a>
                  </div>
                )}

                {invoiceData.clients.phone && (
                  <div>
                    <p className="text-sm text-gray-500">Telefon</p>
                    <a
                      href={`tel:${invoiceData.clients.phone}`}
                      className="text-base font-medium text-blue-600 hover:text-blue-800 mt-1 inline-block"
                    >
                      {invoiceData.clients.phone}
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Müşteri bilgisi bulunamadı</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500">Oluşturulma Tarihi</p>
            <p className="text-sm font-medium text-gray-700 mt-1">
              {new Date(invoiceData.created_at).toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${
        status === "paid"
          ? "bg-green-50 text-green-700 border-green-200"
          : status === "overdue"
          ? "bg-red-50 text-red-700 border-red-200"
          : "bg-yellow-50 text-yellow-700 border-yellow-200"
      }`}
    >
      {status === "paid" && "✓ Ödendi"}
      {status === "pending" && "○ Bekliyor"}
      {status === "overdue" && "⚠ Vadesi Geçti"}
    </span>
  );
}
