// --------------------------------------------------------
// SAYFA: Yeni Görev Ekleme
// DOSYA: src/app/(dashboard)/tasks/new/page.tsx
// GÖREV: Müşteri listesini çeker ve boş bir Proje Formu gösterir.
// --------------------------------------------------------

import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";
import TaskForm from "@/components/forms/TaskForm";

export default async function NewTaskPage() {
  const supabase = await createSupabaseServerClient();

  // 1. GÜVENLİ OTURUM KONTROLÜ (getUser)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // 2. Projeleri Çek (Formda seçmek için)
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title")
    .order("title", { ascending: true });

  if (error) {
    return (
      <div className="p-10 text-red-600 bg-red-50 rounded-lg m-6 border border-red-100">
        <p className="font-bold">Hata</p>
        <p className="text-sm">Projeler yüklenirken bir sorun oluştu.</p>
      </div>
    );
  }

  // Eğer hiç proje yoksa, görev ekleyemezsin uyarısı
  if (!projects || projects.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-10 text-center px-4">
        <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-200 shadow-sm">
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
          <h3 className="text-lg font-bold text-yellow-800">
            Önce Proje Oluşturmalısınız
          </h3>
          <p className="text-yellow-700 mt-2 mb-6 max-w-md mx-auto">
            Bir görev ekleyebilmek için, bu görevin bağlanacağı en az bir aktif
            projeniz olmalıdır.
          </p>
          <Link
            href="/projects/new"
            className="inline-flex items-center justify-center bg-yellow-600 text-white px-6 py-2.5 rounded-lg hover:bg-yellow-700 transition shadow-sm font-medium"
          >
            Yeni Proje Ekle
          </Link>
        </div>
      </div>
    );
  }

  return (
    // MOBİL AYARI: px-4 (Mobilde kenarlardan boşluk bırakır)
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href="/tasks"
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
          Görevlere Dön
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Yeni Görev Ekle</h1>
        <p className="text-sm text-gray-500 mt-1">
          Bir proje için yapılacak iş tanımlayın.
        </p>
      </div>

      {/* Form Alanı */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
        <TaskForm projects={projects} />
      </div>
    </div>
  );
}
