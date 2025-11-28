import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TİP VE HESAPLAMALAR ---

export interface DashboardProject {
  id: number;
  title: string;
  status: string;
  price: number | string | null;
  client_id?: number;
  created_at: string;
}

// 🚨 YENİ EXPORT'LAR: Artık diğer dosyalar bu tipleri çekebilir
export type RevenueData = { month: string; total: number };
export type StatusData = { name: string; value: number };

export function prepareRevenueData(
  projects: DashboardProject[]
): RevenueData[] {
  const monthlyRevenueMap = new Map<string, number>();
  const monthNames = [
    "Oca",
    "Şub",
    "Mar",
    "Nis",
    "May",
    "Haz",
    "Tem",
    "Ağu",
    "Eyl",
    "Eki",
    "Kas",
    "Ara",
  ];

  const currentMonthIndex = new Date().getMonth();
  for (let i = 0; i <= currentMonthIndex + 1; i++) {
    if (monthNames[i]) monthlyRevenueMap.set(monthNames[i], 0);
  }

  projects.forEach((project) => {
    if (project.status !== "cancelled") {
      const date = new Date(project.created_at);
      const month = monthNames[date.getMonth()];
      const price = Number(project.price) || 0;
      const currentTotal = monthlyRevenueMap.get(month) || 0;
      monthlyRevenueMap.set(month, currentTotal + price);
    }
  });

  return Array.from(monthlyRevenueMap, ([month, total]) => ({ month, total }));
}

export function prepareStatusData(projects: DashboardProject[]): StatusData[] {
  const statusCounts = projects.reduce((acc, project) => {
    const statusTR =
      project.status === "active"
        ? "Aktif"
        : project.status === "completed"
        ? "Tamamlandı"
        : project.status === "pending"
        ? "Beklemede"
        : "İptal";

    acc[statusTR] = (acc[statusTR] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
}
