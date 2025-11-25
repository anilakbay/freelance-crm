// src/app/(dashboard)/layout.tsx
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* SOL TARAFTA SIDEBAR */}
      <Sidebar />

      {/* SAĞ TARAFTA İÇERİK (Scroll edilebilir alan) */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {/* İçerik için biraz boşluk bırakalım */}
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
