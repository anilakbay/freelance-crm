import Link from "next/link";
import { redirect } from "next/navigation";
import ProjectForm from "@/components/forms/ProjectForm";
import { Client } from "@/types/client";
import { createSupabaseServerClient } from "@/lib/supabase";

export default async function NewProjectPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth");
  }

  const { data, error } = await supabase
    .from("clients")
    .select("id, name")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Müşteri listesi alınamadı
          </h2>
          <p className="text-gray-600">{error.message}</p>
          <Link
            href="/clients"
            className="text-blue-600 hover:underline mt-4 inline-block font-medium"
          >
            Müşteri listesine dön
          </Link>
        </div>
      </div>
    );
  }

  const clients = (data as Client[] | null) ?? [];

  if (clients.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Önce müşteri ekleyin
          </h2>
          <p className="text-gray-600">
            Proje oluşturabilmek için en az bir müşteri kaydı gerekir.
          </p>
          <Link
            href="/new-client"
            className="text-blue-600 hover:underline mt-4 inline-block font-medium"
          >
            Şimdi müşteri ekle
          </Link>
        </div>
      </div>
    );
  }

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
            aria-hidden
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Proje listesine dön
        </Link>
        <ProjectForm clients={clients} />
      </div>
    </main>
  );
}