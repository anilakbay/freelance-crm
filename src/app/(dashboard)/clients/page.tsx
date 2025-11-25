import Link from "next/link";
import { redirect } from "next/navigation";
import { logout } from "@/actions/auth";
import { deleteClient } from "@/actions/client";
import { Client } from "@/types/client";
import { createSupabaseServerClient } from "@/lib/supabase";

export default async function ClientsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-10 text-red-500">Hata: {error.message}</div>;
  }

  const clients = data as Client[];

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Müşteri Listesi
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Toplam {clients?.length || 0} müşteri kayıtlı
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/new-client"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
            >
              <span>+</span> Yeni Ekle
            </Link>

            <form action={logout}>
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm">
                Çıkış Yap
              </button>
            </form>
          </div>
        </div>

        <div className="grid gap-4">
          {clients?.length === 0 ? (
            <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-gray-200">
              <p className="text-gray-500 text-lg">
                Henüz hiç müşteri eklenmemiş.
              </p>
              <Link
                href="/new-client"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                İlk müşterini ekle
              </Link>
            </div>
          ) : (
            clients?.map((client) => (
              <div
                key={client.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {client.name}
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 mt-1 text-sm text-gray-500">
                    <span>📧 {client.email || "Yok"}</span>
                    <span>📱 {client.phone || "Yok"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                      client.status === "active"
                        ? "bg-green-100 text-green-800"
                        : client.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {client.status}
                  </span>

                  <form action={deleteClient}>
                    <input type="hidden" name="id" value={client.id} />
                    <button
                      type="submit"
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Kaydı Sil"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
