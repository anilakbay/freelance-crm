// src/app/(dashboard)/projects/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import type { PostgrestError } from "@supabase/supabase-js";
// Eğer types klasöründe project.ts yoksa burası hata verebilir, kontrol et.
import { Project } from "@/types/project";
import { createSupabaseServerClient } from "@/lib/supabase";

export default async function ProjectsPage() {
  const supabase = await createSupabaseServerClient();

  // 1. Oturum Kontrolü
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }

  // 2. Verileri Çekme
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
    return (
      <div className="p-6 text-red-600 bg-red-50 border border-red-200 rounded-lg">
        Veriler yüklenirken bir hata oluştu: {error.message}
      </div>
    );
  }

  const totalProjects = projects?.length || 0;

  return (
    <div className="space-y-6">
      {/* --- ÜST BAŞLIK ALANI --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Proje Yönetim Paneli
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Toplam{" "}
            <span className="font-semibold text-gray-900">{totalProjects}</span>{" "}
            proje takibinizde.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            href="/clients"
            className="flex-1 md:flex-none text-center px-4 py-2.5 bg-white text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition border border-gray-200 shadow-sm"
          >
            Müşteriler
          </Link>
          <Link
            href="/projects/new"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            <span className="text-lg leading-none">+</span> Yeni Proje
          </Link>
        </div>
      </div>

      {/* --- PROJE LİSTESİ --- */}
      <div className="grid gap-4">
        {totalProjects === 0 ? (
          // Proje Yoksa Gösterilecek Alan
          <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-gray-200 flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg font-medium">
              Henüz hiç proje eklenmemiş.
            </p>
            <Link
              href="/projects/new"
              className="text-blue-600 hover:text-blue-700 mt-2 font-medium hover:underline"
            >
              İlk projenizi oluşturun &rarr;
            </Link>
          </div>
        ) : (
          // Projeler Varsa Listele
          projects?.map((project) => (
            <div
              key={project.id}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:border-blue-400 transition-all group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              {/* Sol Taraf: Başlık ve Müşteri */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A9.97 9.97 0 0110 5.5a9.97 9.97 0 014.793 8.89A5.99 5.99 0 0010 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-gray-500">
                    {project.clients?.name || "Müşteri Bilinmiyor"}
                  </p>
                </div>
              </div>

              {/* Sağ Taraf: Durum, Fiyat, Tarih */}
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                {/* Durum Rozeti (HATA BURADA ÇÖZÜLDÜ) */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                    project.status === "completed"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : project.status === "active"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-yellow-50 text-yellow-700 border-yellow-200"
                  }`}
                >
                  {/* İngilizce veriyi Türkçeye çevirip gösteriyoruz */}
                  {project.status === "active" && "Devam Ediyor"}
                  {project.status === "completed" && "Tamamlandı"}
                  {project.status === "pending" && "Beklemede"}
                  {project.status === "cancelled" && "İptal"}

                  {/* Eğer bilinmeyen bir durum gelirse olduğu gibi yazsın (Güvenlik) */}
                  {!["active", "completed", "pending", "cancelled"].includes(
                    project.status
                  ) && project.status}
                </span>

                <div className="text-right hidden sm:block min-w-[100px]">
                  <p className="text-sm font-bold text-gray-900">
                    {project.price
                      ? `${project.price.toLocaleString("tr-TR")} ₺`
                      : "-"}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {project.deadline || "Tarih Yok"}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
