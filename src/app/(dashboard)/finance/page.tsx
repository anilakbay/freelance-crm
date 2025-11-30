// --------------------------------------------------------
// SAYFA: Fatura Listesi (MOBİL UYUMLU)
// DOSYA: src/app/(dashboard)/finance/page.tsx
// --------------------------------------------------------

import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";
import { deleteInvoice } from "@/actions/invoice";

interface InvoiceWithClient {
  id: number;
  invoice_date: string;
  due_date: string;
  amount: number;
  status: "pending" | "paid" | "overdue";
  clients: { name: string } | null;
}

export default async function InvoicesPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/auth");

  const { data: invoices, error } = await supabase
    .from("invoices")
    .select(`*, clients (name)`)
    .order("invoice_date", { ascending: false });

  if (error)
    return <div className="p-6 text-red-600">Hata: {error.message}</div>;

  const invoiceList = (invoices as unknown as InvoiceWithClient[]) || [];
  const hasInvoices = invoiceList.length > 0;

  const totalAmount = invoiceList.reduce(
    (sum, inv) => sum + (inv.amount || 0),
    0
  );
  const pendingAmount = invoiceList
    .filter((inv) => inv.status === "pending" || inv.status === "overdue")
    .reduce((sum, inv) => sum + (inv.amount || 0), 0);

  return (
    <div className="space-y-6 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Bekleyen Tahsilat</p>
          <h3 className="text-2xl font-bold text-orange-600 mt-2">
            {pendingAmount.toLocaleString("tr-TR", {
              style: "currency",
              currency: "TRY",
            })}
          </h3>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">
            Ödenen Fatura Sayısı
          </p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            {invoiceList.filter((inv) => inv.status === "paid").length}
          </h3>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Faturalar</h1>
        <Link
          href="/finance/new"
          className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-bold text-white shadow-md hover:bg-green-700 transition-all gap-2 w-full sm:w-auto"
        >
          <span>+</span> Yeni Fatura Kes
        </Link>
      </div>

      {!hasInvoices ? (
        <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-gray-200">
          <p className="text-gray-500 text-lg">
            Henüz kesilmiş bir faturanız yok.
          </p>
          <Link
            href="/finance/new"
            className="text-green-600 hover:underline mt-2"
          >
            İlk faturayı şimdi kes &rarr;
          </Link>
        </div>
      ) : (
        <>
          <div className="hidden md:block bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
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
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(invoice.invoice_date).toLocaleDateString(
                          "tr-TR"
                        )}{" "}
                        /{" "}
                        {new Date(invoice.due_date).toLocaleDateString("tr-TR")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={invoice.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end items-center gap-3">
                          <Link
                            href={`/finance/${invoice.id}`}
                            className="text-blue-600 hover:text-blue-900 font-medium"
                          >
                            Detay
                          </Link>
                          <DeleteButton id={invoice.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:hidden">
            {invoiceList.map((invoice) => (
              <div
                key={invoice.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      #INV-{invoice.id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {invoice.clients?.name}
                    </p>
                  </div>
                  <StatusBadge status={invoice.status} />
                </div>

                <div className="flex justify-between items-center border-t border-b py-3 border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Tutar</p>
                    <p className="text-lg font-bold text-gray-900">
                      {invoice.amount?.toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase">Vade</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(invoice.due_date).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end items-center gap-4 pt-1">
                  <Link
                    href={`/finance/${invoice.id}`}
                    className="text-blue-600 hover:text-blue-900 font-medium text-sm"
                  >
                    Detay Görüntüle
                  </Link>
                  <DeleteButton id={invoice.id} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
        status === "paid"
          ? "bg-green-50 text-green-700 border-green-200"
          : status === "overdue"
          ? "bg-red-50 text-red-700 border-red-200"
          : "bg-yellow-50 text-yellow-700 border-yellow-200"
      }`}
    >
      {status === "paid" && "Ödendi"}
      {status === "pending" && "Bekliyor"}
      {status === "overdue" && "Vadesi Geçti"}
    </span>
  );
}

function DeleteButton({ id }: { id: number }) {
  return (
    <form action={deleteInvoice}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-gray-400 hover:text-red-600 transition-colors p-1.5 rounded hover:bg-red-50"
        title="Faturayı Sil"
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
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </form>
  );
}
