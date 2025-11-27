// --------------------------------------------------------
// SAYFA: Ana Panel (Dashboard)
// GÖREV: Veri çekme ve bileşenleri yerleştirme (Mantık utils'de)
// --------------------------------------------------------

import { createSupabaseServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { getDashboardData } from "@/actions/project";
// Mantığı buradan çağırıyoruz 👇
import {
  prepareRevenueData,
  prepareStatusData,
  type DashboardProject,
} from "@/lib/utils";

// Bileşenler
import StatsCards from "@/components/dashboard/StatsCards";
import RecentProjects from "@/components/dashboard/RecentProjects";
import QuickActions from "@/components/dashboard/QuickActions";
import RevenueChart from "@/components/charts/RevenueChart";
import StatusChart from "@/components/charts/StatusChart";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  // 1. GÜVENLİK
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/auth");

  // 2. VERİ ÇEKME
  const { projects } = await getDashboardData();

  // Hız için diğer verileri paralel çekiyoruz
  const [clientsResult, tasksResult] = await Promise.all([
    supabase.from("clients").select("id", { count: "exact", head: true }),
    supabase.from("tasks").select("id, status"),
  ]);

  const totalClients = clientsResult.count || 0;
  const tasksData = tasksResult.data || [];

  // 3. HESAPLAMALAR (Basit toplamalar burada kalabilir)
  const totalRevenue = projects.reduce(
    (sum, p) => sum + (p.price ? Number(p.price) : 0),
    0
  );
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const pendingTasks = tasksData.filter((t) => t.status === "pending").length;

  // 4. GRAFİK VERİSİ (Utils'ten gelen fonksiyonları kullanıyoruz)
  // Tip dönüşümünü (casting) burada yapıyoruz
  const revenueData = prepareRevenueData(
    projects as unknown as DashboardProject[]
  );
  const statusData = prepareStatusData(
    projects as unknown as DashboardProject[]
  );

  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      {/* Başlık */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
        <div>
          <StatusChart data={statusData} />
        </div>
      </div>

      {/* Projeler ve Butonlar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <RecentProjects projects={projects} />
        <QuickActions />
      </div>
    </div>
  );
}
