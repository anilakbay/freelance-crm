// --------------------------------------------------------
// SAYFA: Görevler Listesi
// DOSYA: src/app/(dashboard)/tasks/page.tsx
// GÖREV: Tüm görevleri listeler ve durumlarını gösterir.
// --------------------------------------------------------

import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";
import { Database } from "@/types/database";

// Özel Tip Tanımı: Görev + Proje Başlığı
type TaskRow = Database["public"]["Tables"]["tasks"]["Row"];
type TaskWithProject = TaskRow & {
  projects: { title: string } | null;
};

export default async function TasksPage() {
  const supabase = await createSupabaseServerClient();

  // 1. Oturum Kontrolü
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }

  // 2. Görevleri Çek (Proje başlığı ile birlikte)
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select(
      `
      *,
      projects (title)
    `
    )
    .order("due_date", { ascending: true });

  if (error) {
    return <div className="p-6 text-red-600">Hata: {error.message}</div>;
  }

  // Gelen veriyi özel tipimize dönüştürüyoruz (Güvenli Casting)
  const taskList = (tasks as unknown as TaskWithProject[]) || [];
  const hasTasks = taskList.length > 0;

  return (
    <div className="space-y-6">
      {/* ÜST KISIM */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Görevler</h1>
          <p className="text-sm text-gray-500 mt-1">
            Yapılacak işlerinizi ve takvimini buradan yönetin.
          </p>
        </div>
        <Link
          href="/tasks/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition-all gap-2"
        >
          <span>+</span> Yeni Görev
        </Link>
      </div>

      {/* LİSTE ALANI */}
      {!hasTasks ? (
        <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-gray-200 flex flex-col items-center">
          <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Hiç Görev Yok</h3>
          <p className="text-gray-500 mt-1 mb-6 max-w-sm">
            Projeleriniz için yapılacaklar listesi oluşturun.
          </p>
          <Link
            href="/tasks/new"
            className="text-blue-600 font-semibold hover:underline"
          >
            İlk görevi ekle &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {taskList.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-300 transition-colors relative group"
            >
              {/* Sol: Görev Bilgisi */}
              <div className="flex items-start gap-4">
                {/* Durum İkonu */}
                <div
                  className={`mt-1 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                    task.status === "done"
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {task.status === "done" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>

                <div>
                  <h3
                    className={`font-semibold text-gray-900 ${
                      task.status === "done" ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">
                      {task.projects?.title || "Projesiz"}
                    </span>
                    {task.due_date && (
                      <>
                        <span>•</span>
                        <span>
                          {new Date(task.due_date).toLocaleDateString("tr-TR")}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Sağ: Öncelik Rozeti (Mobilde altta kalmasın diye flex ayarı) */}
              <div className="flex items-center gap-4 self-start sm:self-center ml-10 sm:ml-0">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                    task.priority === "high"
                      ? "bg-red-50 text-red-700 border border-red-100"
                      : task.priority === "medium"
                      ? "bg-orange-50 text-orange-700 border border-orange-100"
                      : "bg-blue-50 text-blue-700 border border-blue-100"
                  }`}
                >
                  {task.priority === "high" && "Yüksek"}
                  {task.priority === "medium" && "Orta"}
                  {task.priority === "low" && "Düşük"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
