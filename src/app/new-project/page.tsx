// --------------------------------------------------------
// SAYFA: Yeni Proje Ekleme
// DOSYA: src/app/(dashboard)/projects/new/page.tsx
// GÖREV: Müşteri listesini çeker ve boş bir Proje Formu gösterir.
// --------------------------------------------------------

import Link from "next/link";
import { redirect } from "next/navigation";
import ProjectForm from "@/components/forms/ProjectForm";
import { createSupabaseServerClient } from "@/lib/supabase";
import { Client } from "@/types/client";

export default async function NewProjectPage() {
  const supabase = await createSupabaseServerClient();

  // 1. Güvenli Oturum Kontrolü (getUser)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // 2. Müşterileri Çek
  const { data, error } = await supabase
    .from("clients")
    .select("id, name")
    .order("created_at", { ascending: false });

  // Hata Ekranı (Dashboard içine uyumlu)
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center p-4">
        <div className="bg-red-50 p-6 rounded-xl border border-red-100 max-w-sm">
          <h2 className="text-lg font-bold text-red-700 mb-2">
            Müşteri listesi alınamadı
          </h2>
          <p className="text-sm text-red-600 mb-4">{error.message}</p>
          <Link
            href="/clients"
            className="text-sm font-medium text-red-800 underline hover:text-red-900"
          >
            Müşteri listesine dön
          </Link>
        </div>
      </div>
    );
  }

  // Tip Dönüşümü
  // Form sadece {id, name} beklediği için safe casting yapıyoruz
  const clients = (data || []) as unknown as { id: number; name: string }[];

  // Müşteri Yoksa Uyarı Ekranı
  if (clients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-md">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Önce Müşteri Ekleyin
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Proje oluşturabilmek için en az bir müşteri kaydınızın olması
            gerekir.
          </p>
          <Link
            href="/clients/new" // DOĞRU ADRES
            className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
          >
            Müşteri Ekle
          </Link>
        </div>
      </div>
    );
  }

  // Başarılı Durum (Form)
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
      {/* Başlık ve Geri Dön */}
      <div className="mb-6">
        <Link
          href="/projects"
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
          Projelere Dön
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Yeni Proje Oluştur</h1>
      </div>

      {/* Form Alanı (Kart Tasarımı) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <ProjectForm clients={clients} />
      </div>
    </div>
  );
}
