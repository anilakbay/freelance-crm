import Link from "next/link";
import { redirect } from "next/navigation";
import ProjectForm from "@/components/forms/ProjectForm";
import { Client } from "@/types/client";
import { Project } from "@/types/project";
import { createSupabaseServerClient } from "@/lib/supabase";

interface ProjectEditPageProps {
  params: {
    id: string;
  };
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

  const projectId = Number(params.id);

  const [{ data: clientsData }, { data: projectData, error: projectError }] =
    await Promise.all([
      supabase.from("clients").select("id, name"),
      supabase.from("projects").select("*").eq("id", projectId).single(),
    ]);

  if (projectError || !projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Proje Bulunamadı
          </h2>
          <Link
            href="/projects"
            className="text-blue-600 hover:underline mt-4 inline-block font-medium"
          >
            Proje Listesine Geri Dön
          </Link>
        </div>
      </div>
    );
  }

  const clients = (clientsData as Client[] | null) ?? [];
  const project = projectData as Project;
  const formattedDeadline = project.deadline
    ? project.deadline.split("T")[0]
    : "";

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10 flex flex-col items-center pt-12">
      <div className="max-w-lg w-full mb-6">
        <Link
          href="/projects"
          className="text-blue-600 hover:underline flex items-center gap-1 mb-6"
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
          Proje Listesine Geri Dön
        </Link>

        <ProjectForm
          clients={clients}
          initialData={{ ...project, deadline: formattedDeadline }}
          isEditing
        />
      </div>
    </main>
  );
}
