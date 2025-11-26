// --------------------------------------------------------
// SAYFA: Yeni Görev Ekleme
// DOSYA: src/app/(dashboard)/tasks/new/page.tsx
// --------------------------------------------------------

import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";
import TaskForm from "@/components/forms/TaskForm";

export default async function NewTaskPage() {
  const supabase = await createSupabaseServerClient();

  // 1. Oturum Kontrolü
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/auth");

  // 2. Projeleri Çek (Formda seçmek için)
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title")
    .order("title", { ascending: true });

  if (error) {
    return (
      <div className="p-10 text-red-600">Projeler yüklenirken hata oluştu.</div>
    );
  }

  // Eğer hiç proje yoksa, görev ekleyemezsin uyarısı
  if (!projects || projects.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-10 text-center">
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
          <h3 className="text-lg font-bold text-yellow-800">
            Önce Proje Oluşturmalısınız
          </h3>
          <p className="text-yellow-700 mt-2 mb-4">
            Görev ekleyebilmek için en az bir aktif projeniz olmalıdır.
          </p>
          <Link
            href="/projects/new"
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
          >
            Yeni Proje Ekle
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-6">
        <Link
          href="/tasks"
          className="text-gray-500 hover:text-gray-900 text-sm flex items-center gap-1 transition-colors mb-2 w-fit"
        >
          &larr; Görevlere Dön
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Yeni Görev Ekle</h1>
        <p className="text-sm text-gray-500 mt-1">
          Bir proje için yapılacak iş tanımlayın.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        {/* Projeleri forma gönderiyoruz */}
        <TaskForm projects={projects} />
      </div>
    </div>
  );
}
