// --------------------------------------------------------
// SAYFA: Proje Düzenleme (Edit) Sayfası
// YOL: src/app/(dashboard)/projects/[id]/edit/page.tsx
// GÖREV: Mevcut projenin verilerini çeker ve düzenleme formunu açar.
// --------------------------------------------------------

import Link from "next/link";
import { redirect } from "next/navigation";
import ProjectForm from "@/components/forms/ProjectForm";
import { Client } from "@/types/client";
import { Project } from "@/types/project";
import { createSupabaseServerClient } from "@/lib/supabase";

// Sayfanın alacağı parametrelerin tipi (URL'den gelen ID)
interface ProjectEditPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectEditPage({
  params,
}: ProjectEditPageProps) {
  // --- 1. SUPABASE İSTEMCİSİ VE OTURUM KONTROLÜ ---
  const supabase = await createSupabaseServerClient();

  // Kullanıcının oturum açıp açmadığını kontrol et
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Eğer oturum yoksa giriş sayfasına yönlendir
  if (!session) {
    redirect("/auth");
  }

  // URL'den gelen ID'yi sayıya çevir
  const projectId = Number(params.id);

  // --- 2. VERİ ÇEKME İŞLEMİ (PERFORMANS ODAKLI) ---
  // Promise.all kullanarak "Müşteriler" ve "Proje Detayı" verisini AYNI ANDA çekeriz.
  // Bu sayede sayfa iki kat hızlı yüklenir.
  const [{ data: clientsData }, { data: projectData, error: projectError }] =
    await Promise.all([
      // Tüm müşterileri çek (Selectbox için lazım)
      supabase.from("clients").select("id, name"),
      // Düzenlenecek projeyi ID'ye göre çek ve tek kayıt (single) al
      supabase.from("projects").select("*").eq("id", projectId).single(),
    ]);

  // --- 3. HATA YÖNETİMİ ---
  // Eğer proje veritabanında bulunamazsa veya hata dönerse kullanıcıya bilgi ver.
  if (projectError || !projectData) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-red-100">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Proje Bulunamadı
          </h2>
          <p className="text-gray-500 mb-4">
            Aradığınız proje silinmiş veya mevcut değil.
          </p>
          <Link
            href="/projects"
            className="text-blue-600 hover:underline font-medium"
          >
            &larr; Proje Listesine Dön
          </Link>
        </div>
      </div>
    );
  }

  // --- 4. VERİ HAZIRLIĞI ---
  // Gelen verileri TypeScript tiplerine dönüştür
  const clients = (clientsData as Client[] | null) ?? [];
  const project = projectData as Project;

  // Tarih verisini input içine koyabilmek için formatla (YYYY-MM-DD)
  // Örn: 2025-11-25T00:00:00 -> 2025-11-25
  const formattedDeadline = project.deadline
    ? project.deadline.split("T")[0]
    : "";

  // --- 5. ARAYÜZ (UI) RENDER ---
  return (
    <div className="max-w-2xl mx-auto py-6">
      {/* Üst Kısım: Geri Dön Linki ve Başlık */}
      <div className="mb-6">
        <Link
          href="/projects"
          className="text-gray-500 hover:text-gray-900 text-sm flex items-center gap-1 transition-colors mb-2"
        >
          {/* Geri Dön İkonu */}
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
          Listeye Geri Dön
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Projeyi Düzenle</h1>
      </div>

      {/* Form Alanı */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        {/* Proje Formunu 'Edit' modunda çağırıyoruz */}
        <ProjectForm
          clients={clients}
          initialData={{ ...project, deadline: formattedDeadline }}
          isEditing // Bu prop, formun güncelleme yapacağını belirtir
        />
      </div>
    </div>
  );
}
