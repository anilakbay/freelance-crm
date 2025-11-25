"use client";

import Link from "next/link";

export default function ProjectsError() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10 flex items-center justify-center">
      <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center max-w-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Proje sayfasında bir hata oluştu 😕
        </h1>
        <p className="text-gray-500 mb-6">
          Projeler yüklenemedi. Lütfen sayfayı yenileyin veya ana sayfaya dönün.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/projects"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Tekrar dene
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            Ana sayfa
          </Link>
        </div>
      </div>
    </main>
  );
}
