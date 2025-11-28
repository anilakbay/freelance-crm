import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // DÜZELTME: flex-col (Mobil: Alt alta) md:flex-row (PC: Yan yana)
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row overflow-hidden">
      {/* SOL TARAFTA SIDEBAR (Mobilde Üst Header olur) */}
      <Sidebar />

      {/* SAĞ TARAFTA İÇERİK */}
      <div className="flex flex-col flex-1 w-full min-w-0 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {/* İçerik için boşluk */}
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
