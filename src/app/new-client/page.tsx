import ClientForm from "@/components/ClientForm";
import Link from "next/link";

export default function NewClientPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10 flex flex-col items-center">
      <div className="max-w-lg w-full mb-6">
        <Link
          href="/clients"
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
            {/* Okun gövdesi ve ucu */}
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Listeye Geri Dön
        </Link>

        <ClientForm />
      </div>
    </main>
  );
}
