import Link from "next/link";
import { redirect } from "next/navigation";
import type { PostgrestError } from "@supabase/supabase-js";
import { Project } from "@/types/project";
import { createSupabaseServerClient } from "@/lib/supabase";

export default async function ProjectsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }

  const { data: projects, error } = (await supabase
    .from("projects")
    .select(
      `
      id, created_at, title, price, deadline, status, 
      clients (name, email)
    `
    )
    .order("created_at", { ascending: false })) as {
    data: Project[] | null;
    error: PostgrestError | null;
  };

  if (error) {
    return <div className="p-10 text-red-500">Hata çıktı: {error.message}</div>;
  }

  const totalProjects = projects?.length || 0;

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Proje Yönetim Paneli
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Toplam {totalProjects} proje takibinizde.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/clients"
              className="px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-200 transition border border-gray-200"
            >
              Müşteriler
            </Link>
            <Link
              href="/new-project"
              className="px-4 py-2.5 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition shadow-md flex items-center gap-2"
            >
              <span>+</span> Yeni Proje Ekle
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {totalProjects === 0 ? (
            <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-gray-200">
              <p className="text-gray-500 text-lg">
                Henüz hiç proje eklenmemiş.
              </p>
              <Link
                href="/new-project"
                className="text-green-600 hover:underline mt-2 inline-block font-medium"
              >
                İlk projenizi ekleyin
              </Link>
            </div>
          ) : (
            projects?.map((project) => (
              <div
                key={project.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:border-green-400 transition-all group flex justify-between items-center gap-4"
              >
                <div>
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Müşteri: {project.clients?.name || "Bilinmiyor"}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                    project.status === "completed"
                      ? "bg-blue-100 text-blue-700"
                      : project.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {project.status}
                </span>

                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">
                    {project.price
                      ? `${project.price} ₺`
                      : "Fiyat Belirtilmedi"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Teslim: {project.deadline || "Bilinmiyor"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
