import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ProjectForm from "@/components/ProjectForm";
import { Client } from "@/types/client"; // Müşteri tipini çektik

// Bu sayfa Server Component olmalı ki, müşterileri güvenli çeksin
async function getClients() {
  const { data, error } = await supabase.from("clients").select("id, name") as { data: Client[] | null, error: any };
  if (error) {
    console.error("Müşteri Çekme Hatası:", error);
    return [];
  }
  return data || [];
}

export default async function NewProjectPage() {
  const clients = await getClients();
  
  if (clients.length === 0) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
              <div className="text-center p-8 bg-white rounded-xl shadow-lg">
                  <h2 className="text-xl font-bold text-red-600 mb-4">Müşteri Kaydı Bulunamadı</h2>
                  <p className="text-gray-600">Proje eklemek için önce en az bir müşteri kaydı olmalıdır.</p>
                  <Link href="/new-client" className="text-blue-600 hover:underline mt-4 inline-block font-medium">
                      Şimdi Müşteri Ekle
                  </Link>
              </div>
          </div>
      );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10 flex flex-col items-center pt-12">
      <div className="max-w-lg w-full mb-6">
        <Link href="/projects" className="text-blue-600 hover:underline flex items-center gap-1 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
          Proje Listesine Geri Dön
        </Link>
        
        {/* Form Bileşeni (Müşteri listesini props olarak gönderiyoruz) */}
        <ProjectForm clients={clients} /> 
      </div>
    </main>
  );
}