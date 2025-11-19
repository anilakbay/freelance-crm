import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Modern projelerde Inter kullanımı yaygındır.
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Projenin SEO ve Tarayıcı Başlığı burasıdır.
export const metadata: Metadata = {
  title: {
    default: "Freelance CRM | Müşteri Yönetim Sistemi",
    template: "%s | Freelance CRM",
  },
  description: "Freelancer'lar için özel olarak tasarlanmış, müşterileri ve projeleri yönetme platformu.",
  keywords: ["Freelance CRM", "Next.js", "Supabase", "Müşteri Takibi"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr"> {/* Dil ayarı Türkçe'ye (tr) çevrildi. */}
      <body
        className={`${inter.variable} antialiased`} // Kullanılan font değişkeni
      >
        {children}
      </body>
    </html>
  );
}