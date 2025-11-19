import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function ClientsPage() {
  // 1. Veritabanından verileri çek
  const { data: clients, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  // Hata varsa ekrana bas
  if (error) {
    return <div className="p-10 text-red-500 font-bold">Hata: {error.message}</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Başlık */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Müşteri Listesi</h1>
          <Link href="/" className="text-blue-600 hover:underline font-medium">
            ← Ana Sayfaya Dön
          </Link>
        </div>

        {/* Liste Alanı */}
        <div className="grid gap-4">
          {clients?.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
              <p className="text-gray-500">Henüz hiç müşteri yok.</p>
            </div>
          ) : (
            // DÜZELTME BURADA: (client: any) yazdık 👇
            clients?.map((client: any) => (
              <div 
                key={client.id} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{client.name}</h2>
                  <div className="flex gap-3 mt-1 text-sm text-gray-500">
                    <span>📧 {client.email || 'E-posta yok'}</span>
                    <span>📱 {client.phone || 'Tel yok'}</span>
                  </div>
                </div>

                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                  client.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {client.status}
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}