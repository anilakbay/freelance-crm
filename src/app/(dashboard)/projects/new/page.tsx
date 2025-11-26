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

  // 1. Oturum Kontrolü
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }

  // 2. Müşterileri Çek (Formda "Hangi Müşteri?" seçimi için şart)
  const { data: clients, error } = await supabase
    .from("clients")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        Hata: Müşteri listesi yüklenemedi.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Başlık ve Geri Dön Butonu */}
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
          Listeye Geri Dön
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Yeni Proje Oluştur</h1>
        <p className="text-sm text-gray-500 mt-1">
          Müşteriniz için yeni bir iş kaydı açın.
        </p>
      </div>

      {/* Form Bileşeni */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <ProjectForm
          clients={clients || []}
          // initialData göndermiyoruz, çünkü bu yeni bir kayıt.
          // isEditing göndermiyoruz (varsayılan false), çünkü düzenleme yapmıyoruz.
        />
      </div>
    </div>
  );
}
