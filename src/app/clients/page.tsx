import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { logout } from "@/actions/auth"; // Çıkış fonksiyonunu çağırdık

export default async function ClientsPage() {
  // Verileri çek
  const { data: clients, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-10 text-red-500">Hata çıktı: {error.message}</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        
        {/* ÜST BAR: Başlık, İstatistik ve Aksiyon Butonları */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          
          {/* Sol Taraf: Başlık ve Sayı */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Müşteri Listesi</h1>
            <p className="text-gray-500 text-sm mt-1">
              Toplam {clients?.length || 0} müşteri kayıtlı
            </p>
          </div>

          {/* Sağ Taraf: Butonlar */}
          <div className="flex items-center gap-3">
            {/* 1. Yeni Ekle Butonu */}
            <Link 
              href="/new-client" 
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm flex items-center gap-2"
            >
              <span>+</span> Yeni Ekle
            </Link>

            {/* 2. Çıkış Yap Butonu (Form ile Logout Action) */}
            <form action={logout}>
              <button 
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition shadow-sm"
              >
                Çıkış Yap
              </button>
            </form>
          </div>

        </div>

        {/* LİSTELEME ALANI */}
        <div className="grid gap-4">
          {clients?.length === 0 ? (
            <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-gray-200">
              <p className="text-gray-500 text-lg">Henüz hiç müşteri eklenmemiş.</p>
              <Link href="/new-client" className="text-blue-600 hover:underline mt-2 inline-block">
                İlk müşterini ekle
              </Link>
            </div>
          ) : (
            clients?.map((client: any) => (
              <div 
                key={client.id} 
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{client.name}</h2>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 mt-1 text-sm text-gray-500">
                    <span>📧 {client.email || 'Yok'}</span>
                    <span>📱 {client.phone || 'Yok'}</span>
                  </div>
                </div>
                
                {/* Durum Rozeti (Badge) */}
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  client.status === 'active' ? 'bg-green-100 text-green-800' : 
                  client.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
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