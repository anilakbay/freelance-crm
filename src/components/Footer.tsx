import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md group-hover:scale-105 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">
                TaskPilot<span className="text-blue-600">CRM</span>
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Freelancerlar için modern iş yönetim platformu. 
              Müşterilerinizi, projelerinizi ve finanslarınızı tek yerden yönetin.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/auth" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Giriş Yap
                </Link>
              </li>
              <li>
                <Link href="/auth" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Kayıt Ol
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} TaskPilot CRM. Tüm hakları saklıdır.
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Next.js 16</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>React 19</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>Supabase</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
