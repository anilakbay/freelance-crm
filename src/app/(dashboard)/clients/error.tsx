"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hatayı konsola loglayabiliriz
    console.error("Müşteri sayfası hatası:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] p-6 text-center">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-md w-full">
        {/* İkon */}
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Bir şeyler yanlış gitti
        </h2>

        <p className="text-gray-500 mb-6 text-sm">
          Müşteri verileri yüklenirken beklenmedik bir hata oluştu.
        </p>

        {/* Reset Butonu (Next.js'in kendi tekrar deneme fonksiyonu) */}
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-sm active:scale-95"
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  );
}
