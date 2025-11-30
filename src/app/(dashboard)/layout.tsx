import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row overflow-hidden">
      <Sidebar />
      
      <div className="flex flex-col flex-1 w-full min-w-0 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
