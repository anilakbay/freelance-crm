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

import StatsCards from "@/components/dashboard/StatsCards";
import RecentProjects from "@/components/dashboard/RecentProjects";
import QuickActions from "@/components/dashboard/QuickActions";
import RevenueChart from "@/components/charts/RevenueChart";
import StatusChart from "@/components/charts/StatusChart";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  if (!session) redirect("/auth");

  const { projects } = await getDashboardData();
  const projectsTyped: DashboardProject[] = projects;

  const [clientsResult, tasksResult] = await Promise.all([
    supabase.from("clients").select("id", { count: "exact", head: true }),
    supabase.from("tasks").select("id, status"),
  ]);

  const totalClients = clientsResult.count || 0;
  const tasksData = tasksResult.data || [];
  const pendingTasks = tasksData.filter((t) => t.status === "pending").length;

  const totalRevenue = projectsTyped.reduce(
    (sum, p) => sum + (p.price ? Number(p.price) : 0),
    0
  );
  const activeProjects = projectsTyped.filter(
    (p) => p.status === "active"
  ).length;

  const revenueData: RevenueData[] = prepareRevenueData(projectsTyped);
  const statusData: StatusData[] = prepareStatusData(projectsTyped);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Hoş Geldiniz 👋
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            İşlerinizin genel durumuna hızlı bir bakış
          </p>
        </div>
        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
          {new Date().toLocaleDateString("tr-TR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards
        totalRevenue={totalRevenue}
        activeProjects={activeProjects}
        totalClients={totalClients}
        pendingTasks={pendingTasks}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
        <div>
          <StatusChart data={statusData} />
        </div>
      </div>

      {/* Projects and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentProjects projects={projectsTyped} />
        <QuickActions />
      </div>
    </div>
  );
}
