// --------------------------------------------------------
// SAYFA: Müşteri Listesi (MOBİL UYUMLU - HİBRİT)
// DOSYA: src/app/(dashboard)/clients/page.tsx
// GÖREV: Masaüstünde TABLO, Mobilde KART görünümü sunar.
// --------------------------------------------------------

import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";
import { deleteClient } from "@/actions/client";
import { Client } from "@/types/client";

export default async function ClientsPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/auth");

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error)
    return <div className="p-6 text-red-600">Hata: {error.message}</div>;

  const clients = (data as Client[]) || [];
  const hasClients = clients.length > 0;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Müşteri Listesi</h1>
          <p className="text-sm text-gray-500 mt-1">
            Toplam{" "}
            <span className="font-semibold text-gray-900">
              {clients.length}
            </span>{" "}
            kayıt.
          </p>
        </div>
        <Link
          href="/clients/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition-all gap-2 w-full sm:w-auto"
        >
          <span>+</span> Yeni Müşteri
        </Link>
      </div>

      {!hasClients ? (
        <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-gray-200">
          <p className="text-gray-500 text-lg">Henüz müşteri yok.</p>
          <Link
            href="/clients/new"
            className="text-blue-600 hover:underline mt-2"
          >
            İlk müşterini ekle
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
                      Müşteri
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      İletişim
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {clients.map((client) => (
                    <tr
                      key={client.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg uppercase shadow-sm">
                            {client.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-gray-900">
                              {client.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: #{client.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {client.email || "-"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {client.phone || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={client.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <DeleteButton id={client.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg uppercase shadow-sm">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        {client.name}
                      </h3>
                      <p className="text-xs text-gray-500">ID: #{client.id}</p>
                    </div>
                  </div>
                  <StatusBadge status={client.status} />
                </div>

                <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-2 border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-xs">📧</span>{" "}
                    {client.email || "E-posta yok"}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-xs">📱</span>{" "}
                    {client.phone || "Telefon yok"}
                  </div>
                </div>

                <div className="flex justify-end border-t pt-3 mt-1">
                  <DeleteButton id={client.id} />
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
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${
        status === "active"
          ? "bg-green-50 text-green-700 border-green-200"
          : status === "pending"
          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
          : "bg-gray-50 text-gray-600 border-gray-200"
      }`}
    >
      {status === "active" && "Aktif"}
      {status === "pending" && "Beklemede"}
      {status === "passive" && "Pasif"}
    </span>
  );
}

function DeleteButton({ id }: { id: number }) {
  return (
    <form action={deleteClient}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-gray-400 hover:text-red-600 flex items-center gap-1.5 text-sm font-medium transition-colors p-2 rounded hover:bg-red-50 border border-transparent hover:border-red-100"
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
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        Sil
      </button>
    </form>
  );
}
