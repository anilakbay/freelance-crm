// --------------------------------------------------------
// SAYFA: Ana Panel (Dashboard) - TS HATALARSIZ & MOBİL+WEB UYUMLU
// DOSYA: src/app/(dashboard)/dashboard/page.tsx
// --------------------------------------------------------

import { createSupabaseServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { getDashboardData } from "@/actions/project";
import {
  prepareRevenueData,
  prepareStatusData,
  type DashboardProject,
  type RevenueData,
  type StatusData,
} from "@/lib/utils";

// Bileşenler
import StatsCards from "@/components/dashboard/StatsCards";
import RecentProjects from "@/components/dashboard/RecentProjects";
import QuickActions from "@/components/dashboard/QuickActions";
import RevenueChart from "@/components/charts/RevenueChart";
import StatusChart from "@/components/charts/StatusChart";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  // 1️⃣ Kullanıcı oturumu kontrol
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/auth");

  // 2️⃣ Dashboard verilerini çek
  const { projects } = await getDashboardData();
  const projectsTyped: DashboardProject[] = projects; // TS tipi garanti

  // 3️⃣ Yardımcı veriler
  const [clientsResult, tasksResult] = await Promise.all([
    supabase.from("clients").select("id", { count: "exact", head: true }),
    supabase.from("tasks").select("id, status"),
  ]);

  const totalClients = clientsResult.count || 0;
  const tasksData = tasksResult.data || [];
  const pendingTasks = tasksData.filter((t) => t.status === "pending").length;

  // 4️⃣ Proje istatistikleri
  const totalRevenue = projectsTyped.reduce(
    (sum, p) => sum + (p.price ? Number(p.price) : 0),
    0
  );
  const activeProjects = projectsTyped.filter(
    (p) => p.status === "active"
  ).length;

  // 5️⃣ Grafik verileri
  const revenueData: RevenueData[] = prepareRevenueData(projectsTyped);
  const statusData: StatusData[] = prepareStatusData(projectsTyped);

  return (
    <div className="space-y-6 lg:space-y-8 pb-10 px-4 md:px-8 lg:px-12">
      {/* Başlık */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Hoş Geldiniz 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            İşlerinizin genel durumuna hızlı bir bakış.
          </p>
        </div>
        <div className="hidden sm:block text-sm text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
          {new Date().toLocaleDateString("tr-TR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* İstatistik Kartları */}
      <StatsCards
        totalRevenue={totalRevenue}
        activeProjects={activeProjects}
        totalClients={totalClients}
        pendingTasks={pendingTasks}
      />

      {/* Grafikler */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
        <div>
          <StatusChart data={statusData} />
        </div>
      </div>

      {/* Projeler ve Hızlı İşlemler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <RecentProjects projects={projectsTyped} />
        <QuickActions />
      </div>
    </div>
  );
}
