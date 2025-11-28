import Link from "next/link";
import AuthForm from "@/components/forms/AuthForm";

export default function AuthPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* --- LOGO ALANI --- */}
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-900/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            Freelance<span className="text-blue-600">CRM</span>
          </span>
        </Link>
      </div>

      {/* --- FORM ALANI --- */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* AuthForm burada çağrılıyor */}
        <AuthForm />
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        Güvenli ve hızlı bir şekilde işlerinizi yönetin.
      </p>
    </main>
  );
}
