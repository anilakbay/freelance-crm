// --------------------------------------------------------
// SAYFA: Proje Düzenleme (Edit) - MOBİL UYUMLU
// DOSYA: src/app/(dashboard)/projects/[id]/edit/page.tsx
// --------------------------------------------------------

import Link from "next/link";
import { redirect } from "next/navigation";
import ProjectForm from "@/components/forms/ProjectForm";
import { createSupabaseServerClient } from "@/lib/supabase";
import { Project } from "@/types/project";

interface ProjectEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectEditPage({
  params,
}: ProjectEditPageProps) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }

  const resolvedParams = await params;
  const projectId = Number(resolvedParams.id);

  if (isNaN(projectId)) {
    return (
      <div className="p-10 text-center text-red-600">
        Geçersiz proje kimliği.
        <Link href="/projects" className="underline block mt-2">
          Listeye Dön
        </Link>
      </div>
    );
  }

  const [{ data: clientsData }, { data: projectData, error: projectError }] =
    await Promise.all([
      supabase
        .from("clients")
        .select("id, name")
        .order("name", { ascending: true }),
      supabase.from("projects").select("*").eq("id", projectId).single(),
    ]);

  if (projectError || !projectData) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center min-h-[50vh]">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-md w-full">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Proje Bulunamadı
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Aradığınız proje silinmiş olabilir veya erişim izniniz yok.
          </p>
          <Link
            href="/projects"
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            &larr; Proje Listesine Dön
          </Link>
        </div>
      </div>
    );
  }

  const clients = (clientsData as { id: number; name: string }[]) || [];
  const project = projectData as Project;

  const formattedDeadline = project.deadline
    ? new Date(project.deadline).toISOString().split("T")[0]
    : "";

  return (
    // MOBİL AYARI: px-4 eklendi (Kenarlara yapışmayı önler)
    <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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
        {/* MOBİL AYARI: text-xl (mobil) -> text-2xl (masaüstü) */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Projeyi Düzenle
        </h1>
      </div>

      {/* MOBİL AYARI: p-4 (mobil) -> p-6 (masaüstü) */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
        <ProjectForm
          clients={clients}
          initialData={{ ...project, deadline: formattedDeadline }}
          isEditing
        />
      </div>
    </div>
  );
}
