import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Projenin SEO ve Tarayıcı Sekmesi Ayarları
export const metadata: Metadata = {
  title: {
    default: "Freelance CRM | Profesyonel İş Yönetimi",
    template: "%s | Freelance CRM",
  },
  description:
    "Freelancer'lar için geliştirilmiş modern müşteri ve proje yönetim sistemi. İşlerinizi tek panelden, güvenle yönetin.",
  keywords: [
    "Freelance",
    "CRM",
    "Müşteri Takibi",
    "Proje Yönetimi",
    "Next.js",
    "Supabase",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // DİKKAT: return ile html etiketi arasında boşluk bırakılmamıştır (Hydration Hatası Önlemi)
  return (
    <html lang="tr">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
