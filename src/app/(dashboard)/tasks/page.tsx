// --------------------------------------------------------
// SAYFA: Görevler Listesi - MODÜLER & İNTERAKTİF
// DOSYA: src/app/(dashboard)/tasks/page.tsx
// GÖREV: Görevleri listeler, TaskItem bileşeni ile etkileşim sağlar.
// --------------------------------------------------------

import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";
import { Database } from "@/types/database";
import TaskItem from "@/components/TaskItem"; // YENİ BİLEŞENİMİZ

// Tip Tanımları
type TaskRow = Database["public"]["Tables"]["tasks"]["Row"];
type TaskWithProject = TaskRow & {
  projects: { title: string } | null;
};

export default async function TasksPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/auth");

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select(
      `
      *,
      projects (title)
    `
    )
    .order("due_date", { ascending: true });

  if (error)
    return <div className="p-6 text-red-600">Hata: {error.message}</div>;

  // Güvenli tip dönüşümü
  const taskList = (tasks as unknown as TaskWithProject[]) || [];
  const hasTasks = taskList.length > 0;

  return (
    <div className="space-y-6 pb-20">
      {" "}
      {/* Mobilde altta boşluk */}
      {/* ÜST KISIM */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Görevler</h1>
          <p className="text-sm text-gray-500 mt-1">
            Yapılacak işlerinizi yönetin.
          </p>
        </div>
        <Link
          href="/tasks/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition-all gap-2 w-full sm:w-auto"
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
          {/* ARTIK HTML DEĞİL, AKILLI BİLEŞEN KULLANIYORUZ */}
          {taskList.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
