// --------------------------------------------------------
// SAYFA: Yeni Proje Ekleme
// DOSYA: src/app/(dashboard)/projects/new/page.tsx
// GÖREV: Müşteri listesini çeker ve boş bir Proje Formu gösterir.
// --------------------------------------------------------

import Link from "next/link";
import { redirect } from "next/navigation";
import ProjectForm from "@/components/forms/ProjectForm";
import { createSupabaseServerClient } from "@/lib/supabase";

export default async function NewProjectPage() {
  const supabase = await createSupabaseServerClient();

  // 1. Güvenli Oturum Kontrolü (getUser ile)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // 2. Müşterileri Çek
  const { data: clients, error } = await supabase
    .from("clients")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    return (
      <div className="p-10 text-red-600 bg-red-50 rounded-lg m-6 border border-red-100">
        <p className="font-bold">Veri Çekme Hatası</p>
        <p className="text-sm">Müşteri listesi yüklenemedi: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Başlık ve Geri Dön Linki */}
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
        <p className="text-sm text-gray-500 mt-1">
          Müşteriniz için yeni bir iş kaydı açın.
        </p>
      </div>

      {/* Form Bileşeni */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <ProjectForm clients={clients || []} />
      </div>
    </div>
  );
}
