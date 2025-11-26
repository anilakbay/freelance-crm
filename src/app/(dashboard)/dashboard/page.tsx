// --------------------------------------------------------
// SAYFA: Ana Panel (Dashboard)
// DOSYA: src/app/(dashboard)/dashboard/page.tsx
// GÖREV: Tüm verileri (Proje, Müşteri, Görev) çeker, hesaplar ve görselleştirir.
// --------------------------------------------------------

import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentProjects from "@/components/dashboard/RecentProjects";
import QuickActions from "@/components/dashboard/QuickActions";
import RevenueChart from "@/components/charts/RevenueChart";
import StatusChart from "@/components/charts/StatusChart";

// NEDEN BU TİP VAR?
// Supabase'den 'projects' ile beraber 'clients' tablosundan da veri çekiyoruz (Join).
// TypeScript'in bu birleşik yapıyı anlaması ve hata vermemesi için bu tipi elle tanımlıyoruz.
interface DashboardProject {
  id: number;
  title: string;
  status: string;
  price: number | string | null;
  client_id: number;
  created_at: string;
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  // 1. GÜVENLİK KONTROLÜ
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/auth");

  // 2. VERİ ÇEKME (PARALEL SORGULAR)
  // Sayfa hızını artırmak için 3 sorguyu aynı anda (Promise.all) gönderiyoruz.
  // Eğer tek tek (await... await...) yapsaydık sayfa açılışı 3 kat yavaşlardı.
  const [projectsResult, clientsResult, tasksResult] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase.from("clients").select("id"), // Sadece sayısını alacağız, id yeterli
    supabase.from("tasks").select("id, status"), // Sadece durumunu kontrol edeceğiz
  ]);

  // 3. VERİ HAZIRLIĞI VE TİP DÖNÜŞÜMÜ
  // Gelen veriyi yukarıdaki 'DashboardProject' tipine zorluyoruz (Type Casting).
  const projects = (projectsResult.data as unknown as DashboardProject[]) || [];
  const totalClients = clientsResult.data?.length || 0;

  // 4. İSTATİSTİK HESAPLAMALARI

  // Ciro Hesabı: Projelerin fiyatlarını toplar. (String gelirse sayıya çevirir).
  const totalRevenue = projects.reduce(
    (sum, p) => sum + (p.price ? Number(p.price) : 0),
    0
  );

  // Filtreleme İşlemleri
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const pendingTasks = (tasksResult.data || []).filter(
    (t) => t.status === "pending"
  ).length;

  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      {/* --- ÜST KISIM: Başlık ve Tarih --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Hoş Geldiniz 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            İşlerinizin genel durumuna hızlı bir bakış.
          </p>
        </div>
        {/* Tarihi Türkçe formatında gösterir (Örn: 26 Kasım 2025 Çarşamba) */}
        <div className="hidden sm:block text-sm text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
          {new Date().toLocaleDateString("tr-TR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* --- BÖLÜM 1: İstatistik Kartları --- */}
      <StatsCards
        totalRevenue={totalRevenue}
        activeProjects={activeProjects}
        totalClients={totalClients}
        pendingTasks={pendingTasks}
      />

      {/* --- BÖLÜM 2: Grafikler (Sütun ve Pasta) --- */}
      {/* Mobilde tek sütun, büyük ekranda 3 sütunluk yer kaplar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RevenueChart /> {/* Çubuk Grafik */}
        </div>
        <div>
          <StatusChart /> {/* Pasta Grafik */}
        </div>
      </div>

      {/* --- BÖLÜM 3: Listeler ve Butonlar --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <RecentProjects projects={projects} />
        <QuickActions />
      </div>
    </div>
  );
}
