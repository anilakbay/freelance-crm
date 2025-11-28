// --------------------------------------------------------
// SAYFA: Proje Listesi (MOBİL UYUMLU)
// DOSYA: src/app/(dashboard)/projects/page.tsx
// --------------------------------------------------------

import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";
import { deleteProject } from "@/actions/project";
import { Project } from "@/types/project";

export default async function ProjectsPage() {
  const supabase = await createSupabaseServerClient();

  // 1. Oturum Kontrolü
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/auth");

  // 2. Projeleri Çek
  const { data, error } = await supabase
    .from("projects")
    .select("*, clients(name)")
    .order("created_at", { ascending: false });

  if (error)
    return <div className="p-6 text-red-600">Hata: {error.message}</div>;

  const projects = (data as any[]) || [];
  const hasProjects = projects.length > 0;

  return (
    <div className="space-y-6 pb-20">
      {" "}
      {/* Mobilde altta boşluk bırak */}
      {/* --- ÜST BAŞLIK --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projeler</h1>
          <p className="text-sm text-gray-500 mt-1">
            Toplam{" "}
            <span className="font-semibold text-gray-900">
              {projects.length}
            </span>{" "}
            aktif proje.
          </p>
        </div>
        <Link
          href="/projects/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition-all gap-2 w-full sm:w-auto"
        >
          <span>+</span> Yeni Proje
        </Link>
      </div>
      {/* --- LİSTE ALANI --- */}
      {!hasProjects ? (
        <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-gray-200">
          <p className="text-gray-500 text-lg">Henüz proje yok.</p>
          <Link
            href="/projects/new"
            className="text-blue-600 hover:underline mt-2"
          >
            İlk projeni oluştur
          </Link>
        </div>
      ) : (
        // GRID YAPISI: Mobilde 1 sütun, Tablette 2, Masaüstünde 3
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

// --- PROJE KARTI BİLEŞENİ (Tekrar Eden Kod Temizlendi) ---
function ProjectCard({ project }: { project: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative">
      {/* AKSİYON BUTONLARI (Mobilde Hep Görünür, Masaüstünde Hover ile) */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-white/90 p-1 rounded-lg">
        <Link
          href={`/projects/${project.id}/edit`}
          className="text-gray-400 hover:text-blue-600 p-1.5 rounded-md hover:bg-blue-50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </Link>
        <form action={deleteProject}>
          <input type="hidden" name="id" value={project.id} />
          <button
            type="submit"
            className="text-gray-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* İÇERİK */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 pr-16">
          {project.title}
        </h2>
        <div className="mt-2">
          <StatusBadge status={project.status} />
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          {project.clients?.name || "Müşteri Silinmiş"}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm font-bold text-gray-900">
          {project.price ? `${project.price.toLocaleString("tr-TR")} ₺` : "-"}
        </p>
        <p className="text-xs font-semibold text-gray-500">
          {project.deadline || "-"}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase border ${
        status === "completed"
          ? "bg-green-50 text-green-700 border-green-200"
          : status === "active"
          ? "bg-blue-50 text-blue-700 border-blue-200"
          : "bg-yellow-50 text-yellow-700 border-yellow-200"
      }`}
    >
      {status === "active" && "Devam Ediyor"}
      {status === "completed" && "Tamamlandı"}
      {status === "pending" && "Beklemede"}
      {status === "cancelled" && "İptal"}
      {!["active", "completed", "pending", "cancelled"].includes(status) &&
        status}
    </span>
  );
}
