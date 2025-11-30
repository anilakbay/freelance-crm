import Link from "next/link";
import AuthForm from "@/components/forms/AuthForm";

export default function AuthPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg group-hover:scale-105 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              TaskPilot<span className="text-blue-600">CRM</span>
            </span>
          </Link>
          <p className="mt-3 text-sm text-gray-600">
            İşlerinizi profesyonelce yönetin
          </p>
        </div>

        {/* Auth Form */}
        <div className="glass rounded-2xl shadow-xl p-8 animate-fade-in">
          <AuthForm />
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Giriş yaparak{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            kullanım koşullarını
          </Link>{" "}
          kabul etmiş olursunuz
        </p>
      </div>
    </main>
  );
}
