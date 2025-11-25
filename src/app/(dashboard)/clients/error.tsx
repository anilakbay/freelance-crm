"use client";

import Link from "next/link";

export default function ClientsError() {
    return (
        <main className="min-h-screen bg-gray-50 p-6 md:p-10 flex items-center justify-center">
            <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center max-w-md">
                <h1 className="text-3xl font-bold text-red-600 mb-4">
                    Bir şeyler yanlış gitti 😕
                </h1>
                <p className="text-gray-500 mb-6">
                    Müşteri sayfasını yüklerken bir hata oluştu. Lütfen sayfayı yeniden
                    deneyin.
                </p>
                <Link
                    href="/clients"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                    Tekrar dene
                </Link>
            </div>
        </main>
    );
}
